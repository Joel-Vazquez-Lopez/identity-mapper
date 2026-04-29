import argparse
import pickle


def load_model(path):
    with open(path, "rb") as source:
        return pickle.load(source)


def main():
    parser = argparse.ArgumentParser(description="Predict a listener archetype from song/context text.")
    parser.add_argument("text", help="Text such as: track | artist | genre | playlist mood")
    parser.add_argument("--model", default="models/archetype_classifier/tfidf_classifier.pkl")
    parser.add_argument("--top-k", type=int, default=3)
    args = parser.parse_args()

    model = load_model(args.model)
    probabilities = model.predict_proba([args.text])[0]
    labels = model.classes_
    ranked = sorted(zip(labels, probabilities), key=lambda item: item[1], reverse=True)

    for label, probability in ranked[: args.top_k]:
        print(f"{label}: {probability:.3f}")


if __name__ == "__main__":
    main()
