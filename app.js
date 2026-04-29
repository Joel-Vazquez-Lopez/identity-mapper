const featureKeys = [
  "energy",
  "melancholy",
  "nostalgia",
  "electronic",
  "introspection",
  "warmth",
  "cinematic",
  "rebellion"
];

let songs = [
  {
    title: "After Dark",
    artist: "Mr.Kitty",
    vector: [0.48, 0.84, 0.76, 0.86, 0.72, 0.24, 0.68, 0.34]
  },
  {
    title: "505",
    artist: "Arctic Monkeys",
    vector: [0.56, 0.78, 0.68, 0.22, 0.82, 0.42, 0.58, 0.38]
  },
  {
    title: "Resonance",
    artist: "Home",
    vector: [0.44, 0.58, 0.92, 0.94, 0.64, 0.38, 0.78, 0.18]
  },
  {
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    vector: [0.52, 0.64, 0.70, 0.18, 0.68, 0.56, 0.48, 0.30]
  },
  {
    title: "Space Song",
    artist: "Beach House",
    vector: [0.26, 0.76, 0.88, 0.48, 0.86, 0.64, 0.82, 0.08]
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    vector: [0.88, 0.38, 0.76, 0.84, 0.36, 0.54, 0.70, 0.30]
  },
  {
    title: "Runaway",
    artist: "Kanye West",
    vector: [0.52, 0.88, 0.58, 0.36, 0.88, 0.30, 0.86, 0.54]
  },
  {
    title: "Bags",
    artist: "Clairo",
    vector: [0.34, 0.66, 0.72, 0.16, 0.78, 0.82, 0.34, 0.14]
  },
  {
    title: "Midnight City",
    artist: "M83",
    vector: [0.76, 0.42, 0.88, 0.90, 0.42, 0.48, 0.86, 0.22]
  },
  {
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    vector: [0.62, 0.62, 0.46, 0.18, 0.62, 0.34, 0.54, 0.72]
  },
  {
    title: "Chamber of Reflection",
    artist: "Mac DeMarco",
    vector: [0.28, 0.78, 0.86, 0.48, 0.90, 0.52, 0.56, 0.12]
  },
  {
    title: "Bad Habit",
    artist: "Steve Lacy",
    vector: [0.64, 0.44, 0.54, 0.34, 0.48, 0.78, 0.36, 0.26]
  }
];

if (Array.isArray(window.BROWSER_SONGS) && window.BROWSER_SONGS.length > 0) {
  songs = window.BROWSER_SONGS;
}

