import argparse
import pickle

import numpy as np


def load_model(path):
    with open(path, "rb") as source:
        return pickle.load(source)


def predict_scores(model, text):
    if hasattr(model, "predict_proba"):
        return model.predict_proba([text])[0]

    scores = model.decision_function([text])[0]
    scores = np.asarray(scores, dtype=float)
    scores = scores - scores.max()
    exp_scores = np.exp(scores)
    return exp_scores / exp_scores.sum()


def main():
    parser = argparse.ArgumentParser(description="Predict a listener archetype from song/context text.")
    parser.add_argument("text", help="Text such as: track | artist | genre | playlist mood")
    parser.add_argument("--model", default="models/embedding_classifiers/best_model.pkl")
    parser.add_argument("--top-k", type=int, default=3)
    args = parser.parse_args()

    model = load_model(args.model)
    probabilities = predict_scores(model, args.text)
    labels = model.classes_
    ranked = sorted(zip(labels, probabilities), key=lambda item: item[1], reverse=True)

    for label, probability in ranked[: args.top_k]:
        print(f"{label}: {probability:.3f}")


if __name__ == "__main__":
    main()
