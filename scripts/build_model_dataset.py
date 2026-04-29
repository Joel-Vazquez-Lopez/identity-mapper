import argparse
import csv
import os


MODEL_COLUMNS = [
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
    "spotify_url",
    "seed_query",
    "weak_label",
]


def build_embedding_text(row):
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


def build_dataset(input_path, output_path):
    with open(input_path, "r", encoding="utf-8", newline="") as source:
        rows = list(csv.DictReader(source))

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=MODEL_COLUMNS)
        writer.writeheader()
        for row in rows:
            model_row = {column: row.get(column, "") for column in MODEL_COLUMNS}
            model_row["embedding_text"] = row.get("embedding_text") or build_embedding_text(row)
            writer.writerow(model_row)

    print(f"Wrote {len(rows)} rows to {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Build a model-ready dataset from a labeled song input CSV.")
    parser.add_argument("--input", default="data/song_inputs_seeded.csv")
    parser.add_argument("--output", default="data/model_dataset_seeded.csv")
    args = parser.parse_args()
    build_dataset(args.input, args.output)


if __name__ == "__main__":
    main()
