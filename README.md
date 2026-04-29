# Who Are You Based on Your Music?

Embedding-based listener archetype inference using song preferences.

This is a songs-only prototype. The user adds songs one at a time, each song contributes a latent aesthetic vector, and the app updates the listener profile dynamically.

## Assignment Fit

This project satisfies the core assignment shape:

- Domain problem: infer listener music identity from song preferences.
- Embedding challenge: genre labels alone are too shallow, so songs are represented through latent text/aesthetic embeddings.
- Dataset: merged and processed Kaggle music datasets plus a custom weak-supervision archetype layer.
- Classifier: trained listener-archetype classifiers specific to this project.
- Demo: custom HTML prototype plus Python model API packaged for a Hugging Face Docker Space.

## Current Prototype

- Add individual songs from a curated demo catalog.
- Aggregate song vectors into a listener identity vector.
- Answer optional taste-calibration questions adapted from the earlier personality-vector project.
- Predict primary and secondary listener archetypes.
- Show top archetype matches with similarity scores.
- Show detected traits and feature strengths.
- Animate the user's position in a simple identity space.
- Display how each added song shifts the profile.

## Dataset Status

- `data/song_inputs.csv`: tiny hand-labeled starter file.
- `data/song_inputs_seeded.csv`: larger weakly labeled draft dataset with 384 candidate songs across 8 archetypes.
- `data/model_dataset_seeded.csv`: model-ready version of the seeded dataset, including `embedding_text`.
- `data/merged_music_dataset.csv`: merged Kaggle-derived base dataset with 22,191 rows.
- `data/training_dataset.csv`: balanced training subset with 3,250 rows across 15 archetypes.
- `models/archetype_classifier/`: TF-IDF logistic regression classifier used by the hosted demo API.
- `models/embedding_classifiers/`: embedding classifier comparison and evaluation results.

The generated training dataset is intentionally marked with `weak_label=yes`. It gives us enough volume to build and evaluate classifiers, but the labels should be reviewed before treating model scores as human gold labels.

## Conceptual Pipeline

```text
song input
-> song embedding
optional taste calibration
-> weighted listener vector
-> archetype similarity scores
-> evolving listener identity
```

## How It Uses the Earlier Project

The previous football-team project used a strong core idea:

```text
answers -> 8-dimensional profile vector -> cosine similarity -> best identity match
```

This prototype keeps that model structure, but reframes the domain:

```text
songs + taste calibration -> listener vector -> archetype similarity -> music identity
```

Songs remain the main input. The calibration quiz is a smaller secondary signal, useful for showing how the old project logic can be merged into the new music-embedding idea.

## Later Expansion

- Replace curated song vectors with Spotify metadata and audio features.
- Add lyric embeddings from a transformer model.
- Let users paste Spotify song links.
- Add playlist import after the songs-only version is solid.
- Train a classifier from labeled listener/archetype examples.

## Train Baseline Model

```bash
python3 scripts/prepare_training_dataset.py
.venv/bin/python scripts/train_archetype_classifier.py --backend tfidf
```

The current baseline uses TF-IDF text features over `embedding_text` plus logistic regression. It is trained on the expanded 15-archetype weak-label space and acts as the working classifier baseline while the sentence-transformer embedding version is added.

## Train Embedding Classifiers

```bash
.venv/bin/python scripts/train_embedding_classifiers.py
```

This trains several classifiers on dense latent semantic embeddings produced from `embedding_text` using TF-IDF followed by TruncatedSVD. Results are written to `models/embedding_classifiers/`.

## Predict

```bash
.venv/bin/python scripts/predict_archetype.py "After Dark | Mr.Kitty | electronic | synthwave | night drive alone"
```

## Run Custom HTML + Model API

```bash
.venv/bin/python app.py
```

This serves the custom HTML interface and the trained model API from the same app. The browser calls `/predict` when served through Python, so the visual prototype can use the real classifier while still working as a standalone HTML file.

## Publish To Hugging Face

Create a `.env` file with:

```bash
HF_TOKEN=your_huggingface_token
HF_USERNAME=your_huggingface_username
```

Then run:

```bash
.venv/bin/python scripts/publish_huggingface.py
```

The script creates:

- a Docker Space for the working demo.
- a Dataset repository with `training_dataset.csv`, schema notes, and evaluation metrics.

Private API keys and raw Kaggle files are intentionally excluded from the published repos.

## Optional Gradio Demo

```bash
.venv/bin/python gradio_app.py
```

## Run

For a quick local visual preview, open `index.html` in a browser. For the full model-backed version, run `app.py`.
