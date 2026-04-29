import argparse
import csv
import os
import re


COMMON_COLUMNS = [
    "source_dataset",
    "track_name",
    "artist",
    "album",
    "release_date",
    "release_year",
    "genre",
    "subgenre",
    "playlist_name",
    "track_popularity",
    "energy",
    "danceability",
    "valence",
    "tempo",
    "loudness",
    "liveness",
    "speechiness",
    "instrumentalness",
    "acousticness",
    "mode",
    "key",
    "duration_ms",
    "time_signature",
    "embedding_text",
    "weak_archetype",
    "weak_confidence",
]


ARCHETYPE_RULES = {
    "night-drive existentialist": {
        "keywords": ["night", "dark", "after dark", "midnight", "drive", "moody", "shadow", "late night", "atmospheric", "synthwave"],
        "genre_keywords": ["electronic", "dark", "synth-pop", "trip-hop", "ambient"],
    },
    "melancholic indie nostalgia": {
        "keywords": ["indie", "sad", "nostalgia", "bittersweet", "memory", "bedroom", "tender", "heartbreak", "rainy"],
        "genre_keywords": ["indie", "indie-pop", "alternative", "folk", "singer-songwriter"],
    },
    "nostalgic digital dreamer": {
        "keywords": ["dreamy", "nostalgic", "digital", "glow", "neon", "retro", "synth", "vapor", "dream pop"],
        "genre_keywords": ["electronic", "synth-pop", "electro", "new-age", "ambient"],
    },
    "cinematic self-mythologizer": {
        "keywords": ["cinematic", "epic", "dramatic", "anthem", "orchestral", "main character", "grand", "movie"],
        "genre_keywords": ["soundtracks", "opera", "show-tunes", "pop-film", "classical"],
    },
    "retro neon escapist": {
        "keywords": ["retro", "neon", "dance", "party", "disco", "escape", "summer", "club", "80s"],
        "genre_keywords": ["dance", "disco", "house", "electro", "synth-pop", "party"],
    },
    "beautifully detached romantic": {
        "keywords": ["romance", "soft", "gentle", "warm", "romantic", "love", "slow", "intimate"],
        "genre_keywords": ["romance", "r-n-b", "soul", "jazz", "dream pop"],
    },
    "brooding alt antihero": {
        "keywords": ["brooding", "alt", "grunge", "guitar", "rebel", "antihero", "smoke", "storm", "anger"],
        "genre_keywords": ["alt-rock", "alternative", "grunge", "rock", "punk", "hard-rock", "emo"],
    },
    "euphoric transformation seeker": {
        "keywords": ["workout", "uplifting", "euphoria", "festival", "power", "transform", "rise", "victory", "motivation"],
        "genre_keywords": ["edm", "trance", "progressive-house", "dance", "work-out", "house"],
    },
    "ambient ritualist": {
        "keywords": ["meditative", "meditation", "yoga", "ambient", "chill", "sleep", "calm", "wellness", "focus", "study"],
        "genre_keywords": ["ambient", "wellness", "new-age", "lofi", "classical"],
    },
    "global rhythm collector": {
        "keywords": ["latin", "reggaeton", "afro", "afrobeats", "forro", "tropical", "global", "world", "arab", "turkish", "brazilian", "indian", "korean", "j-pop", "k-pop", "cantopop"],
        "genre_keywords": ["latin", "world", "arabic", "afrobeats", "brazilian", "turkish", "indian", "korean", "j-pop", "k-pop", "reggae", "cantopop"],
    },
    "lofi focus drifter": {
        "keywords": ["lofi", "lo-fi", "study", "beats", "chillhop", "focus", "relax", "homework"],
        "genre_keywords": ["lofi", "chill", "ambient"],
    },
    "hip-hop confidence architect": {
        "keywords": ["hip-hop", "rap", "trap", "gangster", "swagger", "drill", "bars", "hustle"],
        "genre_keywords": ["hip-hop", "rap", "trap", "gangster"],
    },
    "heavy catharsis seeker": {
        "keywords": ["metal", "punk", "hard rock", "pop punk", "powerhouses", "rage", "scream", "heavy"],
        "genre_keywords": ["metal", "punk", "hard-rock", "rock"],
    },
    "classic soul romantic": {
        "keywords": ["soul", "r&b", "rnb", "jazz", "blues", "gospel", "romantic", "love", "smooth"],
        "genre_keywords": ["soul", "r&b", "r-n-b", "jazz", "blues", "gospel", "funk"],
    },
    "gaming adrenaline pilot": {
        "keywords": ["gaming", "game", "adrenaline", "boss", "battle", "speedrun", "power"],
        "genre_keywords": ["gaming", "edm", "electronic"],
    },
}