const archetypes = [
  {
    name: "nostalgic digital dreamer",
    nameEs: "sonador digital nostalgico",
    vector: [0.44, 0.60, 0.94, 0.92, 0.62, 0.40, 0.78, 0.16],
    traits: ["nostalgic", "synth-heavy", "dreamy", "late-night", "atmospheric"],
    traitsEs: ["nostalgico", "sintetico", "sonador", "nocturno", "atmosferico"],
    description: "You gravitate toward glowing electronic textures, memory-soaked melodies, and songs that feel like a city seen through a train window."
    ,
    descriptionEs: "Te atraen las texturas electronicas brillantes, las melodias llenas de memoria y las canciones que se sienten como una ciudad vista desde un tren."
  },
  {
    name: "night-drive existentialist",
    nameEs: "existencialista de viaje nocturno",
    vector: [0.52, 0.86, 0.72, 0.70, 0.78, 0.28, 0.72, 0.34],
    traits: ["introspective", "shadowy", "cinematic", "emotionally distant", "after-hours"],
    traitsEs: ["introspectivo", "sombrio", "cinematico", "emocionalmente distante", "nocturno"],
    description: "Your taste leans toward atmospheric songs with emotional distance, private intensity, and the feeling of thinking too much after midnight.",
    descriptionEs: "Tu gusto apunta a canciones atmosfericas con distancia emocional, intensidad privada y esa sensacion de pensar demasiado despues de medianoche."
  },
  {
    name: "melancholic indie nostalgia",
    nameEs: "nostalgia indie melancolica",
    vector: [0.42, 0.74, 0.72, 0.18, 0.80, 0.64, 0.42, 0.22],
    traits: ["indie", "tender", "bittersweet", "self-reflective", "softly nostalgic"],
    traitsEs: ["indie", "tierno", "agridulce", "reflexivo", "suavemente nostalgico"],
    description: "Your profile points toward intimate guitar-driven moods, warm sadness, and songs that make ordinary memories feel cinematic.",
    descriptionEs: "Tu perfil apunta a estados intimos con guitarras, tristeza calida y canciones que vuelven cinematica una memoria normal."
  },
  {
    name: "cinematic self-mythologizer",
    nameEs: "mitificador cinematico",
    vector: [0.62, 0.78, 0.58, 0.38, 0.82, 0.28, 0.92, 0.56],
    traits: ["dramatic", "self-aware", "grand", "conflicted", "movie-scene energy"],
    traitsEs: ["dramatico", "autoconsciente", "grande", "conflictivo", "energia de pelicula"],
    description: "You seem drawn to emotionally huge songs that turn personal conflict into a full-scale scene.",
    descriptionEs: "Pareces inclinarte hacia canciones emocionalmente enormes que convierten un conflicto personal en una escena completa."
  },
  {
    name: "retro neon escapist",
    nameEs: "escapista neon retro",
    vector: [0.86, 0.34, 0.78, 0.88, 0.34, 0.54, 0.72, 0.24],
    traits: ["upbeat", "neon", "retro", "escapist", "danceable"],
    traitsEs: ["energico", "neon", "retro", "escapista", "bailable"],
    description: "Your taste favors bright momentum, polished synths, and songs that turn nostalgia into movement.",
    descriptionEs: "Tu gusto favorece el impulso brillante, los sintetizadores pulidos y canciones que convierten la nostalgia en movimiento."
  },
  {
    name: "beautifully detached romantic",
    nameEs: "romantico bellamente distante",
    vector: [0.36, 0.62, 0.62, 0.22, 0.66, 0.86, 0.36, 0.12],
    traits: ["warm", "romantic", "low-key", "gentle", "emotionally observant"],
    traitsEs: ["calido", "romantico", "discreto", "suave", "emocionalmente observador"],
    description: "You lean toward warm, understated songs that notice small feelings without making a spectacle of them.",
    descriptionEs: "Te inclinas por canciones calidas y discretas que notan sentimientos pequenos sin convertirlos en espectaculo."
  },
  {
    name: "brooding alt antihero",
    nameEs: "antiheroe alternativo sombrio",
    vector: [0.64, 0.64, 0.44, 0.18, 0.62, 0.30, 0.54, 0.82],
    traits: ["restless", "guitar-heavy", "brooding", "cool-toned", "rebellious"],
    traitsEs: ["inquieto", "con guitarras", "sombrio", "frio", "rebelde"],
    description: "Your listener vector carries tension, swagger, and a preference for songs with a little emotional smoke in the room.",
    descriptionEs: "Tu vector de oyente lleva tension, actitud y una preferencia por canciones con un poco de humo emocional en la habitacion."
  },
  {
    name: "ambient ritualist",
    nameEs: "ritualista ambient",
    vector: [0.18, 0.46, 0.54, 0.48, 0.78, 0.70, 0.66, 0.04],
    traits: ["calm", "meditative", "spacious", "focused", "low-intensity"],
    traitsEs: ["calmo", "meditativo", "espacioso", "concentrado", "baja intensidad"],
    description: "Your taste leans toward spacious, calming soundscapes that make music feel like a ritual or a place to think.",
    descriptionEs: "Tu gusto se inclina hacia paisajes sonoros calmados y espaciosos que hacen que la musica se sienta como un ritual o un lugar para pensar."
  },
  {
    name: "global rhythm collector",
    nameEs: "coleccionista de ritmos globales",
    vector: [0.76, 0.30, 0.42, 0.52, 0.32, 0.72, 0.44, 0.26],
    traits: ["rhythmic", "global", "warm", "movement-driven", "curious"],
    traitsEs: ["ritmico", "global", "calido", "con movimiento", "curioso"],
    description: "You seem drawn to rhythm, language, place, and songs that feel connected to scenes beyond one narrow genre lane.",
    descriptionEs: "Pareces atraido por el ritmo, el idioma, el lugar y canciones conectadas a escenas que van mas alla de un solo genero."
  },
  {
    name: "lofi focus drifter",
    nameEs: "drifter lofi concentrado",
    vector: [0.24, 0.52, 0.76, 0.42, 0.82, 0.78, 0.38, 0.06],
    traits: ["lofi", "study-minded", "soft", "loopable", "quietly nostalgic"],
    traitsEs: ["lofi", "de estudio", "suave", "repetible", "nostalgico discreto"],
    description: "Your profile points toward soft loops, focus-friendly textures, and music that keeps you company without demanding the whole room.",
    descriptionEs: "Tu perfil apunta a loops suaves, texturas para concentrarse y musica que te acompana sin pedir toda la atencion."
  },
  {
    name: "hip-hop confidence architect",
    nameEs: "arquitecto de confianza hip-hop",
    vector: [0.78, 0.34, 0.28, 0.36, 0.38, 0.42, 0.50, 0.74],
    traits: ["confident", "rhythmic", "direct", "swaggering", "high-presence"],
    traitsEs: ["seguro", "ritmico", "directo", "con actitud", "presente"],
    description: "Your taste carries momentum, verbal presence, and a preference for tracks that feel self-possessed and sharp.",
    descriptionEs: "Tu gusto lleva impulso, presencia verbal y preferencia por canciones que se sienten seguras y afiladas."
  },
  {
    name: "heavy catharsis seeker",
    nameEs: "buscador de catarsis pesada",
    vector: [0.88, 0.60, 0.30, 0.18, 0.48, 0.20, 0.56, 0.90],
    traits: ["intense", "heavy", "cathartic", "rebellious", "high-impact"],
    traitsEs: ["intenso", "pesado", "catartico", "rebelde", "impactante"],
    description: "You use music as release: distorted, forceful, physical, and emotionally direct.",
    descriptionEs: "Usas la musica como liberacion: distorsionada, fuerte, fisica y emocionalmente directa."
  },
  {
    name: "classic soul romantic",
    nameEs: "romantico de soul clasico",
    vector: [0.42, 0.38, 0.58, 0.18, 0.54, 0.92, 0.34, 0.12],
    traits: ["soulful", "smooth", "romantic", "warm", "timeless"],
    traitsEs: ["soulful", "suave", "romantico", "calido", "atemporal"],
    description: "Your listening identity is warm, expressive, and connected to groove, voice, and emotional smoothness.",
    descriptionEs: "Tu identidad musical es calida, expresiva y conectada al groove, la voz y una suavidad emocional."
  },
  {
    name: "gaming adrenaline pilot",
    nameEs: "piloto de adrenalina gaming",
    vector: [0.90, 0.24, 0.46, 0.78, 0.24, 0.30, 0.66, 0.62],
    traits: ["fast", "focused", "electric", "competitive", "kinetic"],
    traitsEs: ["rapido", "enfocado", "electrico", "competitivo", "cinetico"],
    description: "Your taste favors speed, charge, and tracks that feel built for flow states, matches, or high-focus motion.",
    descriptionEs: "Tu gusto favorece velocidad, carga y canciones hechas para estados de flow, partidas o movimiento concentrado."
  }
];

