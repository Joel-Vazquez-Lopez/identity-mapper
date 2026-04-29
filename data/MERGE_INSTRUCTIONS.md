# Merge Instructions

Drop the Kaggle CSV files into the project, then run the merge script.

## Expected Sources

### Solomon dataset

Use the CSV files from:

- `high_popularity_spotify_data`
- `low_popularity_spotify_data`

These work best because they include:

- `playlist_name`
- `playlist_genre`
- `playlist_subgenre`
- audio-style columns

### Warda dataset

Use one or more CSV files from the global 2009–2025 dataset.

The merge script will try to read likely fields such as:

- `track_name` or `song_title`
- `artist_name` or `artist`
- `album_name`
- `release_date`
- `genre`
- audio-style columns like `energy`, `danceability`, `valence`

## Suggested Folder

Place them under:

- `data/raw/solomon/`
- `data/raw/warda/`

## Example Run

```bash
python3 scripts/merge_music_datasets.py \
  --solomon "data/raw/solomon/high_popularity_spotify_data.csv,data/raw/solomon/low_popularity_spotify_data.csv" \
  --warda "data/raw/warda/spotify_data_clean.csv,data/raw/warda/track_data_final.csv" \
  --output data/merged_music_dataset.csv
```

## Output

The merged file will contain:

- a shared normalized schema
- `embedding_text`
- `weak_archetype`
- `weak_confidence`

This is the first training-ready base for the real embedding classifier.