def slug(value):
    return re.sub(r"\s+", " ", (value or "").strip()).lower()


def safe_float(value, default=None):
    try:
        if value is None or value == "":
            return default
        return float(value)
    except (TypeError, ValueError):
        return default


def extract_year(value):
    if not value:
        return ""
    match = re.search(r"(19|20)\d{2}", str(value))
    return match.group(0) if match else ""


def build_embedding_text(row):
    parts = [
        row.get("track_name", ""),
        row.get("artist", ""),
        row.get("genre", ""),
        row.get("subgenre", ""),
        row.get("playlist_name", ""),
    ]
    return " | ".join(part for part in parts if part)


def archetype_scores(row):
    text = " ".join(
        [
            slug(row.get("track_name")),
            slug(row.get("artist")),
            slug(row.get("genre")),
            slug(row.get("subgenre")),
            slug(row.get("playlist_name")),
        ]
    )

    energy = safe_float(row.get("energy"), 0.5)
    valence = safe_float(row.get("valence"), 0.5)
    danceability = safe_float(row.get("danceability"), 0.5)
    acousticness = safe_float(row.get("acousticness"), 0.5)
    instrumentalness = safe_float(row.get("instrumentalness"), 0.0)

    scores = {}
    for archetype, config in ARCHETYPE_RULES.items():
        score = 0.0
        for keyword in config["keywords"]:
            if keyword in text:
                score += 1.2
        for keyword in config["genre_keywords"]:
            if keyword in text:
                score += 1.8

        if archetype == "night-drive existentialist":
            score += max(0, energy - 0.45) * 1.4
            score += max(0, 0.55 - valence) * 1.8
            score += instrumentalness * 0.6
        elif archetype == "melancholic indie nostalgia":
            score += max(0, 0.55 - valence) * 1.7
            score += acousticness * 0.8
            score += max(0, 0.7 - energy) * 0.7
        elif archetype == "nostalgic digital dreamer":
            score += max(0, 0.6 - valence) * 0.4
            score += energy * 0.5
            score += max(0, 0.6 - acousticness) * 0.8
        elif archetype == "cinematic self-mythologizer":
            score += energy * 1.0
            score += max(0, 0.5 - valence) * 0.5
        elif archetype == "retro neon escapist":
            score += danceability * 1.4
            score += valence * 1.5
            score += energy * 1.0
        elif archetype == "beautifully detached romantic":
            score += acousticness * 0.9
            score += max(0, 0.75 - energy) * 0.8
            score += valence * 0.6
        elif archetype == "brooding alt antihero":
            score += max(0, energy - 0.45) * 1.3
            score += max(0, 0.5 - valence) * 1.1
            score += max(0, 0.7 - danceability) * 0.5
        elif archetype == "euphoric transformation seeker":
            score += danceability * 1.1
            score += energy * 1.6
            score += valence * 0.9
        elif archetype == "ambient ritualist":
            score += acousticness * 0.8
            score += instrumentalness * 1.0
            score += max(0, 0.55 - energy) * 1.4
            score += max(0, 0.65 - danceability) * 0.6
        elif archetype == "global rhythm collector":
            score += danceability * 1.0
            score += valence * 0.8
            score += energy * 0.6
        elif archetype == "lofi focus drifter":
            score += max(0, 0.65 - energy) * 1.0
            score += acousticness * 0.7
            score += instrumentalness * 0.5
            score += max(0, 0.65 - valence) * 0.5
        elif archetype == "hip-hop confidence architect":
            score += max(0, energy - 0.45) * 0.9
            score += max(0, danceability - 0.5) * 1.2
            score += max(0, 0.7 - acousticness) * 0.5
        elif archetype == "heavy catharsis seeker":
            score += energy * 1.6
            score += max(0, 0.55 - valence) * 0.6
            score += max(0, 0.65 - danceability) * 0.5
        elif archetype == "classic soul romantic":
            score += valence * 0.8
            score += acousticness * 0.7
            score += max(0, 0.8 - energy) * 0.5
        elif archetype == "gaming adrenaline pilot":
            score += energy * 1.2
            score += danceability * 0.8
            score += max(0, 0.8 - acousticness) * 0.4

        scores[archetype] = score

    return scores


def assign_archetype(row):
    scores = archetype_scores(row)
    ranked = sorted(scores.items(), key=lambda item: item[1], reverse=True)
    top_name, top_score = ranked[0]
    second_score = ranked[1][1] if len(ranked) > 1 else 0.0
    confidence = round(top_score - second_score + 0.5, 3)
    return top_name, confidence