const translations = {
  en: {
    eyebrow: "Embedding-based listener archetype inference",
    title: "Who Are You Based on Your Music?",
    summary: "Add songs one by one and watch your latent music identity evolve.",
    status: "Live listener vector",
    addSongs: "Add Songs",
    songInput: "Song title or artist",
    placeholder: "Try After Dark, 505, Resonance...",
    addSong: "Add Song",
    quickAdd: "Quick add",
    tasteCalibration: "Taste calibration",
    currentSongs: "Current songs",
    primary: "Primary archetype",
    emptyPrimary: "Add a song to begin",
    emptyDescription: "Your profile will emerge from songs, with the taste calibration acting as a small extra signal.",
    secondary: "Secondary",
    waiting: "Waiting for signal",
    confidence: "Confidence",
    topMatches: "Top matches",
    traits: "Detected characteristics",
    identitySpace: "Identity Space",
    axisLeft: "organic / indie",
    axisRight: "digital / electronic",
    axisTop: "high intensity",
    axisBottom: "soft nostalgia",
    drift: "Music personality evolution",
    signal: "signal",
    signals: "signals",
    calibrationAdded: "Taste calibration",
    addedPreference: "added",
    preferenceSignal: "preference signal",
    preferenceSignals: "preference signals",
    movedProfile: "moved profile toward",
    featureLabels: ["Energy", "Melancholy", "Nostalgia", "Electronic", "Introspection", "Warmth", "Cinematic", "Rebellion"]
  },
  es: {
    eyebrow: "Inferencia de arquetipos musicales con embeddings",
    title: "Quien eres segun tu musica?",
    summary: "Anade canciones una por una y mira como evoluciona tu identidad musical latente.",
    status: "Vector de oyente en vivo",
    addSongs: "Anadir canciones",
    songInput: "Titulo o artista",
    placeholder: "Prueba After Dark, 505, Resonance...",
    addSong: "Anadir cancion",
    quickAdd: "Anadir rapido",
    tasteCalibration: "Calibracion de gusto",
    currentSongs: "Canciones actuales",
    primary: "Arquetipo principal",
    emptyPrimary: "Anade una cancion para empezar",
    emptyDescription: "Tu perfil nacera de las canciones, con la calibracion de gusto como una pequena senal extra.",
    secondary: "Secundario",
    waiting: "Esperando senal",
    confidence: "Confianza",
    topMatches: "Mejores coincidencias",
    traits: "Caracteristicas detectadas",
    identitySpace: "Espacio de identidad",
    axisLeft: "organico / indie",
    axisRight: "digital / electronico",
    axisTop: "alta intensidad",
    axisBottom: "nostalgia suave",
    drift: "Evolucion de personalidad musical",
    signal: "senal",
    signals: "senales",
    calibrationAdded: "Calibracion de gusto",
    addedPreference: "anadio",
    preferenceSignal: "senal de preferencia",
    preferenceSignals: "senales de preferencia",
    movedProfile: "movio el perfil hacia",
    featureLabels: ["Energia", "Melancolia", "Nostalgia", "Electronico", "Introspeccion", "Calidez", "Cinematico", "Rebeldia"]
  }
};

