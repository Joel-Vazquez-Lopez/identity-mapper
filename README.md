# Identity Mapper

A recommender-style identity checker that maps taste across music, football, creators, and game-character spaces.

This repository merges the music listener-archetype project and the earlier football team-finder into one system. The broader product idea is an **identity recommender**: instead of recommending only songs, teams, creators, or characters, the system recommends an identity label that fits the user's preferences.

The main assignment module is music. The user adds songs one at a time, each song contributes a latent aesthetic vector, and the app updates the listener profile dynamically. The football module brings in the earlier team-finder project as a second identity space, using questionnaire vectors, team pools, and club badges. YouTuber and Stardew Valley character modules are planned next.

## Assignment Fit

This project satisfies the core assignment shape:

- Domain problem: build a recommender-style identity checker for music taste.
- Embedding challenge: genre labels alone are too shallow, so songs are represented through latent text/aesthetic embeddings.
- Dataset: merged and processed Kaggle music datasets plus a custom weak-supervision archetype layer.
- Classifier: trained listener-archetype classifiers specific to this project.
- Demo: custom HTML prototype plus Python embedding-model API packaged for a Hugging Face Docker Space.

For grading, the music module is the concrete embedding/classifier system. The larger website shows how the same identity-recommendation idea can expand to other preference domains.

## Current Prototype

- Add individual songs from a 12,058-song browser catalog.
- Switch between identity modules from one HTML interface.
- Save music and football results into a local identity passport.
- Aggregate song vectors into a listener identity vector.
- Answer optional taste-calibration questions adapted from the earlier personality-vector project.
- Predict primary and secondary listener archetypes.
- Show top archetype matches with similarity scores.
- Show detected traits and feature strengths.
- Animate the user's position in a simple identity space.
- Display how each added song shifts the profile.
- Filter football results by team pool: all teams, LaLiga, Premier League, Bundesliga, national teams, or Inazuma Eleven.
- Show football team badges for the matched result.

## System Framing

Identity Mapper works like a recommender system, but the recommendation target is an identity cluster:

```text
user preferences
-> domain-specific vectors or embeddings
-> similarity / classifier model
-> recommended identity match
```

Different modules can use different data sources and models while still sharing the same interface:

- Music: song embeddings plus trained archetype classifiers.
- Football: questionnaire vector matching against team identity vectors.
- YouTubers: planned creator-taste recommender using channels/topics/style signals.
- Stardew Valley: planned character matcher using personality and play-style questions.

## Dataset Status

- `data/song_inputs.csv`: tiny hand-labeled starter file.
- `data/song_inputs_seeded.csv`: larger weakly labeled draft dataset with 384 candidate songs across 8 archetypes.
- `data/model_dataset_seeded.csv`: model-ready version of the seeded dataset, including `embedding_text`.
- `data/merged_music_dataset.csv`: merged Kaggle-derived base dataset with 22,191 rows.
- `data/training_dataset.csv`: expanded training subset with 6,259 rows across 21 archetypes.
- `data/browser_songs.js`: browser-searchable demo catalog with 12,058 deduplicated songs.
- `models/archetype_classifier/`: TF-IDF logistic regression baseline classifier.
- `models/embedding_classifiers/`: embedding classifier comparison, evaluation results, and the model used by the hosted demo API.

The generated training dataset uses weak-supervision labels and confidence scores. It gives us enough volume to build and evaluate classifiers, but the labels should be reviewed before treating model scores as human gold labels.

## Conceptual Pipeline

```text
song input
-> song embedding
optional taste calibration
-> weighted listener vector
-> classifier / archetype similarity scores
-> recommended listener identity
```

## Football Module

The earlier football-team project is now incorporated into the shared Identity Mapper interface. It uses this structure:

```text
answers -> 8-dimensional profile vector -> cosine similarity -> best identity match
```

The music module uses a related identity-vector idea, but with songs as the primary input:

```text
songs + taste calibration -> listener vector -> archetype similarity -> music identity
```

For the assignment, the music module is the core ML deliverable because it uses a custom dataset, embedding-based representations, trained classifiers, and evaluation. The football module is a merged interactive extension that shows the same recommender-style identity idea in another domain.

## Roadmap

- Replace curated song vectors with Spotify metadata and audio features.
- Add lyric embeddings from a transformer model.
- Let users paste Spotify song links.
- Add playlist import after the songs-only version is solid.
- Train a classifier from labeled listener/archetype examples.
- Add a YouTuber identity recommender.
- Add a Stardew Valley character identity checker.
- Store a cross-domain identity profile across modules.

## Train Baseline Model

```bash
python3 scripts/prepare_training_dataset.py
.venv/bin/python scripts/train_archetype_classifier.py --backend tfidf
```

The current baseline uses TF-IDF text features over `embedding_text` plus logistic regression. It is trained on the expanded 21-archetype weak-label space and acts as a comparison model.

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

This serves the custom HTML interface and the trained embedding-model API from the same app. The browser calls `/predict` when served through Python, so the visual prototype can use the real classifier while still working as a standalone HTML file.

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
