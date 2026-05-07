import pickle
from pathlib import Path

import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models/embedding_classifiers/best_model.pkl"


class PredictRequest(BaseModel):
    text: str
    top_k: int = 8


app = FastAPI(title="Music Archetype API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory=BASE_DIR), name="static")


def load_model():
    with MODEL_PATH.open("rb") as source:
        return pickle.load(source)


MODEL = load_model()


def predict_scores(text):
    if hasattr(MODEL, "predict_proba"):
        return MODEL.predict_proba([text])[0]

    scores = MODEL.decision_function([text])[0]
    scores = np.asarray(scores, dtype=float)
    scores = scores - scores.max()
    exp_scores = np.exp(scores)
    return exp_scores / exp_scores.sum()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def index():
    return FileResponse(BASE_DIR / "index.html")


@app.get("/styles.css")
def styles():
    return FileResponse(BASE_DIR / "styles.css", media_type="text/css")


@app.get("/app.js")
def frontend_script():
    return FileResponse(BASE_DIR / "app.js", media_type="application/javascript")


@app.get("/data/browser_songs.js")
def browser_songs():
    return FileResponse(BASE_DIR / "data/browser_songs.js", media_type="application/javascript")


@app.post("/predict")
def predict(request: PredictRequest):
    text = request.text.strip()
    if not text:
        return {"predictions": []}

    probabilities = predict_scores(text)
    ranked = sorted(zip(MODEL.classes_, probabilities), key=lambda item: item[1], reverse=True)
    predictions = [
        {"label": str(label), "probability": float(probability)}
        for label, probability in ranked[: request.top_k]
    ]
    return {"predictions": predictions}