const calibrationQuestions = [
  {
    question: "What kind of song pulls you in fastest?",
    questionEs: "Que tipo de cancion te atrapa mas rapido?",
    options: [
      { label: "Glowing synths and night air", labelEs: "Sintetizadores brillantes y aire nocturno", vector: [0.52, 0.58, 0.90, 0.96, 0.54, 0.34, 0.78, 0.18] },
      { label: "A raw guitar line with sadness", labelEs: "Una guitarra cruda con tristeza", vector: [0.44, 0.78, 0.66, 0.16, 0.84, 0.56, 0.42, 0.30] },
      { label: "A huge dramatic build", labelEs: "Una subida dramatica enorme", vector: [0.70, 0.76, 0.54, 0.42, 0.74, 0.30, 0.94, 0.54] }
    ]
  },
  {
    question: "Which mood feels most like your taste?",
    questionEs: "Que mood se parece mas a tu gusto?",
    options: [
      { label: "Soft nostalgia", labelEs: "Nostalgia suave", vector: [0.28, 0.68, 0.92, 0.36, 0.78, 0.72, 0.58, 0.08] },
      { label: "Private late-night intensity", labelEs: "Intensidad privada de madrugada", vector: [0.54, 0.88, 0.70, 0.68, 0.86, 0.24, 0.74, 0.36] },
      { label: "Bright escape", labelEs: "Escape brillante", vector: [0.88, 0.30, 0.72, 0.84, 0.34, 0.58, 0.66, 0.22] }
    ]
  },
  {
    question: "What do you value more in music?",
    questionEs: "Que valoras mas en la musica?",
    options: [
      { label: "Atmosphere", labelEs: "Atmosfera", vector: [0.40, 0.70, 0.86, 0.78, 0.74, 0.42, 0.88, 0.12] },
      { label: "Lyrics that hit personally", labelEs: "Letras que pegan personalmente", vector: [0.38, 0.84, 0.58, 0.20, 0.96, 0.54, 0.48, 0.24] },
      { label: "Rhythm and motion", labelEs: "Ritmo y movimiento", vector: [0.90, 0.28, 0.48, 0.72, 0.28, 0.62, 0.40, 0.34] }
    ]
  },
  {
    question: "Your ideal listening setting is:",
    questionEs: "Tu contexto ideal para escuchar musica es:",
    options: [
      { label: "Walking alone after dark", labelEs: "Caminar solo despues de anochecer", vector: [0.50, 0.82, 0.78, 0.76, 0.82, 0.28, 0.78, 0.26] },
      { label: "Lying down and drifting", labelEs: "Tumbarte y dejarte llevar", vector: [0.22, 0.68, 0.86, 0.46, 0.84, 0.70, 0.76, 0.06] },
      { label: "Getting ready to go out", labelEs: "Prepararte para salir", vector: [0.86, 0.34, 0.62, 0.74, 0.30, 0.58, 0.52, 0.48] }
    ]
  },
  {
    question: "Which identity sounds closest?",
    questionEs: "Que identidad suena mas cercana?",
    options: [
      { label: "Dreamy and digital", labelEs: "Sonadora y digital", vector: [0.42, 0.56, 0.96, 0.98, 0.60, 0.36, 0.82, 0.14] },
      { label: "Tender and indie", labelEs: "Tierna e indie", vector: [0.36, 0.72, 0.74, 0.16, 0.82, 0.78, 0.36, 0.18] },
      { label: "Brooding and cinematic", labelEs: "Sombria y cinematica", vector: [0.62, 0.76, 0.50, 0.34, 0.76, 0.28, 0.88, 0.70] }
    ]
  }
];

