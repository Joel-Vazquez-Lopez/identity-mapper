import pickle
from pathlib import Path

import gradio as gr


MODEL_PATH = Path("models/archetype_classifier/tfidf_classifier.pkl")


ARCHETYPE_DESCRIPTIONS = {
    "ambient ritualist": "Calm, spacious, meditative listening built around focus, atmosphere, and emotional quiet.",
    "beautifully detached romantic": "Warm, gentle, romantic taste that notices feeling without becoming overly dramatic.",
    "brooding alt antihero": "Guitar-heavy, restless, rebellious music with tension and cool-toned emotional weight.",
    "cinematic self-mythologizer": "Grand, dramatic songs that make personal emotion feel like a movie scene.",
    "classic soul romantic": "Soulful, smooth, timeless listening centered on voice, groove, and warmth.",
    "euphoric transformation seeker": "High-energy, motivational music with a sense of lift, movement, and becoming.",
    "gaming adrenaline pilot": "Fast, electric, kinetic tracks built for focus, motion, and competitive energy.",
    "global rhythm collector": "Rhythmic, globally curious taste shaped by movement, language, and place.",
    "heavy catharsis seeker": "Intense, heavy, physical music used as emotional release.",
    "hip-hop confidence architect": "Rhythmic, direct, self-possessed music with presence and sharpness.",
    "lofi focus drifter": "Soft loops, study textures, and quiet background nostalgia.",
    "melancholic indie nostalgia": "Bittersweet, reflective indie moods with memory and emotional softness.",
    "night-drive existentialist": "Nocturnal, atmospheric, introspective music with private intensity.",
    "nostalgic digital dreamer": "Dreamy electronic nostalgia, glowing textures, and digital memory.",
    "retro neon escapist": "Bright, danceable, retro-leaning music that turns nostalgia into motion.",
}


def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Missing model file: {MODEL_PATH}")
    with MODEL_PATH.open("rb") as source:
        return pickle.load(source)


MODEL = load_model()


def parse_songs(raw_text):
    return [line.strip() for line in raw_text.splitlines() if line.strip()]


def predict_profile(song_lines):
    songs = parse_songs(song_lines)
    if not songs:
        return "Add at least one song.", {}, "No listener vector yet."

    listener_text = " | ".join(songs)
    probabilities = MODEL.predict_proba([listener_text])[0]
    ranked = sorted(zip(MODEL.classes_, probabilities), key=lambda item: item[1], reverse=True)

    primary, primary_score = ranked[0]
    secondary, _secondary_score = ranked[1]
    top_scores = {label: float(probability) for label, probability in ranked[:8]}

    summary = (
        f"Primary archetype: {primary}\n"
        f"Secondary archetype: {secondary}\n"
        f"Confidence: {primary_score:.1%}\n\n"
        f"{ARCHETYPE_DESCRIPTIONS.get(primary, '')}"
    )
    vector_note = (
        "Listener profile text:\n"
        f"{listener_text}\n\n"
        "The demo combines the entered songs into one listener representation, then the trained classifier maps it into archetype probabilities."
    )
    return summary, top_scores, vector_note


with gr.Blocks(title="Who Are You Based on Your Music?") as demo:
    gr.Markdown(
        """
        # Who Are You Based on Your Music?
        Add songs, artists, genres, or playlist-style notes. The trained classifier estimates your listener archetype from the combined music profile.
        """
    )

    with gr.Row():
        with gr.Column(scale=1):
            song_input = gr.Textbox(
                label="Songs / music signals",
                lines=10,
                placeholder="After Dark | Mr.Kitty | electronic | synthwave | night drive\n505 | Arctic Monkeys | indie | melancholic nostalgia",
            )
            predict_button = gr.Button("Update listener identity", variant="primary")
        with gr.Column(scale=1):
            result = gr.Textbox(label="Current archetype", lines=8)
            scores = gr.Label(label="Archetype probabilities", num_top_classes=8)

    vector_note = gr.Textbox(label="Listener representation", lines=6)

    gr.Examples(
        examples=[
            ["After Dark | Mr.Kitty | electronic | synthwave | night drive\nResonance | Home | dreamy electronic nostalgia"],
            ["505 | Arctic Monkeys | indie | melancholic nostalgia\nBags | Clairo | bedroom pop | soft romantic"],
            ["EDM Hits | festival anthem | high energy dance\nWorkout electronic | power | transformation"],
            ["Meditative Vibes | ambient | yoga | calm focus\nLofi Hip Hop | study beats | soft loops"],
        ],
        inputs=song_input,
    )

    predict_button.click(predict_profile, inputs=song_input, outputs=[result, scores, vector_note])
    song_input.submit(predict_profile, inputs=song_input, outputs=[result, scores, vector_note])


if __name__ == "__main__":
    demo.launch()
