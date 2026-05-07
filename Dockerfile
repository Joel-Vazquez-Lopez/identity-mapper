FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py api_server.py ./
COPY frontend frontend
COPY data/browser_songs.js data/browser_songs.js
COPY assets/badges assets/badges
COPY models/embedding_classifiers/best_model.pkl models/embedding_classifiers/best_model.pkl

EXPOSE 7860

CMD ["python", "app.py"]
