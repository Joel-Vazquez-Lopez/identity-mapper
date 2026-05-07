---
license: cc0-1.0
task_categories:
- text-classification
language:
- en
pretty_name: Music Listener Archetype Dataset
size_categories:
- 1K<n<10K
---

# Music Listener Archetype Dataset

This dataset supports the music module of **Identity Mapper**, a recommender-style identity checker.

It contains a processed training split of 6,259 songs mapped into 21 listener archetypes. The labels are custom weak-supervision labels derived from track metadata, genre/subgenre information, playlist context, artist genres, and available audio-style values from merged Kaggle music datasets.

The main training file is `training_dataset.csv`. The demo catalog is included as `browser_songs.js` and contains 12,058 deduplicated searchable songs for the browser interface.

Important columns:

- `track_name`: song name.
- `artist`: artist name.
- `genre`, `subgenre`, `playlist_name`: normalized context fields.
- `archetype`: target label for classification.
- `embedding_text`: text used to build dense latent semantic embeddings for the classifiers.
- `weak_confidence`: confidence score from the weak-supervision labeling rules.

Source datasets used during processing:

- `solomonameh/spotify-music-dataset`
- `wardabilal/spotify-global-music-dataset-20092025`
