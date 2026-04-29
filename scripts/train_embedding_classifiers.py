import argparse
import csv
import json
import os
import pickle
from collections import Counter

from sklearn.decomposition import TruncatedSVD
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression, RidgeClassifier
from sklearn.metrics import accuracy_score, classification_report, f1_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import Normalizer
from sklearn.svm import LinearSVC


def load_dataset(path):
    with open(path, "r", encoding="utf-8", newline="") as source:
        rows = list(csv.DictReader(source))
    texts = [row["embedding_text"] for row in rows]
    labels = [row["archetype"] for row in rows]
    return rows, texts, labels


def build_embedding_steps(n_components):
    return [
        ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=2, max_features=40000)),
        ("svd", TruncatedSVD(n_components=n_components, random_state=42)),
        ("normalize", Normalizer(copy=False)),
    ]


def classifier_specs():
    return {
        "logistic_regression": LogisticRegression(max_iter=2500, class_weight="balanced"),
        "linear_svc": LinearSVC(class_weight="balanced", random_state=42),
        "ridge_classifier": RidgeClassifier(class_weight="balanced"),
        "knn": KNeighborsClassifier(n_neighbors=9, weights="distance"),
        "random_forest": RandomForestClassifier(
            n_estimators=240,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1,
        ),
    }


def train_and_evaluate(input_path, output_dir, n_components):
    rows, texts, labels = load_dataset(input_path)
    x_train, x_test, y_train, y_test = train_test_split(
        texts,
        labels,
        test_size=0.2,
        random_state=42,
        stratify=labels,
    )

    os.makedirs(output_dir, exist_ok=True)

    results = {}
    best_name = None
    best_model = None
    best_macro_f1 = -1.0

    for name, classifier in classifier_specs().items():
        model = Pipeline(build_embedding_steps(n_components) + [("classifier", classifier)])
        model.fit(x_train, y_train)
        predictions = model.predict(x_test)

        accuracy = accuracy_score(y_test, predictions)
        macro_f1 = f1_score(y_test, predictions, average="macro")
        weighted_f1 = f1_score(y_test, predictions, average="weighted")

        results[name] = {
            "accuracy": accuracy,
            "macro_f1": macro_f1,
            "weighted_f1": weighted_f1,
            "report": classification_report(y_test, predictions, output_dict=True),
        }

        if macro_f1 > best_macro_f1:
            best_macro_f1 = macro_f1
            best_name = name
            best_model = model

    with open(os.path.join(output_dir, "best_model.pkl"), "wb") as target:
        pickle.dump(best_model, target)

    summary = {
        "dataset": input_path,
        "rows": len(rows),
        "label_distribution": Counter(labels),
        "embedding_method": "TF-IDF followed by TruncatedSVD dense latent semantic embeddings",
        "embedding_dimensions": n_components,
        "best_classifier": best_name,
        "results": results,
    }

    with open(os.path.join(output_dir, "evaluation_results.json"), "w", encoding="utf-8") as target:
        json.dump(summary, target, indent=2)

    with open(os.path.join(output_dir, "metrics.csv"), "w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=["classifier", "accuracy", "macro_f1", "weighted_f1"])
        writer.writeheader()
        for name, metrics in results.items():
            writer.writerow(
                {
                    "classifier": name,
                    "accuracy": round(metrics["accuracy"], 4),
                    "macro_f1": round(metrics["macro_f1"], 4),
                    "weighted_f1": round(metrics["weighted_f1"], 4),
                }
            )

    print(f"Best classifier: {best_name}")
    print(f"Best macro F1: {best_macro_f1:.3f}")
    print(f"Wrote results to {output_dir}")


def main():
    parser = argparse.ArgumentParser(description="Train several classifiers using dense text embeddings.")
    parser.add_argument("--input", default="data/training_dataset.csv")
    parser.add_argument("--output-dir", default="models/embedding_classifiers")
    parser.add_argument("--dimensions", type=int, default=128)
    args = parser.parse_args()
    train_and_evaluate(args.input, args.output_dir, args.dimensions)


if __name__ == "__main__":
    main()
