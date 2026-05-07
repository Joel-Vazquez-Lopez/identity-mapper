import argparse
import csv
import json
import os


ARCHETYPE_VECTORS = {
    "nostalgic digital dreamer": [0.44, 0.60, 0.94, 0.92, 0.62, 0.40, 0.78, 0.16],
    "night-drive existentialist": [0.52, 0.86, 0.72, 0.70, 0.78, 0.28, 0.72, 0.34],
    "melancholic indie nostalgia": [0.42, 0.74, 0.72, 0.18, 0.80, 0.64, 0.42, 0.22],
    "cinematic self-mythologizer": [0.62, 0.78, 0.58, 0.38, 0.82, 0.28, 0.92, 0.56],
    "retro neon escapist": [0.86, 0.34, 0.78, 0.88, 0.34, 0.54, 0.72, 0.24],
    "beautifully detached romantic": [0.36, 0.62, 0.62, 0.22, 0.66, 0.86, 0.36, 0.12],
    "brooding alt antihero": [0.64, 0.64, 0.44, 0.18, 0.62, 0.30, 0.54, 0.82],
    "ambient ritualist": [0.18, 0.46, 0.54, 0.48, 0.78, 0.70, 0.66, 0.04],
    "global rhythm collector": [0.76, 0.30, 0.42, 0.52, 0.32, 0.72, 0.44, 0.26],
    "lofi focus drifter": [0.24, 0.52, 0.76, 0.42, 0.82, 0.78, 0.38, 0.06],
    "hip-hop confidence architect": [0.78, 0.34, 0.28, 0.36, 0.38, 0.42, 0.50, 0.74],
    "heavy catharsis seeker": [0.88, 0.60, 0.30, 0.18, 0.48, 0.20, 0.56, 0.90],
    "classic soul romantic": [0.42, 0.38, 0.58, 0.18, 0.54, 0.92, 0.34, 0.12],
    "gaming adrenaline pilot": [0.90, 0.24, 0.46, 0.78, 0.24, 0.30, 0.66, 0.62],
    "mainstream pop shapeshifter": [0.78, 0.30, 0.48, 0.60, 0.34, 0.62, 0.54, 0.30],
    "dancefloor serotonin seeker": [0.92, 0.22, 0.46, 0.78, 0.22, 0.68, 0.58, 0.24],
    "techno bunker futurist": [0.90, 0.34, 0.34, 0.96, 0.30, 0.24, 0.70, 0.56],
    "dark academia romantic": [0.32, 0.70, 0.76, 0.18, 0.88, 0.64, 0.82, 0.12],
    "country sunset storyteller": [0.46, 0.48, 0.66, 0.08, 0.66, 0.76, 0.42, 0.20],
    "sad pop confessional": [0.46, 0.82, 0.64, 0.38, 0.86, 0.54, 0.58, 0.18],
}


def safe_float(value, fallback):
    try:
        if value is None or value == "":
            return fallback
        return float(value)
    except (TypeError, ValueError):
        return fallback


def clamp(value):
    return max(0.0, min(1.0, value))


def row_vector(row):
    archetype = row.get("archetype") or row.get("weak_archetype", "")
    base = ARCHETYPE_VECTORS.get(archetype, [0.5] * 8)

    energy = safe_float(row.get("energy"), base[0])
    danceability = safe_float(row.get("danceability"), 0.5)
    valence = safe_float(row.get("valence"), 0.5)
    acousticness = safe_float(row.get("acousticness"), 0.5)
    instrumentalness = safe_float(row.get("instrumentalness"), 0.0)

    vector = [
        clamp((base[0] * 0.55) + (energy * 0.45)),
        clamp((base[1] * 0.65) + ((1 - valence) * 0.35)),
        base[2],
        clamp((base[3] * 0.65) + ((1 - acousticness) * 0.25) + (instrumentalness * 0.10)),
        base[4],
        clamp((base[5] * 0.70) + (valence * 0.30)),
        base[6],
        clamp((base[7] * 0.70) + (energy * 0.20) + ((1 - danceability) * 0.10)),
    ]
    return [round(value, 4) for value in vector]


def export_catalog(input_path, output_path):
    with open(input_path, "r", encoding="utf-8", newline="") as source:
        rows = list(csv.DictReader(source))

    songs = []
    seen = set()
    for row in rows:
        title = (row.get("track_name") or "").strip()
        artist = (row.get("artist") or "").strip()
        if not title or not artist:
            continue

        key = (title.lower(), artist.lower())
        if key in seen:
            continue
        seen.add(key)

        archetype = row.get("archetype") or row.get("weak_archetype", "")
        songs.append(
            {
                "title": title,
                "artist": artist,
                "archetype": archetype,
                "genre": row.get("genre", ""),
                "subgenre": row.get("subgenre", ""),
                "playlist": row.get("playlist_name", ""),
                "vector": row_vector(row),
            }
        )

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as target:
        if output_path.endswith(".js"):
            target.write("window.BROWSER_SONGS=")
            json.dump(songs, target, ensure_ascii=False, separators=(",", ":"))
            target.write(";\n")
        else:
            json.dump(songs, target, ensure_ascii=False, separators=(",", ":"))

    print(f"Wrote {len(songs)} songs to {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Export a compact song catalog for the static browser demo.")
    parser.add_argument("--input", default="data/training_dataset.csv")
    parser.add_argument("--output", default="data/browser_songs.js")
    args = parser.parse_args()
    export_catalog(args.input, args.output)


if __name__ == "__main__":
    main()
