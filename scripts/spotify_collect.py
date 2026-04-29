import argparse
import base64
import csv
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request


TOKEN_URL = "https://accounts.spotify.com/api/token"
API_BASE = "https://api.spotify.com/v1"


def load_env_file(path=".env"):
    if not os.path.exists(path):
        return

    with open(path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


def request_json(url, headers=None, data=None, method=None):
    request = urllib.request.Request(url, headers=headers or {}, data=data, method=method)

    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Spotify request failed: {error.code} {detail}") from error


def get_access_token(client_id, client_secret):
    auth = base64.b64encode(f"{client_id}:{client_secret}".encode("utf-8")).decode("ascii")
    body = urllib.parse.urlencode({"grant_type": "client_credentials"}).encode("utf-8")
    payload = request_json(
        TOKEN_URL,
        headers={
            "Authorization": f"Basic {auth}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data=body,
        method="POST",
    )
    return payload["access_token"]


def search_track(token, title, artist):
    query = f'track:"{title}" artist:"{artist}"' if artist else title
    params = urllib.parse.urlencode({"q": query, "type": "track", "limit": 1})
    payload = request_json(
        f"{API_BASE}/search?{params}",
        headers={"Authorization": f"Bearer {token}"},
    )
    items = payload.get("tracks", {}).get("items", [])
    return items[0] if items else None


def extract_track_id(value):
    if not value:
        return ""

    value = value.strip()
    patterns = [
        r"open\.spotify\.com/track/([A-Za-z0-9]+)",
        r"spotify:track:([A-Za-z0-9]+)",
    ]
    for pattern in patterns:
        match = re.search(pattern, value)
        if match:
            return match.group(1)

    if re.fullmatch(r"[A-Za-z0-9]{22}", value):
        return value

    return ""


def get_track(token, track_id):
    return request_json(
        f"{API_BASE}/tracks/{track_id}",
        headers={"Authorization": f"Bearer {token}"},
    )


def get_artist(token, artist_id):
    return request_json(
        f"{API_BASE}/artists/{artist_id}",
        headers={"Authorization": f"Bearer {token}"},
    )


def get_audio_features(token, track_id):
    return request_json(
        f"{API_BASE}/audio-features/{track_id}",
        headers={"Authorization": f"Bearer {token}"},
    )


def get_audio_features_or_empty(token, track_id):
    try:
        return get_audio_features(token, track_id)
    except RuntimeError as error:
        print(f"Audio features unavailable for {track_id}: {error}", file=sys.stderr)
        return {}


def get_track_from_row(token, row):
    possible_id = (
        extract_track_id(row.get("spotify_url", ""))
        or extract_track_id(row.get("spotify_id", ""))
        or extract_track_id(row.get("track_id", ""))
    )

    if possible_id:
        return get_track(token, possible_id)

    title = row.get("song_title", "").strip()
    artist = row.get("artist", "").strip()
    if not title:
        return None
    return search_track(token, title, artist)


def blank_audio_features():
    return {
        "danceability": "",
        "energy": "",
        "key": "",
        "loudness": "",
        "mode": "",
        "speechiness": "",
        "acousticness": "",
        "instrumentalness": "",
        "liveness": "",
        "valence": "",
        "tempo": "",
        "duration_ms": "",
        "time_signature": "",
    }


def build_text_for_embedding(row):
    parts = [
        row.get("song_title", ""),
        row.get("artist", ""),
        row.get("album", ""),
        row.get("artist_genres", ""),
        row.get("custom_mood_tags", ""),
        row.get("listener_context", ""),
        row.get("archetype", ""),
    ]
    return " | ".join(part for part in parts if part)


def write_ml_ready_dataset(raw_rows, output_path):
    if not raw_rows:
        raise RuntimeError("No rows available for ML dataset.")

    selected_columns = [
        "song_title",
        "artist",
        "album",
        "release_year",
        "artist_genres",
        "artist_popularity",
        "artist_followers",
        "popularity",
        "danceability",
        "energy",
        "key",
        "loudness",
        "mode",
        "speechiness",
        "acousticness",
        "instrumentalness",
        "liveness",
        "valence",
        "tempo",
        "duration_ms",
        "time_signature",
        "custom_mood_tags",
        "listener_context",
        "embedding_text",
        "archetype",
    ]

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=selected_columns)
        writer.writeheader()
        for row in raw_rows:
            ml_row = {column: row.get(column, "") for column in selected_columns}
            ml_row["embedding_text"] = build_text_for_embedding(row)
            writer.writerow(ml_row)


def collect(input_path, output_path):
    load_env_file()
    client_id = os.getenv("SPOTIFY_CLIENT_ID")
    client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

    if not client_id or not client_secret:
        raise RuntimeError("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET. Add them to a local .env file.")

    token = get_access_token(client_id, client_secret)

    with open(input_path, "r", encoding="utf-8") as source:
        rows = list(csv.DictReader(source))

    output_rows = []
    for row in rows:
      track = get_track_from_row(token, row)
      if not track:
          title = row.get("song_title", "").strip()
          artist = row.get("artist", "").strip()
          print(f"Not found: {title} - {artist}", file=sys.stderr)
          continue

      features = get_audio_features_or_empty(token, track["id"])
      feature_values = blank_audio_features()
      feature_values.update({key: features.get(key, "") for key in feature_values})

      album = track.get("album", {})
      track_artists = track.get("artists", [])
      artists = ", ".join(artist_item["name"] for artist_item in track_artists)
      primary_artist = get_artist(token, track_artists[0]["id"]) if track_artists else {}
      release_date = album.get("release_date", "")
      release_year = release_date[:4] if release_date else ""

      output_rows.append({
          "song_title": track["name"],
          "artist": artists,
          "spotify_id": track["id"],
          "spotify_url": track["external_urls"]["spotify"],
          "album": album.get("name", ""),
          "release_date": release_date,
          "release_year": release_year,
          "artist_genres": ", ".join(primary_artist.get("genres", [])),
          "artist_popularity": primary_artist.get("popularity", ""),
          "artist_followers": primary_artist.get("followers", {}).get("total", ""),
          "popularity": track.get("popularity", ""),
          **feature_values,
          "custom_mood_tags": row.get("custom_mood_tags", ""),
          "listener_context": row.get("listener_context", ""),
          "archetype": row.get("archetype", ""),
      })
      time.sleep(0.15)

    if not output_rows:
        raise RuntimeError("No tracks were collected.")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=list(output_rows[0].keys()))
        writer.writeheader()
        writer.writerows(output_rows)

    print(f"Wrote {len(output_rows)} rows to {output_path}")
    return output_rows


def main():
    parser = argparse.ArgumentParser(description="Look up Spotify track metadata and audio features for demo preparation.")
    parser.add_argument("--input", default="data/song_inputs.csv")
    parser.add_argument("--output", default="data/spotify_lookup.csv")
    parser.add_argument("--ml-output", default="data/model_dataset.csv")
    args = parser.parse_args()
    raw_rows = collect(args.input, args.output)
    write_ml_ready_dataset(raw_rows, args.ml_output)
    print(f"Wrote ML-ready rows to {args.ml_output}")


if __name__ == "__main__":
    main()
