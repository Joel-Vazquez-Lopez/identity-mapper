import argparse
import csv
import json
import os
import pickle
from collections import Counter


def load_rows(path):
    with open(path, "r", encoding="utf-8", newline="") as source:
        return list(csv.DictReader(source))


def train_with_sentence_transformers(texts, labels, output_dir):
    from sentence_transformers import SentenceTransformer
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import classification_report
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import LabelEncoder

    encoder = LabelEncoder()
    y = encoder.fit_transform(labels)

    x_train, x_test, y_train, y_test = train_test_split(
        texts,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    embedding_model_name = "sentence-transformers/all-MiniLM-L6-v2"
    embedder = SentenceTransformer(embedding_model_name)
    x_train_emb = embedder.encode(x_train, normalize_embeddings=True, show_progress_bar=True)
    x_test_emb = embedder.encode(x_test, normalize_embeddings=True, show_progress_bar=True)

    classifier = LogisticRegression(max_iter=2000, class_weight="balanced")
    classifier.fit(x_train_emb, y_train)
    predictions = classifier.predict(x_test_emb)

    report = classification_report(y_test, predictions, target_names=encoder.classes_, output_dict=True)

    with open(os.path.join(output_dir, "classifier.pkl"), "wb") as target:
        pickle.dump(classifier, target)
    with open(os.path.join(output_dir, "label_encoder.pkl"), "wb") as target:
        pickle.dump(encoder, target)
    with open(os.path.join(output_dir, "training_report.json"), "w", encoding="utf-8") as target:
        json.dump(
            {
                "embedding_model": embedding_model_name,
                "classifier": "LogisticRegression",
                "backend": "sentence-transformers",
                "report": report,
            },
            target,
            indent=2,
        )

    return report, "sentence-transformers"


def train_with_tfidf(texts, labels, output_dir):
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import classification_report
    from sklearn.model_selection import train_test_split
    from sklearn.pipeline import Pipeline

    x_train, x_test, y_train, y_test = train_test_split(
        texts,
        labels,
        test_size=0.2,
        random_state=42,
        stratify=labels,
    )

    pipeline = Pipeline(
        [
            ("vectorizer", TfidfVectorizer(ngram_range=(1, 2), min_df=2, max_features=30000)),
            ("classifier", LogisticRegression(max_iter=2000, class_weight="balanced")),
        ]
    )
    pipeline.fit(x_train, y_train)
    predictions = pipeline.predict(x_test)
    report = classification_report(y_test, predictions, output_dict=True)

    with open(os.path.join(output_dir, "tfidf_classifier.pkl"), "wb") as target:
        pickle.dump(pipeline, target)
    with open(os.path.join(output_dir, "training_report.json"), "w", encoding="utf-8") as target:
        json.dump(
            {
                "embedding_model": "TF-IDF fallback",
                "classifier": "LogisticRegression",
                "backend": "tfidf",
                "report": report,
            },
            target,
            indent=2,
        )

    return report, "tfidf"


def main():
    parser = argparse.ArgumentParser(description="Train the first listener archetype classifier.")
    parser.add_argument("--input", default="data/training_dataset.csv")
    parser.add_argument("--output-dir", default="models/archetype_classifier")
    parser.add_argument("--backend", choices=["auto", "sentence-transformers", "tfidf"], default="auto")
    args = parser.parse_args()

    rows = load_rows(args.input)
    texts = [row["embedding_text"] for row in rows]
    labels = [row["archetype"] for row in rows]

    os.makedirs(args.output_dir, exist_ok=True)
    with open(os.path.join(args.output_dir, "label_distribution.json"), "w", encoding="utf-8") as target:
        json.dump(Counter(labels), target, indent=2)

    if args.backend in ("auto", "sentence-transformers"):
        try:
            report, backend = train_with_sentence_transformers(texts, labels, args.output_dir)
        except ImportError:
            if args.backend == "sentence-transformers":
                raise
            report, backend = train_with_tfidf(texts, labels, args.output_dir)
    else:
        report, backend = train_with_tfidf(texts, labels, args.output_dir)

    accuracy = report.get("accuracy", 0)
    print(f"Trained {backend} classifier on {len(rows)} rows")
    print(f"Accuracy: {accuracy:.3f}")


if __name__ == "__main__":
    main()
