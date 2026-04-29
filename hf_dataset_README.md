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

This dataset supports the project **Who Are You Based On Your Music?**

It contains a processed, balanced training split of 3,250 songs mapped into 15 listener archetypes. The labels are custom weak-supervision labels derived from track metadata, genre/subgenre information, playlist context, and available audio-style values from merged Kaggle music datasets.

The main file is `training_dataset.csv`.

Important columns:

- `song_title`: song name.
- `artist`: artist name.
- `genre`, `subgenre`, `playlist`: normalized context fields.
- `archetype`: target label for classification.
- `embedding_text`: text used to build dense latent semantic embeddings for the classifiers.
- `weak_label`: marks that labels are programmatically generated and should be reviewed before being treated as human gold labels.

Source datasets used during processing:

- `solomonameh/spotify-music-dataset`
- `wardabilal/spotify-global-music-dataset-20092025`
