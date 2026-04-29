import argparse
import csv
import os
import sys
import time
import urllib.parse

from spotify_collect import get_access_token, load_env_file, search_track, request_json, API_BASE


ARCHETYPE_QUERIES = {
    "night-drive existentialist": {
        "queries": [
            "dark synthwave",
            "night drive",
            "dark electronic",
            "after dark",
            "lonely night",
        ],
        "tags": "dark synth; nocturnal; detached; atmospheric; introspective",
        "context": "driving or walking alone at night",
    },
    "melancholic indie nostalgia": {
        "queries": [
            "melancholic indie",
            "sad indie",
            "indie nostalgia",
            "bedroom pop sad",
            "bittersweet indie",
        ],
        "tags": "indie; bittersweet; nostalgic; intimate; reflective",
        "context": "remembering an old relationship or a younger version of yourself",
    },
    "nostalgic digital dreamer": {
        "queries": [
            "synthwave nostalgia",
            "dreamy electronic",
            "vaporwave",
            "retrowave",
            "digital nostalgia",
        ],
        "tags": "synthwave; dreamy; digital; nostalgic; glowing",
        "context": "old memories filtered through screens and neon light",
    },
    "cinematic self-mythologizer": {
        "queries": [
            "cinematic pop",
            "dramatic emotional",
            "epic sad song",
            "orchestral pop",
            "main character song",
        ],
        "tags": "cinematic; dramatic; grand; emotional; self-mythologizing",
        "context": "turning personal conflict into a movie scene",
    },
    "retro neon escapist": {
        "queries": [
            "retro pop",
            "neon pop",
            "dance synth pop",
            "80s pop",
            "upbeat synth",
        ],
        "tags": "retro; upbeat; neon; danceable; escapist",
        "context": "escaping into bright movement and polished nostalgia",
    },
    "beautifully detached romantic": {
        "queries": [
            "soft romantic",
            "dream pop romantic",
            "gentle indie",
            "warm bedroom pop",
            "lofi romantic",
        ],
        "tags": "warm; romantic; gentle; understated; emotionally observant",
        "context": "quietly feeling something without saying it too loudly",
    },
    "brooding alt antihero": {
        "queries": [
            "brooding alternative",
            "dark rock",
            "alt rock moody",
            "rebellious rock",
            "grunge mood",
        ],
        "tags": "brooding; rebellious; guitar-heavy; restless; cool-toned",
        "context": "walking into a scene with tension and swagger",
    },
    "euphoric transformation seeker": {
        "queries": [
            "euphoric electronic",
            "uplifting dance",
            "workout electronic",
            "festival anthem",
            "high energy pop",
        ],
        "tags": "euphoric; high-energy; motivational; explosive; transformational",
        "context": "wanting to become a sharper, stronger version of yourself",
    },
}


def spotify_search(token, query, limit):
    params = urllib.parse.urlencode({"q": query, "type": "track", "limit": str(limit)})
    payload = request_json(
        f"{API_BASE}/search?{params}",
        headers={"Authorization": f"Bearer {token}"},
    )
    return payload.get("tracks", {}).get("items", [])


def seed_dataset(output_path, per_query):
    load_env_file()
    client_id = os.getenv("SPOTIFY_CLIENT_ID")
    client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

    if not client_id or not client_secret:
        raise RuntimeError("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET. Add them to .env first.")

    token = get_access_token(client_id, client_secret)
    seen_track_ids = set()
    rows = []

    for archetype, config in ARCHETYPE_QUERIES.items():
        for query in config["queries"]:
            try:
                tracks = spotify_search(token, query, per_query)
            except RuntimeError as error:
                print(f"Search failed for {query}: {error}", file=sys.stderr)
                continue

            for track in tracks:
                track_id = track.get("id")
                if not track_id or track_id in seen_track_ids:
                    continue

                seen_track_ids.add(track_id)
                artist = ", ".join(artist_item["name"] for artist_item in track.get("artists", []))
                rows.append(
                    {
                        "song_title": track.get("name", ""),
                        "artist": artist,
                        "spotify_url": track.get("external_urls", {}).get("spotify", ""),
                        "custom_mood_tags": config["tags"],
                        "listener_context": config["context"],
                        "archetype": archetype,
                        "seed_query": query,
                        "weak_label": "yes",
                    }
                )

            time.sleep(0.15)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as target:
        fieldnames = [
            "song_title",
            "artist",
            "spotify_url",
            "custom_mood_tags",
            "listener_context",
            "archetype",
            "seed_query",
            "weak_label",
        ]
        writer = csv.DictWriter(target, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} weakly labeled candidate songs to {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Create a large weakly labeled starter song dataset by archetype.")
    parser.add_argument("--output", default="data/song_inputs_seeded.csv")
    parser.add_argument("--per-query", type=int, default=12)
    args = parser.parse_args()
    seed_dataset(args.output, args.per_query)


if __name__ == "__main__":
    main()