const state = {
  selectedSongs: [],
  calibrationAnswers: Array(calibrationQuestions.length).fill(null),
  lang: "en",
  classifierPredictions: null,
  lastClassifierText: ""
};

let classifierRequestId = 0;

const elements = {
  input: document.querySelector("#songInput"),
  options: document.querySelector("#songOptions"),
  addButton: document.querySelector("#addButton"),
  resetButton: document.querySelector("#resetButton"),
  langButtons: document.querySelectorAll(".lang-button"),
  quickSongs: document.querySelector("#quickSongs"),
  quizQuestions: document.querySelector("#quizQuestions"),
  quizProgress: document.querySelector("#quizProgress"),
  selectedSongs: document.querySelector("#selectedSongs"),
  primary: document.querySelector("#primaryArchetype"),
  primaryDescription: document.querySelector("#primaryDescription"),
  secondary: document.querySelector("#secondaryArchetype"),
  confidence: document.querySelector("#confidenceValue"),
  topMatches: document.querySelector("#topMatches"),
  traits: document.querySelector("#traits"),
  energy: document.querySelector("#energyMeter"),
  melancholy: document.querySelector("#melancholyMeter"),
  nostalgia: document.querySelector("#nostalgiaMeter"),
  electronic: document.querySelector("#electronicMeter"),
  introspection: document.querySelector("#introspectionMeter"),
  warmth: document.querySelector("#warmthMeter"),
  cinematic: document.querySelector("#cinematicMeter"),
  rebellion: document.querySelector("#rebellionMeter"),
  point: document.querySelector("#profilePoint"),
  songCount: document.querySelector("#songCount"),
  driftLog: document.querySelector("#driftLog")
};

function t(key) {
  return translations[state.lang][key];
}

function archetypeName(archetype) {
  return state.lang === "es" ? archetype.nameEs : archetype.name;
}

function archetypeDescription(archetype) {
  return state.lang === "es" ? archetype.descriptionEs : archetype.description;
}

function archetypeTraits(archetype) {
  return state.lang === "es" ? archetype.traitsEs : archetype.traits;
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((total, value, index) => total + value * b[index], 0);
  const magA = Math.sqrt(a.reduce((total, value) => total + value ** 2, 0));
  const magB = Math.sqrt(b.reduce((total, value) => total + value ** 2, 0));
  return dot / (magA * magB);
}

