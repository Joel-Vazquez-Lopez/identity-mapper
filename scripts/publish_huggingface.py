from __future__ import annotations

import argparse
import os
from pathlib import Path

from huggingface_hub import HfApi, create_repo


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SPACE = "music-listener-archetypes"
DEFAULT_DATASET = "music-listener-archetypes-dataset"


SPACE_FILES = {
    "app.py": "app.py",
    "api_server.py": "api_server.py",
    "index.html": "index.html",
    "styles.css": "styles.css",
    "app.js": "app.js",
    "requirements.txt": "requirements.txt",
    "Dockerfile": "Dockerfile",
    "hf_space_README.md": "README.md",
    "data/browser_songs.js": "data/browser_songs.js",
    "models/archetype_classifier/tfidf_classifier.pkl": "models/archetype_classifier/tfidf_classifier.pkl",
}

DATASET_FILES = {
    "hf_dataset_README.md": "README.md",
    "data/training_dataset.csv": "training_dataset.csv",
    "data/DATASET_SCHEMA.md": "DATASET_SCHEMA.md",
    "models/embedding_classifiers/metrics.csv": "metrics.csv",
    "models/embedding_classifiers/evaluation_results.json": "evaluation_results.json",
}


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text().splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def upload_files(api: HfApi, repo_id: str, repo_type: str, files: dict[str, str]) -> None:
    for local, remote in files.items():
        path = ROOT / local
        if not path.exists():
            raise FileNotFoundError(f"Missing required file: {path}")
        api.upload_file(
            path_or_fileobj=str(path),
            path_in_repo=remote,
            repo_id=repo_id,
            repo_type=repo_type,
        )
        print(f"uploaded {remote} -> {repo_id}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Publish the dataset and demo Space to Hugging Face.")
    parser.add_argument("--username", default=None, help="Hugging Face username or organization.")
    parser.add_argument("--space-name", default=DEFAULT_SPACE)
    parser.add_argument("--dataset-name", default=DEFAULT_DATASET)
    args = parser.parse_args()

    load_env(ROOT / ".env")
    token = os.environ.get("HF_TOKEN")
    username = args.username or os.environ.get("HF_USERNAME")
    if not token:
        raise SystemExit("HF_TOKEN is missing. Add it to .env first.")
    if not username:
        raise SystemExit("HF_USERNAME is missing. Add it to .env first.")

    api = HfApi(token=token)
    space_id = f"{username}/{args.space_name}"
    dataset_id = f"{username}/{args.dataset_name}"

    create_repo(
        repo_id=space_id,
        token=token,
        repo_type="space",
        space_sdk="docker",
        exist_ok=True,
    )
    create_repo(
        repo_id=dataset_id,
        token=token,
        repo_type="dataset",
        exist_ok=True,
    )

    upload_files(api, space_id, "space", SPACE_FILES)
    upload_files(api, dataset_id, "dataset", DATASET_FILES)

    print()
    print(f"Space: https://huggingface.co/spaces/{space_id}")
    print(f"Dataset: https://huggingface.co/datasets/{dataset_id}")


if __name__ == "__main__":
    main()
