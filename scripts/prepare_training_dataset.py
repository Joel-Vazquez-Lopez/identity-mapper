import argparse
import csv
import os
from collections import Counter, defaultdict


OUTPUT_COLUMNS = [
    "track_name",
    "artist",
    "album",
    "release_year",
    "genre",
    "subgenre",
    "playlist_name",
    "energy",
    "danceability",
    "valence",
    "tempo",
    "acousticness",
    "instrumentalness",
    "track_popularity",
    "embedding_text",
    "archetype",
    "weak_confidence",
    "source_dataset",
]


def safe_float(value, default=0.0):
    try:
        if value is None or value == "":
            return default
        return float(value)
    except (TypeError, ValueError):
        return default


def is_usable(row, min_confidence):
    if not row.get("track_name") or not row.get("artist"):
        return False
    if not row.get("embedding_text") or not row.get("weak_archetype"):
        return False
    return safe_float(row.get("weak_confidence"), 0.0) >= min_confidence


def prepare_dataset(input_path, output_path, max_per_archetype, min_confidence):
    with open(input_path, "r", encoding="utf-8", newline="") as source:
        rows = list(csv.DictReader(source))

    buckets = defaultdict(list)
    seen = set()

    sorted_rows = sorted(rows, key=lambda row: safe_float(row.get("weak_confidence"), 0.0), reverse=True)
    for row in sorted_rows:
        if not is_usable(row, min_confidence):
            continue

        dedupe_key = (row.get("track_name", "").strip().lower(), row.get("artist", "").strip().lower())
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)

        archetype = row["weak_archetype"]
        if len(buckets[archetype]) >= max_per_archetype:
            continue

        prepared = {column: row.get(column, "") for column in OUTPUT_COLUMNS}
        prepared["archetype"] = archetype
        buckets[archetype].append(prepared)

    prepared_rows = []
    for archetype in sorted(buckets):
        prepared_rows.extend(buckets[archetype])

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=OUTPUT_COLUMNS)
        writer.writeheader()
        writer.writerows(prepared_rows)

    print(f"Wrote {len(prepared_rows)} rows to {output_path}")
    for archetype, count in Counter(row["archetype"] for row in prepared_rows).most_common():
        print(f"{count}: {archetype}")


def main():
    parser = argparse.ArgumentParser(description="Create a cleaner balanced training dataset from merged weak labels.")
    parser.add_argument("--input", default="data/merged_music_dataset.csv")
    parser.add_argument("--output", default="data/training_dataset.csv")
    parser.add_argument("--max-per-archetype", type=int, default=300)
    parser.add_argument("--min-confidence", type=float, default=0.55)
    args = parser.parse_args()
    prepare_dataset(args.input, args.output, args.max_per_archetype, args.min_confidence)


if __name__ == "__main__":
    main()
