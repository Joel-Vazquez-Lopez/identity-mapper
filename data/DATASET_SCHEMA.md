# Dataset Schema

Use `data/song_inputs.csv` as the human-labeled input file.

## Required Columns

- `song_title`: Song name.
- `artist`: Main artist name.
- `archetype`: Custom listener archetype label.

## Optional Columns

- `spotify_url`: Spotify track URL or URI. If this is present, lookup is more reliable.
- `custom_mood_tags`: Human-written tags such as `nostalgic`, `dark synth`, `indie longing`.
- `listener_context`: Human-written listening context such as `night driving alone`.

## Generated Files

Running `scripts/spotify_collect.py` creates:

- `data/spotify_lookup.csv`: Raw lookup/enrichment output.
- `data/model_dataset.csv`: Cleaner model-training table with an `embedding_text` column.

## Important Boundary

Spotify can help identify tracks and provide metadata for lookup/demo use. The custom labels, mood tags, and listener contexts are the main project dataset because they are specific to this assignment's problem domain.