function averageVectors(items) {
  const totals = Array(featureKeys.length).fill(0);

  items.forEach((song, songIndex) => {
    const recencyWeight = 1 + songIndex * 0.08;
    song.vector.forEach((value, index) => {
      totals[index] += value * recencyWeight;
    });
  });

  const totalWeight = items.reduce((total, _song, index) => total + 1 + index * 0.08, 0);
  return totals.map((value) => value / totalWeight);
}

function averageRawVectors(vectors) {
  const totals = Array(featureKeys.length).fill(0);
  vectors.forEach((vector) => {
    vector.forEach((value, index) => {
      totals[index] += value;
    });
  });
  return totals.map((value) => value / vectors.length);
}

function blendVectors(songVector, calibrationVector) {
  if (songVector && calibrationVector) {
    return songVector.map((value, index) => value * 0.72 + calibrationVector[index] * 0.28);
  }

  return songVector || calibrationVector;
}

function getCalibrationVector() {
  const answeredVectors = state.calibrationAnswers.filter(Boolean);
  if (answeredVectors.length === 0) return null;
  return averageRawVectors(answeredVectors);
}

function getListenerVector() {
  const songVector = state.selectedSongs.length > 0 ? averageVectors(state.selectedSongs) : null;
  return blendVectors(songVector, getCalibrationVector());
}

function scoreArchetypes(vector) {
  return archetypes
    .map((archetype) => ({
      ...archetype,
      score: cosineSimilarity(vector, archetype.vector)
    }))
    .sort((a, b) => b.score - a.score);
}

function buildClassifierText() {
  const songText = state.selectedSongs
    .map((song) => {
      return [
        song.title,
        song.artist,
        song.genre,
        song.subgenre,
        song.playlist,
        song.archetype
      ]
        .filter(Boolean)
        .join(" | ");
    })
    .join(" ;; ");

  const answeredCount = state.calibrationAnswers.filter(Boolean).length;
  return [songText, answeredCount ? `${answeredCount} taste calibration signals` : ""]
    .filter(Boolean)
    .join(" ;; ");
}

function formatScore(value) {
  return `${Math.max(0, Math.min(100, Math.round(value * 100)))}%`;
}

function renderMatchRows(rows) {
  elements.topMatches.innerHTML = rows
    .filter(Boolean)
    .slice(0, 4)
    .map((match) => {
      const width = Math.max(4, Math.round(match.score * 100));
      return `
        <div class="match-row">
          <span>${match.label}</span>
          <strong>${formatScore(match.score)}</strong>
          <i style="width: ${width}%"></i>
        </div>
      `;
    })
    .join("");
}

function renderClassifierPredictions() {
  if (!state.classifierPredictions || state.classifierPredictions.length === 0) return;

  const rows = state.classifierPredictions.map((prediction) => {
    const archetype = archetypes.find((item) => item.name === prediction.label);
    return {
      label: archetype ? archetypeName(archetype) : prediction.label,
      score: prediction.probability
    };
  });
  renderMatchRows(rows);
}

async function requestClassifierPrediction() {
  if (window.location.protocol === "file:") return;
  const text = buildClassifierText();
  if (!text || text === state.lastClassifierText) return;

  state.lastClassifierText = text;
  const requestId = ++classifierRequestId;

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, top_k: 4 })
    });

    if (!response.ok) return;
    const payload = await response.json();
    if (requestId !== classifierRequestId) return;
    state.classifierPredictions = payload.predictions || [];
    renderClassifierPredictions();
  } catch (_error) {
    state.classifierPredictions = null;
  }
}

function mapPosition(vector) {
  const x = 12 + ((vector[3] + vector[2]) / 2) * 76;
  const y = 88 - ((vector[0] + vector[6]) / 2) * 76;
  return { x, y };
}

function findSong(query) {
  const normalized = query.trim().toLowerCase();
  const exactMatch = songs.find((song) => {
    const title = song.title.toLowerCase();
    const artist = song.artist.toLowerCase();
    const full = `${title} ${artist}`;
    const dashed = `${title} - ${artist}`;
    return title === normalized || full === normalized || dashed === normalized || artist === normalized;
  });
  if (exactMatch) return exactMatch;

  return songs.find((song) => {
    const title = song.title.toLowerCase();
    const artist = song.artist.toLowerCase();
    return title.includes(normalized) || artist.includes(normalized);
  });
}

