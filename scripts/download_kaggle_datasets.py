import argparse
import os
import subprocess
import sys
from pathlib import Path

from merge_music_datasets import merge_datasets


KAGGLE_BIN = Path(".venv/bin/kaggle")
KAGGLE_CONFIG_DIR = Path(".kaggle")


DATASETS = {
    "solomon": {
        "id": "solomonameh/spotify-music-dataset",
        "dir": Path("data/raw/solomon"),
    },
    "warda": {
        "id": "wardabilal/spotify-global-music-dataset-20092025",
        "dir": Path("data/raw/warda"),
    },
}


def load_env_file(path=".env"):
    if not os.path.exists(path):
        return

    with open(path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


def ensure_kaggle_credentials():
    username = os.getenv("KAGGLE_USERNAME", "")
    key = os.getenv("KAGGLE_KEY", "")
    missing = (
        not username
        or not key
        or username.startswith("paste_")
        or key.startswith("paste_")
        or username.startswith("your_")
        or key.startswith("your_")
    )
    if missing:
        raise RuntimeError("Add KAGGLE_USERNAME and KAGGLE_KEY to .env before downloading.")
    KAGGLE_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    os.environ.setdefault("KAGGLE_CONFIG_DIR", str(KAGGLE_CONFIG_DIR.resolve()))


def ensure_kaggle_cli():
    if KAGGLE_BIN.exists():
        command = [str(KAGGLE_BIN), "--version"]
    else:
        command = ["kaggle", "--version"]

    result = subprocess.run(
        command,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
        env=os.environ.copy(),
    )
    if result.returncode != 0:
        raise RuntimeError("Kaggle package is not installed. Run: python3 -m pip install kaggle")


def download_dataset(dataset_id, output_dir):
    output_dir.mkdir(parents=True, exist_ok=True)
    command = str(KAGGLE_BIN) if KAGGLE_BIN.exists() else "kaggle"
    subprocess.run(
        [
            command,
            "datasets",
            "download",
            "-d",
            dataset_id,
            "-p",
            str(output_dir),
            "--unzip",
        ],
        check=True,
        env=os.environ.copy(),
    )


def csv_paths(path):
    return sorted(str(csv_path) for csv_path in path.rglob("*.csv"))


def main():
    parser = argparse.ArgumentParser(description="Download the Kaggle music datasets and optionally merge them.")
    parser.add_argument("--skip-download", action="store_true", help="Use existing files in data/raw instead of downloading.")
    parser.add_argument("--merge", action="store_true", help="Merge downloaded CSVs into data/merged_music_dataset.csv.")
    parser.add_argument("--output", default="data/merged_music_dataset.csv")
    args = parser.parse_args()

    load_env_file()
    ensure_kaggle_credentials()
    ensure_kaggle_cli()

    if not args.skip_download:
        for config in DATASETS.values():
            download_dataset(config["id"], config["dir"])

    if args.merge:
        solomon_paths = csv_paths(DATASETS["solomon"]["dir"])
        warda_paths = csv_paths(DATASETS["warda"]["dir"])
        if not solomon_paths and not warda_paths:
            raise RuntimeError("No CSV files found under data/raw/solomon or data/raw/warda.")
        merge_datasets(solomon_paths, warda_paths, args.output)


if __name__ == "__main__":
    main()