def normalize_solomon_row(row):
    normalized = {
        "source_dataset": "solomonameh",
        "track_name": row.get("track_name", ""),
        "artist": row.get("track_artist", ""),
        "album": row.get("track_album_name", ""),
        "release_date": row.get("track_album_release_date", ""),
        "release_year": extract_year(row.get("track_album_release_date", "")),
        "genre": row.get("playlist_genre", ""),
        "subgenre": row.get("playlist_subgenre", ""),
        "playlist_name": row.get("playlist_name", ""),
        "track_popularity": row.get("track_popularity", ""),
        "energy": row.get("energy", ""),
        "danceability": row.get("danceability", ""),
        "valence": row.get("valence", ""),
        "tempo": row.get("tempo", ""),
        "loudness": row.get("loudness", ""),
        "liveness": row.get("liveness", ""),
        "speechiness": row.get("speechiness", ""),
        "instrumentalness": row.get("instrumentalness", ""),
        "acousticness": row.get("acousticness", ""),
        "mode": row.get("mode", ""),
        "key": row.get("key", ""),
        "duration_ms": row.get("duration_ms", ""),
        "time_signature": row.get("time_signature", ""),
    }
    normalized["embedding_text"] = build_embedding_text(normalized)
    normalized["weak_archetype"], normalized["weak_confidence"] = assign_archetype(normalized)
    return normalized


def normalize_warda_row(row):
    genre = row.get("genre") or row.get("artist_genre") or row.get("track_genre") or row.get("primary_genre") or ""
    subgenre = row.get("subgenre") or row.get("playlist_subgenre") or ""
    playlist_name = row.get("playlist_name") or row.get("context") or row.get("mood") or ""
    track_name = row.get("track_name") or row.get("song_title") or row.get("name") or ""
    artist = row.get("artist_name") or row.get("artist") or row.get("track_artist") or ""
    album = row.get("album_name") or row.get("track_album_name") or row.get("album") or ""
    release_date = row.get("release_date") or row.get("track_album_release_date") or ""
    popularity = row.get("track_popularity") or row.get("popularity") or ""

    normalized = {
        "source_dataset": "wardabilal",
        "track_name": track_name,
        "artist": artist,
        "album": album,
        "release_date": release_date,
        "release_year": extract_year(release_date),
        "genre": genre,
        "subgenre": subgenre,
        "playlist_name": playlist_name,
        "track_popularity": popularity,
        "energy": row.get("energy", ""),
        "danceability": row.get("danceability", ""),
        "valence": row.get("valence", ""),
        "tempo": row.get("tempo", ""),
        "loudness": row.get("loudness", ""),
        "liveness": row.get("liveness", ""),
        "speechiness": row.get("speechiness", ""),
        "instrumentalness": row.get("instrumentalness", ""),
        "acousticness": row.get("acousticness", ""),
        "mode": row.get("mode", ""),
        "key": row.get("key", ""),
        "duration_ms": row.get("duration_ms", ""),
        "time_signature": row.get("time_signature", ""),
    }
    normalized["embedding_text"] = build_embedding_text(normalized)
    normalized["weak_archetype"], normalized["weak_confidence"] = assign_archetype(normalized)
    return normalized


def read_csv(path):
    with open(path, "r", encoding="utf-8", newline="") as source:
        return list(csv.DictReader(source))


def merge_datasets(solomon_paths, warda_paths, output_path):
    merged_rows = []

    for path in solomon_paths:
        for row in read_csv(path):
            merged_rows.append(normalize_solomon_row(row))

    for path in warda_paths:
        for row in read_csv(path):
            merged_rows.append(normalize_warda_row(row))

    output_dir = os.path.dirname(output_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=COMMON_COLUMNS)
        writer.writeheader()
        writer.writerows(merged_rows)

    print(f"Wrote {len(merged_rows)} merged rows to {output_path}")


def split_paths(value):
    if not value:
        return []
    return [path.strip() for path in value.split(",") if path.strip()]


def main():
    parser = argparse.ArgumentParser(description="Merge music datasets into a shared weakly labeled archetype dataset.")
    parser.add_argument("--solomon", default="")
    parser.add_argument("--warda", default="")
    parser.add_argument("--output", default="data/merged_music_dataset.csv")
    args = parser.parse_args()

    solomon_paths = split_paths(args.solomon)
    warda_paths = split_paths(args.warda)

    if not solomon_paths and not warda_paths:
        raise RuntimeError("Provide at least one CSV path with --solomon or --warda.")

    merge_datasets(solomon_paths, warda_paths, args.output)


if __name__ == "__main__":
    main()