function addSong(song) {
  if (!song) return;
  state.selectedSongs.push(song);
  state.classifierPredictions = null;
  elements.input.value = "";
  render();
}

function renderOptions() {
  elements.addButton.textContent = t("addSong");
  document.querySelector("#eyebrowText").textContent = t("eyebrow");
  document.querySelector("#titleText").textContent = t("title");
  document.querySelector("#summaryText").textContent = t("summary");
  document.querySelector("#statusText").textContent = t("status");
  document.querySelector("#addSongsTitle").textContent = t("addSongs");
  document.querySelector("#songInputLabel").textContent = t("songInput");
  elements.input.placeholder = t("placeholder");
  document.querySelector("#quickAddLabel").textContent = t("quickAdd");
  document.querySelector("#tasteCalibrationTitle").textContent = t("tasteCalibration");
  document.querySelector("#currentSongsTitle").textContent = t("currentSongs");
  document.querySelector("#primaryLabel").textContent = t("primary");
  document.querySelector("#secondaryLabel").textContent = t("secondary");
  document.querySelector("#confidenceLabel").textContent = t("confidence");
  document.querySelector("#topMatchesLabel").textContent = t("topMatches");
  document.querySelector("#traitsLabel").textContent = t("traits");
  document.querySelector("#identitySpaceTitle").textContent = t("identitySpace");
  document.querySelector("#axisLeft").textContent = t("axisLeft");
  document.querySelector("#axisRight").textContent = t("axisRight");
  document.querySelector("#axisTop").textContent = t("axisTop");
  document.querySelector("#axisBottom").textContent = t("axisBottom");
  document.querySelector("#driftLogTitle").textContent = t("drift");

  [
    "#energyLabel",
    "#melancholyLabel",
    "#nostalgiaLabel",
    "#electronicLabel",
    "#introspectionLabel",
    "#warmthLabel",
    "#cinematicLabel",
    "#rebellionLabel"
  ].forEach((selector, index) => {
    document.querySelector(selector).textContent = t("featureLabels")[index];
  });

  elements.langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });

  elements.options.innerHTML = songs
    .slice(0, 2500)
    .map((song) => `<option value="${song.title} - ${song.artist}"></option>`)
    .join("");

  elements.quickSongs.innerHTML = songs
    .slice(0, 8)
    .map(
      (song) => `
        <button class="quick-song" type="button" data-title="${song.title}">
          <strong>${song.title}</strong>
          <span>${song.artist}</span>
        </button>
      `
    )
    .join("");
}

function renderQuiz() {
  const answeredCount = state.calibrationAnswers.filter(Boolean).length;
  elements.quizProgress.textContent = `${answeredCount}/${calibrationQuestions.length}`;
  elements.quizQuestions.innerHTML = calibrationQuestions
    .map((item, questionIndex) => {
      const options = item.options
        .map((option, optionIndex) => {
          const isSelected = state.calibrationAnswers[questionIndex] === option.vector;
          const label = state.lang === "es" ? option.labelEs : option.label;
          return `
            <button class="quiz-option${isSelected ? " selected" : ""}" type="button" data-question="${questionIndex}" data-option="${optionIndex}">
              ${label}
            </button>
          `;
        })
        .join("");
      const question = state.lang === "es" ? item.questionEs : item.question;

      return `
        <article class="quiz-question">
          <p>${question}</p>
          <div class="quiz-options">${options}</div>
        </article>
      `;
    })
    .join("");
}

function renderEmpty() {
  renderOptions();
  elements.primary.textContent = t("emptyPrimary");
  elements.primaryDescription.textContent = t("emptyDescription");
  elements.secondary.textContent = t("waiting");
  elements.confidence.textContent = "0%";
  elements.topMatches.innerHTML = "";
  elements.traits.innerHTML = "";
  elements.selectedSongs.innerHTML = "";
  elements.driftLog.innerHTML = "";
  elements.songCount.textContent = `0 ${t("signals")}`;
  [
    elements.energy,
    elements.melancholy,
    elements.nostalgia,
    elements.electronic,
    elements.introspection,
    elements.warmth,
    elements.cinematic,
    elements.rebellion
  ].forEach((meter) => {
    meter.value = 0;
  });
  elements.point.style.left = "50%";
  elements.point.style.top = "50%";
}

