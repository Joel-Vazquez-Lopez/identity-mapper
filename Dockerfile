FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py api_server.py index.html styles.css app.js ./
COPY data/browser_songs.js data/browser_songs.js
COPY models/archetype_classifier/tfidf_classifier.pkl models/archetype_classifier/tfidf_classifier.pkl

EXPOSE 7860

CMD ["python", "app.py"]
