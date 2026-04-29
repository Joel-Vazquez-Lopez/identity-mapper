# Who Are You Based on Your Music?

## Problem Definition

This project investigates whether a listener archetype can be inferred from songs a user likes. The domain issue is that ordinary genre labels are too broad to describe how people use music for identity, mood, memory, and aesthetics. The project reframes music classification as listener identity inference.

## Dataset

The custom dataset was created by merging and processing two Kaggle music datasets:

- `solomonameh/spotify-music-dataset`
- `wardabilal/spotify-global-music-dataset-20092025`

The merge pipeline normalizes track metadata, genres, subgenres, playlist names, and available audio-style features into a common schema. A weak-supervision layer maps songs into 15 listener archetypes using genre cues, playlist context, and audio feature patterns. The final training file contains 3,250 songs in `data/training_dataset.csv`.

## Embeddings And Classifiers

Each song is represented through an `embedding_text` field combining track, artist, genre, subgenre, and playlist context. The embedding pipeline converts this text into dense latent semantic vectors using TF-IDF followed by TruncatedSVD. Several classifiers are trained and evaluated on a stratified train/test split:

- Logistic Regression
- Linear SVC
- Ridge Classifier
- KNN
- Random Forest

The current best embedding classifier is stored in `models/embedding_classifiers/best_model.pkl`. Evaluation results are stored in `models/embedding_classifiers/evaluation_results.json`.

## Demo

The project includes a custom HTML demo in `index.html`, which provides an interactive listener identity experience. It also includes a Python model API in `api_server.py` and a Gradio fallback in `gradio_app.py`. For Hugging Face, the project can run through `app.py`.

## Reflection On AI Tools

AI tools were useful for quickly scaffolding scripts, frontend interactions, and data-processing workflows. The most important human decisions were defining the archetype taxonomy, checking whether dataset labels were meaningful, and verifying that the project did not simply become genre classification. AI helped with implementation speed, but the generated dataset labels and evaluation results still require critical review because weak labels can overstate performance.

## Links

- GitHub repository: https://github.com/Joel-Vazquez-Lopez/music-listener-archetypes
- Hugging Face dataset: https://huggingface.co/datasets/Jovaz/music-listener-archetypes-dataset
- Hugging Face demo: https://huggingface.co/spaces/Jovaz/music-listener-archetypes