function render() {
  renderOptions();
  renderQuiz();

  const listenerVector = getListenerVector();

  if (!listenerVector) {
    renderEmpty();
    return;
  }

  const ranked = scoreArchetypes(listenerVector);
  const [primary, secondary] = ranked;
  const confidence = Math.max(0, Math.min(100, Math.round(primary.score * 100)));

  elements.primary.textContent = archetypeName(primary);
  elements.primaryDescription.textContent = archetypeDescription(primary);
  elements.secondary.textContent = archetypeName(secondary);
  elements.confidence.textContent = `${confidence}%`;
  renderMatchRows(ranked.map((match) => ({ label: archetypeName(match), score: match.score })));
  elements.traits.innerHTML = archetypeTraits(primary).map((trait) => `<span class="trait">${trait}</span>`).join("");

  elements.energy.value = listenerVector[0];
  elements.melancholy.value = listenerVector[1];
  elements.nostalgia.value = listenerVector[2];
  elements.electronic.value = listenerVector[3];
  elements.introspection.value = listenerVector[4];
  elements.warmth.value = listenerVector[5];
  elements.cinematic.value = listenerVector[6];
  elements.rebellion.value = listenerVector[7];

  const { x, y } = mapPosition(listenerVector);
  elements.point.style.left = `${x}%`;
  elements.point.style.top = `${y}%`;

  const answeredCount = state.calibrationAnswers.filter(Boolean).length;
  const signalCount = state.selectedSongs.length + answeredCount;
  elements.songCount.textContent = `${signalCount} ${signalCount === 1 ? t("signal") : t("signals")}`;
  elements.selectedSongs.innerHTML = state.selectedSongs
    .map((song) => `<li><strong>${song.title}</strong>${song.artist}</li>`)
    .join("");

  const songDrift = state.selectedSongs.map((song, index) => {
    const partialVector = blendVectors(averageVectors(state.selectedSongs.slice(0, index + 1)), getCalibrationVector());
    const partialPrimary = scoreArchetypes(partialVector)[0];
    return `<li><strong>${song.title}</strong> ${t("movedProfile")} ${archetypeName(partialPrimary)}</li>`;
  });

  const calibrationDrift =
    answeredCount > 0
      ? [`<li><strong>${t("calibrationAdded")}</strong> ${t("addedPreference")} ${answeredCount} ${answeredCount === 1 ? t("preferenceSignal") : t("preferenceSignals")}</li>`]
      : [];

  elements.driftLog.innerHTML = [...calibrationDrift, ...songDrift].reverse().join("");
  requestClassifierPrediction();
}

elements.addButton.addEventListener("click", () => {
  const raw = elements.input.value.replace(/\s+-\s+.+$/, "");
  addSong(findSong(raw));
});

elements.input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const raw = elements.input.value.replace(/\s+-\s+.+$/, "");
    addSong(findSong(raw));
  }
});

elements.quickSongs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-title]");
  if (button) addSong(findSong(button.dataset.title));
});

elements.quizQuestions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-question]");
  if (!button) return;

  const questionIndex = Number(button.dataset.question);
  const optionIndex = Number(button.dataset.option);
  state.calibrationAnswers[questionIndex] = calibrationQuestions[questionIndex].options[optionIndex].vector;
  state.classifierPredictions = null;
  render();
});

elements.langButtons.forEach((button) => {
  button.addEventListener("click", () => {
  state.lang = button.dataset.lang;
  document.documentElement.lang = state.lang;
  render();
  });
});

elements.resetButton.addEventListener("click", () => {
  state.selectedSongs = [];
  state.calibrationAnswers = Array(calibrationQuestions.length).fill(null);
  state.classifierPredictions = null;
  state.lastClassifierText = "";
  render();
});

renderOptions();
render();
