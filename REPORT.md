# Identity Mapper: Embedding-Based Music Identity Recommendation

**Author:** Joel Vazquez  
**Project:** Identity Mapper  
**Repository:** https://github.com/Joel-Vazquez-Lopez/identity-mapper  
**Demo:** https://huggingface.co/spaces/Jovaz/identity-mapper  
**Dataset:** https://huggingface.co/datasets/Jovaz/identity-mapper-dataset  

## 1. Introduction

Identity Mapper is a recommender-style identity checker that maps user preferences into identity matches. The current system includes a music listener-archetype module and a football team identity module. For the machine-learning part of the project, the music module is the main focus: it predicts a listener archetype from songs selected by the user.

The motivation is that genre labels alone are often too broad to describe music taste. Two songs may share a genre but differ strongly in mood, atmosphere, nostalgia, intensity, or identity association. This project therefore treats music preference as an identity-recommendation problem rather than only a genre-classification problem.

## 2. Dataset

The custom music dataset was created by merging and processing two public Kaggle datasets:

- `solomonameh/spotify-music-dataset`
- `wardabilal/spotify-global-music-dataset-20092025`

The processing pipeline normalized track metadata, artist names, genres, subgenres, playlist names, and available audio-style values. A weak-supervision layer then assigned songs to listener archetypes using genre context, playlist context, artist/style signals, and audio-style patterns. The final training dataset contains 6,259 songs mapped into 21 listener archetypes. The browser demo catalog contains 12,058 searchable songs.

Because the labels are weakly supervised, they should be understood as useful prototype labels rather than perfect human-annotated ground truth. This is one of the main limitations of the current version.

## 3. Embeddings And Classifiers

Each song is represented through an `embedding_text` field that combines track title, artist, genre, subgenre, playlist information, and other available context. The embedding pipeline transforms this text into dense latent semantic vectors using TF-IDF followed by TruncatedSVD. These vectors are then used to train and compare several classifiers:

- Logistic Regression
- Linear SVC
- Ridge Classifier
- KNN
- Random Forest

The best model is stored in `models/embedding_classifiers/best_model.pkl` and is used by the Hugging Face demo through a FastAPI backend. The frontend aggregates song choices into a listener profile and updates the predicted identity interactively.

## 4. Demo System

The demo is hosted on Hugging Face as a Docker Space. It serves a custom HTML, CSS, and JavaScript interface through FastAPI. The app currently includes:

- A music listener-archetype checker.
- Song search and quick-add interaction.
- Song recommendations based on similarity.
- A visual identity space.
- A football team identity matcher using vector matching.
- Planned modules for YouTubers and Stardew Valley character matching.

The football module is included as an extension of the same identity-mapping idea, but the trained embedding/classifier requirement is satisfied by the music module.

## 5. Reflection On AI Tools

AI tools were useful for quickly building the frontend, data-processing scripts, model-training scripts, and deployment workflow. The most useful part was rapid iteration: the project changed from a static classifier into an interactive identity recommender with multiple modules.

However, AI-generated code and labels required checking. The weak-supervision labels may overstate model performance, and the current vector system still needs improvement. In particular, early choices can influence the identity position too strongly, and the music module can sometimes remain stuck under the same archetype label. Future work should improve the vector weighting, collect user feedback, and export user inputs to CSV so the dataset can become more accurate over time.

## 6. Future Work

Future improvements include adding the YouTuber and Stardew Valley modules, improving the vector-space movement, completing missing football badges, and creating a CSV-based feedback collection system. The long-term goal is to make Identity Mapper a multi-domain recommender system that learns from user preferences across music, football, creators, and games.

## References

Solomonameh. (n.d.). *Spotify Music Dataset*. Kaggle. https://www.kaggle.com/datasets/solomonameh/spotify-music-dataset

Wardabilal. (n.d.). *Spotify Global Music Dataset 2009-2025*. Kaggle. https://www.kaggle.com/datasets/wardabilal/spotify-global-music-dataset-20092025

Hugging Face. (n.d.). *Spaces documentation*. https://huggingface.co/docs/hub/spaces
