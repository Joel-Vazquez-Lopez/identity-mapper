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
  },
  {
    name: "euphoric transformation seeker",
    nameEs: "buscador de transformacion euforica",
    vector: [0.88, 0.24, 0.46, 0.78, 0.26, 0.66, 0.62, 0.28],
    traits: ["uplifting", "high-energy", "motivational", "festival-ready", "expansive"],
    traitsEs: ["euforico", "energetico", "motivador", "de festival", "expansivo"],
    description: "Your profile leans toward tracks that feel like momentum, release, and becoming a louder version of yourself.",
    descriptionEs: "Tu perfil apunta a canciones que se sienten como impulso, liberacion y convertirte en una version mas fuerte de ti."
  },
  {
    name: "mainstream pop shapeshifter",
    nameEs: "camaleon de pop mainstream",
    vector: [0.78, 0.30, 0.48, 0.60, 0.34, 0.62, 0.54, 0.30],
    traits: ["chart-aware", "adaptable", "bright", "hook-driven", "social"],
    traitsEs: ["de charts", "adaptable", "brillante", "de hooks", "social"],
    description: "Your taste moves easily through polished hooks, current pop moods, and songs built to live in shared cultural moments.",
    descriptionEs: "Tu gusto se mueve facil entre hooks pulidos, moods actuales de pop y canciones hechas para momentos culturales compartidos."
  },
  {
    name: "dancefloor serotonin seeker",
    nameEs: "buscador de serotonina en la pista",
    vector: [0.92, 0.22, 0.46, 0.78, 0.22, 0.68, 0.58, 0.24],
    traits: ["danceable", "bright", "physical", "joy-seeking", "social"],
    traitsEs: ["bailable", "brillante", "fisico", "alegre", "social"],
    description: "You gravitate toward songs that turn emotion into movement and make the room feel lighter.",
    descriptionEs: "Te atraen canciones que convierten la emocion en movimiento y hacen que la habitacion se sienta mas ligera."
  },
  {
    name: "techno bunker futurist",
    nameEs: "futurista de bunker techno",
    vector: [0.90, 0.34, 0.34, 0.96, 0.30, 0.24, 0.70, 0.56],
    traits: ["rave-minded", "mechanical", "futuristic", "driving", "electric"],
    traitsEs: ["de rave", "mecanico", "futurista", "impulsivo", "electrico"],
    description: "Your listener identity is built from pulse, repetition, dark rooms, and machine-bright forward motion.",
    descriptionEs: "Tu identidad musical se construye con pulso, repeticion, cuartos oscuros y movimiento futurista."
  },
  {
    name: "dark academia romantic",
    nameEs: "romantico dark academia",
    vector: [0.32, 0.70, 0.76, 0.18, 0.88, 0.64, 0.82, 0.12],
    traits: ["literary", "classical", "reflective", "melancholic", "ornate"],
    traitsEs: ["literario", "clasico", "reflexivo", "melancolico", "ornamental"],
    description: "You seem drawn to music that feels studied, intimate, dramatic, and a little candlelit.",
    descriptionEs: "Pareces atraido por musica estudiada, intima, dramatica y un poco a luz de vela."
  },
  {
    name: "country sunset storyteller",
    nameEs: "narrador country de atardecer",
    vector: [0.46, 0.48, 0.66, 0.08, 0.66, 0.76, 0.42, 0.20],
    traits: ["story-driven", "earthy", "warm", "nostalgic", "plainspoken"],
    traitsEs: ["narrativo", "terrenal", "calido", "nostalgico", "directo"],
    description: "Your taste values songs that tell stories plainly, warmly, and with a horizon line in them.",
    descriptionEs: "Tu gusto valora canciones que cuentan historias de forma directa, calida y con horizonte."
  },
  {
    name: "sad pop confessional",
    nameEs: "confesional de pop triste",
    vector: [0.46, 0.82, 0.64, 0.38, 0.86, 0.54, 0.58, 0.18],
    traits: ["confessional", "heartbreak", "lyrical", "vulnerable", "polished"],
    traitsEs: ["confesional", "de desamor", "lirico", "vulnerable", "pulido"],
    description: "You lean toward clean pop surfaces carrying very personal emotional weather underneath.",
    descriptionEs: "Te inclinas por superficies pop limpias que llevan un clima emocional muy personal debajo."
  }
];

const translations = {
  en: {
    eyebrow: "Preference-based identity inference",
    title: "Identity Mapper",
    summary: "A recommender-style identity checker for music, football, creators, and Stardew Valley characters.",
    status: "Live identity vector",
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
    savedIdentity: "Saved Identity",
    passportEmptyTitle: "Start mapping yourself",
    passportActiveTitle: "Your identity map is taking shape",
    passportEmpty: "Results save here as you use each module.",
    musicModule: ["Music", "Listener archetype", "Embedding classifier"],
    footballModule: ["Football", "Team identity", "Vector matching"],
    gamesModule: ["Stardew Valley", "Character match", "Coming soon"],
    creatorsModule: ["YouTubers", "Creator cluster", "Coming soon"],
    recommendations: "Song recommendations",
    recommendationsEmpty: "Add songs to get similar tracks from the catalog.",
    recommendationsReady: "Similar songs based on your current listener vector.",
    addRecommended: "Add",
    footballEyebrow: "Football identity mapper",
    footballPanelTitle: "Find Your Football Team",
    footballQuestionsTitle: "Answer the team-style signals",
    footballModuleNote: "This module keeps your original structure: football taste, life style, and player identity. It matches personality vectors to team identities, so it asks questions instead of collecting songs.",
    footballModelLabel: "Team pool",
    footballCategories: {
      all: "All teams",
      laliga: "LaLiga",
      premier: "Premier League",
      bundesliga: "Bundesliga",
      national: "National teams",
      inazuma: "Inazuma Eleven"
    },
    footballResultLabel: "Your team is",
    footballEmptyTeam: "Answer a few signals",
    footballEmptyDescription: "Your football profile will be matched against club and national-team identity vectors.",
    footballFieldLabels: ["Flair", "Control", "Structure", "Emotion"],
    footballFeatureLabels: ["Creativity", "Structure", "Emotion", "Physicality", "Loyalty", "Winning", "Flair", "Discipline"],
    featureLabels: ["Energy", "Melancholy", "Nostalgia", "Electronic", "Introspection", "Warmth", "Cinematic", "Rebellion"]
  },
  es: {
    eyebrow: "Inferencia de identidad basada en preferencias",
    title: "Identity Mapper",
    summary: "Un recomendador de identidad para musica, futbol, creadores y personajes de Stardew Valley.",
    status: "Vector de identidad en vivo",
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
    savedIdentity: "Identidad guardada",
    passportEmptyTitle: "Empieza a mapearte",
    passportActiveTitle: "Tu mapa de identidad esta tomando forma",
    passportEmpty: "Los resultados se guardan aqui mientras usas cada modulo.",
    musicModule: ["Musica", "Arquetipo de oyente", "Clasificador con embeddings"],
    footballModule: ["Futbol", "Identidad de equipo", "Matching de vectores"],
    gamesModule: ["Stardew Valley", "Match de personaje", "Proximamente"],
    creatorsModule: ["YouTubers", "Cluster de creadores", "Proximamente"],
    recommendations: "Recomendaciones de canciones",
    recommendationsEmpty: "Anade canciones para recibir canciones similares del catalogo.",
    recommendationsReady: "Canciones similares segun tu vector de oyente actual.",
    addRecommended: "Anadir",
    footballEyebrow: "Mapeador de identidad futbolistica",
    footballPanelTitle: "Encuentra tu equipo de futbol",
    footballQuestionsTitle: "Responde las senales de estilo",
    footballModuleNote: "Este modulo mantiene tu estructura original: gusto futbolistico, estilo de vida e identidad como jugador. Hace matching entre vectores de personalidad e identidades de equipos, por eso usa preguntas en vez de canciones.",
    footballModelLabel: "Modelo de equipos",
    footballCategories: {
      all: "Todos los equipos",
      laliga: "LaLiga",
      premier: "Premier League",
      bundesliga: "Bundesliga",
      national: "Selecciones",
      inazuma: "Inazuma Eleven"
    },
    footballResultLabel: "Tu equipo es",
    footballEmptyTeam: "Responde algunas senales",
    footballEmptyDescription: "Tu perfil futbolistico se comparara con vectores de identidad de clubes y selecciones.",
    footballFieldLabels: ["Estilo", "Control", "Estructura", "Emocion"],
    footballFeatureLabels: ["Creatividad", "Estructura", "Emocion", "Fisico", "Lealtad", "Victoria", "Estilo", "Disciplina"],
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
  lastClassifierText: "",
  activeModule: "music",
  footballAnswers: [],
  footballCategory: "all"
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
  driftLog: document.querySelector("#driftLog"),
  moduleButtons: document.querySelectorAll(".module-card"),
  moduleViews: document.querySelectorAll(".module-view"),
  symbolStream: document.querySelector("#symbolStream"),
  passportTitle: document.querySelector("#passportTitle"),
  passportChips: document.querySelector("#passportChips"),
  savedIdentityLabel: document.querySelector("#savedIdentityLabel"),
  moduleMusicLabel: document.querySelector("#moduleMusicLabel"),
  moduleMusicTitle: document.querySelector("#moduleMusicTitle"),
  moduleMusicMeta: document.querySelector("#moduleMusicMeta"),
  moduleFootballLabel: document.querySelector("#moduleFootballLabel"),
  moduleFootballTitle: document.querySelector("#moduleFootballTitle"),
  moduleFootballMeta: document.querySelector("#moduleFootballMeta"),
  moduleGamesLabel: document.querySelector("#moduleGamesLabel"),
  moduleGamesTitle: document.querySelector("#moduleGamesTitle"),
  moduleGamesMeta: document.querySelector("#moduleGamesMeta"),
  moduleCreatorsLabel: document.querySelector("#moduleCreatorsLabel"),
  moduleCreatorsTitle: document.querySelector("#moduleCreatorsTitle"),
  moduleCreatorsMeta: document.querySelector("#moduleCreatorsMeta"),
  recommendationsTitle: document.querySelector("#recommendationsTitle"),
  recommendationsCount: document.querySelector("#recommendationsCount"),
  recommendationsNote: document.querySelector("#recommendationsNote"),
  songRecommendations: document.querySelector("#songRecommendations"),
  footballEyebrow: document.querySelector("#footballEyebrow"),
  footballPanelTitle: document.querySelector("#footballPanelTitle"),
  footballQuestionsTitle: document.querySelector("#footballQuestionsTitle"),
  footballModuleNote: document.querySelector("#footballModuleNote"),
  footballResultLabel: document.querySelector("#footballResultLabel"),
  footballMatchesLabel: document.querySelector("#footballMatchesLabel"),
  footballQuestions: document.querySelector("#footballQuestions"),
  footballProgress: document.querySelector("#footballProgress"),
  footballTeam: document.querySelector("#footballTeam"),
  footballDescription: document.querySelector("#footballDescription"),
  footballMatches: document.querySelector("#footballMatches"),
  footballReset: document.querySelector("#footballReset"),
  footballCategorySelect: document.querySelector("#footballCategorySelect"),
  footballModelLabel: document.querySelector("#footballModelLabel"),
  footballBadgeFrame: document.querySelector("#footballBadgeFrame"),
  footballBadge: document.querySelector("#footballBadge"),
  footballProfilePoint: document.querySelector("#footballProfilePoint"),
  footballFieldLabels: [
    document.querySelector("#footballFieldLeft"),
    document.querySelector("#footballFieldRight"),
    document.querySelector("#footballFieldTop"),
    document.querySelector("#footballFieldBottom")
  ],
  footballFeatureLabels: [
    document.querySelector("#footballCreativityLabel"),
    document.querySelector("#footballStructureLabel"),
    document.querySelector("#footballEmotionLabel"),
    document.querySelector("#footballPhysicalityLabel"),
    document.querySelector("#footballLoyaltyLabel"),
    document.querySelector("#footballWinningLabel"),
    document.querySelector("#footballFlairLabel"),
    document.querySelector("#footballDisciplineLabel")
  ],
  footballMeters: [
    document.querySelector("#footballCreativity"),
    document.querySelector("#footballStructure"),
    document.querySelector("#footballEmotion"),
    document.querySelector("#footballPhysicality"),
    document.querySelector("#footballLoyalty"),
    document.querySelector("#footballWinning"),
    document.querySelector("#footballFlair"),
    document.querySelector("#footballDiscipline")
  ]
};

const identityStore = {
  music: null,
  football: null
};

const moduleCopy = {
  music: {
    en: {
      eyebrow: "Embedding-based listener archetype inference",
      title: "Who Are You Based on Your Music?",
      summary: "Add songs one by one and watch your latent music identity evolve.",
      status: "Live listener vector"
    },
    es: {
      eyebrow: "Inferencia de arquetipos musicales con embeddings",
      title: "Quien eres segun tu musica?",
      summary: "Anade canciones una por una y mira como evoluciona tu identidad musical latente.",
      status: "Vector de oyente en vivo"
    }
  },
  football: {
    en: {
      eyebrow: "Team identity vector matching",
      title: "Find Your Football Team",
      summary: "Answer your football, life, and player-style questions to discover which team identity fits you.",
      status: "Live football profile"
    },
    es: {
      eyebrow: "Matching de vectores de identidad de equipo",
      title: "Encuentra tu equipo de futbol",
      summary: "Responde preguntas de futbol, vida y estilo de jugador para descubrir que identidad de equipo encaja contigo.",
      status: "Perfil futbolistico en vivo"
    }
  },
  games: {
    en: {
      eyebrow: "Future game-character recommender",
      title: "Stardew Valley Character Match",
      summary: "This space will map routine, friendship, ambition, calm, nature, and play style into a character identity.",
      status: "Coming soon"
    },
    es: {
      eyebrow: "Futuro recomendador de personajes",
      title: "Match de personaje de Stardew Valley",
      summary: "Este espacio mapeara rutina, amistad, ambicion, calma, naturaleza y estilo de juego hacia una identidad de personaje.",
      status: "Proximamente"
    }
  },
  creators: {
    en: {
      eyebrow: "Future creator-taste module",
      title: "YouTube Creator Cluster",
      summary: "This space will map creator taste through topics, pacing, humor, trust, and community style.",
      status: "Coming soon"
    },
    es: {
      eyebrow: "Futuro modulo de gusto por creadores",
      title: "Cluster de creadores de YouTube",
      summary: "Este espacio mapeara tu gusto por temas, ritmo, humor, confianza y estilo de comunidad.",
      status: "Proximamente"
    }
  }
};

const moduleSymbols = {
  music: ["♪", "♩", "♫", "♬", "♭", "♯"],
  football: ["⚽"],
  games: ["◆", "▲", "■", "✦", "◇", "＋"],
  creators: ["▶", "▢", "◉", "#", "@", "✦"]
};

const footballTeams = [
  { name: "Barcelona", vector: [0.95, 0.65, 0.70, 0.40, 0.60, 0.90, 0.85, 0.60], description: "creative, expressive, technical, and built around beautiful attacking football." },
  { name: "Real Madrid", vector: [0.75, 0.80, 0.60, 0.60, 0.50, 0.95, 0.75, 0.70], description: "ambitious, elegant, decisive, and comfortable with pressure." },
  { name: "Atletico Madrid", vector: [0.35, 0.90, 0.75, 0.95, 0.70, 0.80, 0.40, 0.95], description: "disciplined, intense, stubborn, and emotionally tough." },
  { name: "Athletic Bilbao", vector: [0.60, 0.80, 0.80, 0.70, 0.95, 0.65, 0.55, 0.85], description: "loyal, identity-driven, physical, and deeply connected to tradition." },
  { name: "Rayo Vallecano", vector: [0.75, 0.50, 0.85, 0.65, 0.85, 0.45, 0.80, 0.45], description: "emotional, brave, restless, and drawn to underdog energy." },
  { name: "Manchester City", vector: [0.90, 0.90, 0.50, 0.60, 0.50, 0.95, 0.70, 0.95], description: "systematic, controlled, dominant, and obsessed with precision." },
  { name: "Arsenal", vector: [0.85, 0.70, 0.70, 0.55, 0.70, 0.80, 0.80, 0.60], description: "creative, modern, expressive, and idealistic." },
  { name: "Liverpool", vector: [0.80, 0.75, 0.95, 0.85, 0.90, 0.85, 0.85, 0.70], description: "emotional, intense, loyal, and powered by momentum." },
  { name: "Tottenham", vector: [0.80, 0.55, 0.85, 0.60, 0.75, 0.75, 0.85, 0.50], description: "attacking, expressive, dramatic, and allergic to boring football." },
  { name: "Brighton", vector: [0.90, 0.65, 0.70, 0.50, 0.70, 0.65, 0.90, 0.60], description: "clever, experimental, creative, and comfortable taking risks." },
  { name: "Bayern Munich", vector: [0.85, 0.90, 0.60, 0.70, 0.60, 0.98, 0.75, 0.95], description: "dominant, efficient, structured, and built to win." },
  { name: "Borussia Dortmund", vector: [0.90, 0.65, 0.95, 0.80, 0.95, 0.85, 0.95, 0.60], description: "explosive, emotional, fan-driven, and beautifully unstable." },
  { name: "Union Berlin", vector: [0.50, 0.85, 0.90, 0.80, 0.98, 0.60, 0.50, 0.90], description: "communal, disciplined, gritty, and proud of being different." },
  { name: "Brazil", vector: [0.98, 0.75, 0.90, 0.80, 0.85, 0.98, 0.95, 0.75], description: "flair-heavy, joyful, expressive, and technically fearless." },
  { name: "Argentina", vector: [0.90, 0.80, 0.98, 0.85, 0.95, 0.98, 0.90, 0.80], description: "passionate, proud, dramatic, and emotionally all-in." },
  { name: "Spain", vector: [0.85, 0.98, 0.75, 0.60, 0.85, 0.95, 0.70, 0.98], description: "controlled, technical, intelligent, and patient." },
  { name: "Japan", vector: [0.85, 0.95, 0.75, 0.70, 0.90, 0.85, 0.80, 0.95], description: "organized, disciplined, fast, and tactically sharp." },
  { name: "Raimon", vector: [0.85, 0.75, 0.95, 0.70, 0.98, 0.80, 0.85, 0.70], description: "friendship-driven, resilient, emotional, and growth-oriented." }
];

footballTeams.push(
  { name: "Royal Academy", vector: [0.60, 0.95, 0.70, 0.85, 0.80, 0.90, 0.60, 0.95], description: "elite, disciplined, intense, and built around control." },
  { name: "Zeus", vector: [0.95, 0.80, 0.60, 0.70, 0.50, 0.98, 0.90, 0.85], description: "mythic, dominant, theatrical, and completely convinced of its own power." },
  { name: "Inazuma Japan", vector: [0.85, 0.80, 0.98, 0.80, 0.98, 0.95, 0.85, 0.80], description: "emotional, loyal, brave, and strongest when the group believes together." },
  { name: "Little Gigant", vector: [0.75, 0.98, 0.70, 0.75, 0.80, 0.98, 0.70, 0.98], description: "calm, balanced, technically complete, and quietly impossible to break." },
  { name: "Orpheus", vector: [0.95, 0.80, 0.80, 0.70, 0.85, 0.85, 0.90, 0.80], description: "elegant, creative, musical, and driven by expressive combinations." }
);

const footballCategoryOrder = ["all", "laliga", "premier", "bundesliga", "national", "inazuma"];

const footballTeamCategories = {
  Barcelona: "laliga",
  "Real Madrid": "laliga",
  "Atletico Madrid": "laliga",
  "Athletic Bilbao": "laliga",
  "Rayo Vallecano": "laliga",
  "Manchester City": "premier",
  Arsenal: "premier",
  Liverpool: "premier",
  Tottenham: "premier",
  Brighton: "premier",
  "Bayern Munich": "bundesliga",
  "Borussia Dortmund": "bundesliga",
  "Union Berlin": "bundesliga",
  Brazil: "national",
  Argentina: "national",
  Spain: "national",
  Japan: "national",
  Raimon: "inazuma",
  "Royal Academy": "inazuma",
  Zeus: "inazuma",
  "Inazuma Japan": "inazuma",
  "Little Gigant": "inazuma",
  Orpheus: "inazuma"
};

footballTeams.forEach((team) => {
  team.category = footballTeamCategories[team.name] || "all";
});

const footballQuestions = [
  {
    "group": "Football taste",
    "question": "What kind of football do you enjoy watching the most?",
    "options": [
      {
        "text": "Fast, attacking football with lots of chances",
        "vector": [
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          -0.5
        ]
      },
      {
        "text": "Controlled, tactical football",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "Emotional games full of intensity",
        "vector": [
          0,
          0,
          1,
          0.5,
          1,
          0,
          0,
          0
        ]
      },
      {
        "text": "Physical, hard-fought matches",
        "vector": [
          0,
          0.5,
          0,
          1,
          0,
          0,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "Which moment feels the best?",
    "options": [
      {
        "text": "A beautiful team goal",
        "vector": [
          1,
          0,
          0.3,
          0,
          0,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "A perfectly executed game plan",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "A last-minute winner",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          0.5,
          0.5,
          0.5,
          0
        ]
      },
      {
        "text": "A crucial defensive block",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.3,
          0,
          0,
          1
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "What type of player do you admire most?",
    "options": [
      {
        "text": "Creative playmaker",
        "vector": [
          1,
          0,
          0.5,
          0,
          0,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "Intelligent strategist",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.3,
          0,
          1
        ]
      },
      {
        "text": "Passionate leader",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          1,
          0.3,
          0.3,
          0
        ]
      },
      {
        "text": "Strong warrior",
        "vector": [
          0,
          0.3,
          0,
          1,
          0.5,
          0,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "Your ideal team plays...",
    "options": [
      {
        "text": "Expressive and attacking football",
        "vector": [
          1,
          0,
          0.5,
          0,
          0,
          0.3,
          1,
          -0.5
        ]
      },
      {
        "text": "Structured and disciplined football",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "With emotion and energy",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          1,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "With strength and resilience",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.5,
          0,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "How should a team react after conceding a goal?",
    "options": [
      {
        "text": "Attack even more",
        "vector": [
          0.8,
          0,
          0.3,
          0.3,
          0,
          0,
          1,
          -0.5
        ]
      },
      {
        "text": "Stick to the plan",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.3,
          0,
          1
        ]
      },
      {
        "text": "Use the energy from the crowd",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          1,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "Become tougher and harder to break",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.5,
          0,
          0,
          0.8
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "What kind of match would you choose to watch?",
    "options": [
      {
        "text": "End-to-end attacking game",
        "vector": [
          1,
          0,
          0.3,
          0.2,
          0,
          0.2,
          1,
          -0.5
        ]
      },
      {
        "text": "Chess-like tactical battle",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Derby full of passion",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          1,
          0.2,
          0.4,
          0
        ]
      },
      {
        "text": "Rough, physical contest",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.3,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "What matters most in football?",
    "options": [
      {
        "text": "Style of play",
        "vector": [
          1,
          0,
          0.3,
          0,
          0,
          0.3,
          0.6,
          0
        ]
      },
      {
        "text": "Winning consistently",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          1,
          0,
          1
        ]
      },
      {
        "text": "Fans and identity",
        "vector": [
          0.2,
          0,
          1,
          0.3,
          1,
          0.3,
          0.2,
          0
        ]
      },
      {
        "text": "Effort and toughness",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.4,
          0,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "Which manager style do you prefer?",
    "options": [
      {
        "text": "Gives freedom and creativity",
        "vector": [
          1,
          0,
          0.5,
          0.2,
          0,
          0.3,
          0.8,
          -0.5
        ]
      },
      {
        "text": "Highly organized and strategic",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "Motivational and emotional",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.4,
          0
        ]
      },
      {
        "text": "Demanding and strict",
        "vector": [
          0,
          0.6,
          0,
          1,
          0.3,
          0,
          0,
          0.7
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "What makes a team dangerous?",
    "options": [
      {
        "text": "Unpredictable creativity",
        "vector": [
          1,
          0,
          0.3,
          0.2,
          0,
          0.4,
          1,
          -0.3
        ]
      },
      {
        "text": "Tactical discipline",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Momentum and passion",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          1,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "Physical dominance",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.3,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "In a big match, your team should:",
    "options": [
      {
        "text": "Play their own attacking game",
        "vector": [
          1,
          0,
          0.3,
          0.2,
          0,
          0.3,
          0.9,
          -0.4
        ]
      },
      {
        "text": "Control and manage the game",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "Feed off the atmosphere",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.4,
          0
        ]
      },
      {
        "text": "Fight for every ball",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.4,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "What kind of club story do you like most?",
    "options": [
      {
        "text": "A team with a strong philosophy",
        "vector": [
          1,
          0.3,
          0.3,
          0,
          0.3,
          0.5,
          0.6,
          0.3
        ]
      },
      {
        "text": "A dominant, winning machine",
        "vector": [
          0,
          1,
          0,
          0.2,
          0,
          1,
          0,
          1
        ]
      },
      {
        "text": "A historic club with loyal fans",
        "vector": [
          0.2,
          0,
          1,
          0.3,
          1,
          0.5,
          0.3,
          0
        ]
      },
      {
        "text": "An underdog that never gives up",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.6,
          0.2,
          0.3,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Football taste",
    "question": "If your team is winning 1-0 late in the game, you prefer they:",
    "options": [
      {
        "text": "Go for a second goal",
        "vector": [
          0.9,
          0,
          0.3,
          0.3,
          0,
          0.3,
          1,
          -0.5
        ]
      },
      {
        "text": "Keep possession and control",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Keep pushing with energy",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "Defend and protect the lead",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.4,
          0,
          0,
          0.8
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "What kind of lifestyle fits you best?",
    "options": [
      {
        "text": "Creative and spontaneous",
        "vector": [
          1,
          0,
          0.4,
          0,
          0,
          0.2,
          0.8,
          -0.5
        ]
      },
      {
        "text": "Structured and organized",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Emotional and people-driven",
        "vector": [
          0.3,
          0,
          1,
          0.3,
          1,
          0.3,
          0.3,
          0
        ]
      },
      {
        "text": "Focused and resilient",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.5,
          0.2,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "When facing a challenge, you usually:",
    "options": [
      {
        "text": "Try a new approach",
        "vector": [
          0.8,
          0,
          0.3,
          0.2,
          0,
          0.2,
          1,
          -0.3
        ]
      },
      {
        "text": "Stick to a plan",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.3,
          0,
          1
        ]
      },
      {
        "text": "Follow your instincts",
        "vector": [
          0.4,
          0,
          1,
          0.3,
          0.5,
          0.2,
          0.5,
          0
        ]
      },
      {
        "text": "Push through no matter what",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.4,
          0,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "What motivates you the most?",
    "options": [
      {
        "text": "Creating something unique",
        "vector": [
          1,
          0,
          0.4,
          0,
          0,
          0.3,
          0.7,
          0
        ]
      },
      {
        "text": "Achieving success",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          1,
          0,
          1
        ]
      },
      {
        "text": "Connecting with people",
        "vector": [
          0.3,
          0,
          1,
          0.2,
          1,
          0.3,
          0.3,
          0
        ]
      },
      {
        "text": "Overcoming difficulties",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.5,
          0.3,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "How do you usually make decisions?",
    "options": [
      {
        "text": "Based on intuition",
        "vector": [
          0.7,
          0,
          0.5,
          0.2,
          0,
          0.2,
          0.7,
          -0.3
        ]
      },
      {
        "text": "Based on logic",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.3,
          0,
          1
        ]
      },
      {
        "text": "Based on feelings",
        "vector": [
          0.3,
          0,
          1,
          0.2,
          1,
          0.2,
          0.3,
          0
        ]
      },
      {
        "text": "Based on determination",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.4,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "What kind of environment do you prefer?",
    "options": [
      {
        "text": "Flexible and creative",
        "vector": [
          1,
          0,
          0.4,
          0,
          0,
          0.2,
          0.8,
          -0.4
        ]
      },
      {
        "text": "Organized and predictable",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.3,
          0,
          1
        ]
      },
      {
        "text": "Warm and social",
        "vector": [
          0.3,
          0,
          1,
          0.2,
          1,
          0.3,
          0.3,
          0
        ]
      },
      {
        "text": "Competitive and demanding",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.4,
          0.4,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "What frustrates you the most?",
    "options": [
      {
        "text": "Lack of creativity",
        "vector": [
          1,
          0,
          0.3,
          0,
          0,
          0.2,
          0.6,
          0
        ]
      },
      {
        "text": "Lack of structure",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.2,
          0,
          1
        ]
      },
      {
        "text": "Lack of emotion",
        "vector": [
          0.3,
          0,
          1,
          0.2,
          1,
          0.2,
          0.2,
          0
        ]
      },
      {
        "text": "Lack of effort",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.4,
          0,
          0,
          0.4
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "In a group, you are usually:",
    "options": [
      {
        "text": "The ideas person",
        "vector": [
          1,
          0,
          0.4,
          0,
          0,
          0.2,
          0.7,
          0
        ]
      },
      {
        "text": "The planner",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.3,
          0,
          1
        ]
      },
      {
        "text": "The motivator",
        "vector": [
          0.3,
          0,
          1,
          0.3,
          1,
          0.3,
          0.3,
          0
        ]
      },
      {
        "text": "The one who pushes others",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.4,
          0.2,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Life style",
    "question": "At your core, what matters most to you?",
    "options": [
      {
        "text": "Expression",
        "vector": [
          1,
          0,
          0.4,
          0,
          0,
          0.3,
          0.8,
          0
        ]
      },
      {
        "text": "Control",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Connection",
        "vector": [
          0.3,
          0,
          1,
          0.2,
          1,
          0.3,
          0.3,
          0
        ]
      },
      {
        "text": "Strength",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.4,
          0.3,
          0,
          0.5
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "If you were a player, your main strength would be:",
    "options": [
      {
        "text": "Creativity and flair",
        "vector": [
          1,
          0,
          0.5,
          0,
          0,
          0.3,
          1,
          -0.3
        ]
      },
      {
        "text": "Game intelligence and positioning",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Passion and leadership",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.4,
          0
        ]
      },
      {
        "text": "Strength and physicality",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.5,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "What role would you play in a team?",
    "options": [
      {
        "text": "The creative playmaker",
        "vector": [
          1,
          0,
          0.5,
          0,
          0,
          0.4,
          0.9,
          -0.3
        ]
      },
      {
        "text": "The tactical organizer",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "The emotional leader",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.4,
          0
        ]
      },
      {
        "text": "The defensive anchor",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.5,
          0,
          0,
          0.7
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "You receive the ball under pressure, you:",
    "options": [
      {
        "text": "Try something skillful",
        "vector": [
          1,
          0,
          0.4,
          0.2,
          0,
          0.3,
          1,
          -0.4
        ]
      },
      {
        "text": "Keep possession safely",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "Drive forward with energy",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "Shield and hold the ball",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.4,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "Your ideal goal is:",
    "options": [
      {
        "text": "A beautiful solo dribble",
        "vector": [
          1,
          0,
          0.5,
          0.2,
          0,
          0.3,
          1,
          -0.5
        ]
      },
      {
        "text": "A perfectly worked team goal",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "A last-minute emotional winner",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          1,
          0.4,
          0.5,
          0
        ]
      },
      {
        "text": "A powerful header or strike",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.5,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "If your teammate makes a mistake, you:",
    "options": [
      {
        "text": "Encourage them creatively",
        "vector": [
          0.7,
          0,
          0.4,
          0.1,
          0,
          0.3,
          0.7,
          0
        ]
      },
      {
        "text": "Stay focused on the system",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Lift them emotionally",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.3,
          0
        ]
      },
      {
        "text": "Demand more from them",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.5,
          0.2,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "In a penalty situation, you would:",
    "options": [
      {
        "text": "Go for a stylish finish",
        "vector": [
          1,
          0,
          0.3,
          0.2,
          0,
          0.3,
          1,
          -0.4
        ]
      },
      {
        "text": "Place it carefully",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Feed off the pressure",
        "vector": [
          0.3,
          0,
          1,
          0.5,
          1,
          0.4,
          0.4,
          0
        ]
      },
      {
        "text": "Hit it with power",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.5,
          0,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "Your attitude on the pitch is:",
    "options": [
      {
        "text": "Expressive and free",
        "vector": [
          1,
          0,
          0.5,
          0,
          0,
          0.3,
          0.9,
          -0.4
        ]
      },
      {
        "text": "Calm and controlled",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Passionate and intense",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.4,
          0
        ]
      },
      {
        "text": "Aggressive and determined",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.5,
          0,
          0,
          0.7
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "What makes you stand out as a player?",
    "options": [
      {
        "text": "Skill and creativity",
        "vector": [
          1,
          0,
          0.5,
          0,
          0,
          0.3,
          1,
          -0.3
        ]
      },
      {
        "text": "Consistency and intelligence",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.5,
          0,
          1
        ]
      },
      {
        "text": "Energy and charisma",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.4,
          0
        ]
      },
      {
        "text": "Strength and work ethic",
        "vector": [
          0,
          0.4,
          0,
          1,
          0.5,
          0.3,
          0,
          0.6
        ]
      }
    ]
  },
  {
    "group": "Player identity",
    "question": "If you lose the ball, you:",
    "options": [
      {
        "text": "Try to win it back creatively",
        "vector": [
          0.8,
          0,
          0.3,
          0.2,
          0,
          0.3,
          1,
          -0.4
        ]
      },
      {
        "text": "Recover position quickly",
        "vector": [
          0,
          1,
          0,
          0,
          0,
          0.4,
          0,
          1
        ]
      },
      {
        "text": "Chase with passion",
        "vector": [
          0.3,
          0,
          1,
          0.4,
          1,
          0.3,
          0.5,
          0
        ]
      },
      {
        "text": "Go in strong to win it back",
        "vector": [
          0,
          0.5,
          0,
          1,
          0.5,
          0,
          0,
          0.6
        ]
      }
    ]
  }
];

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

function selectedSongKey(song) {
  return `${song.title.toLowerCase()}::${song.artist.toLowerCase()}`;
}

function recommendSongs(listenerVector) {
  if (!listenerVector || state.selectedSongs.length === 0) return [];
  const selectedKeys = new Set(state.selectedSongs.map(selectedSongKey));
  return songs
    .filter((song) => song.vector && !selectedKeys.has(selectedSongKey(song)))
    .map((song) => ({
      ...song,
      score: cosineSimilarity(listenerVector, song.vector)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function renderRecommendations(listenerVector) {
  const recommendations = recommendSongs(listenerVector);
  elements.recommendationsTitle.textContent = t("recommendations");
  elements.recommendationsCount.textContent = recommendations.length ? String(recommendations.length) : "0";

  if (!recommendations.length) {
    elements.recommendationsNote.textContent = t("recommendationsEmpty");
    elements.songRecommendations.innerHTML = "";
    return;
  }

  elements.recommendationsNote.textContent = t("recommendationsReady");
  elements.songRecommendations.innerHTML = recommendations
    .map((song) => {
      return `
        <button class="recommendation-item" type="button" data-rec-title="${song.title}">
          <span>
            <strong>${song.title}</strong>
            <small>${song.artist}</small>
          </span>
          <em>${formatScore(song.score)}</em>
        </button>
      `;
    })
    .join("");
}

function saveIdentity() {
  localStorage.setItem("identityMapperProfile", JSON.stringify(identityStore));
}

function loadIdentity() {
  try {
    const saved = JSON.parse(localStorage.getItem("identityMapperProfile") || "{}");
    identityStore.music = saved.music || null;
    identityStore.football = saved.football || null;
  } catch (_error) {
    identityStore.music = null;
    identityStore.football = null;
  }
}

function renderPassport() {
  const entries = [
    identityStore.music ? { label: t("musicModule")[0], value: identityStore.music.primary } : null,
    identityStore.football ? { label: t("footballModule")[0], value: identityStore.football.primary } : null
  ].filter(Boolean);

  elements.savedIdentityLabel.textContent = t("savedIdentity");
  elements.passportTitle.textContent = entries.length ? t("passportActiveTitle") : t("passportEmptyTitle");
  elements.passportChips.innerHTML = entries.length
    ? entries.map((entry) => `<span class="passport-chip"><strong>${entry.label}</strong>${entry.value}</span>`).join("")
    : `<span class="passport-empty">${t("passportEmpty")}</span>`;

  saveIdentity();
}

function setActiveModule(moduleName) {
  state.activeModule = moduleName;
  document.body.dataset.module = moduleName;
  elements.moduleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.module === moduleName);
  });
  elements.moduleViews.forEach((view) => {
    view.classList.toggle("active", view.id === `${moduleName}Module`);
  });
  renderModuleCopy();
  renderSymbolStream(moduleName);
}

function renderSymbolStream(moduleName) {
  const symbols = moduleSymbols[moduleName] || moduleSymbols.music;
  const isFootball = moduleName === "football";
  const topValues = isFootball
    ? [40, 154, 286, 78, 224, 360, 118, 316, 188]
    : [18, 86, 162, 42, 216, 66, 292, 28, 118, 250, 52, 184, 338, 76, 142, 312, 96, 228, 58, 276, 26, 204, 84, 356, 46, 132, 324, 238, 106, 176, 384, 266, 146];
  const sizes = isFootball
    ? [1.06, 0.86, 0.96, 0.74, 1.12, 0.82, 0.92, 1.02, 0.78]
    : [1.45, 0.92, 1.05, 1.16, 0.96, 1.05, 1.2, 1.36, 1, 1.28, 1.28, 0.95, 1.1, 1.18, 1.34, 0.88, 0.88, 1.12, 1.12, 1.02, 1.02, 1.42, 1.42, 0.96, 0.96, 1.22, 1.32, 0.9, 1.04, 1.18, 1, 1.36, 0.94];

  elements.symbolStream.innerHTML = topValues
    .map((top, index) => {
      const symbol = symbols[index % symbols.length];
      const delay = isFootball ? -22 + index * 4.7 : -34 + index * 2;
      return `<span style="--delay: ${delay}s; --top: ${top}px; --size: ${sizes[index]}rem;">${symbol}</span>`;
    })
    .join("");
}

function normalizeVector(vector) {
  return vector.map((value) => Math.max(0, Math.min(1, value)));
}

function averageFootballAnswers() {
  const answers = state.footballAnswers.filter((answer) => answer !== null && answer !== undefined);
  if (!answers.length) return null;
  const totals = Array(8).fill(0);
  state.footballAnswers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null || answerIndex === undefined) return;
    footballQuestions[questionIndex].options[answerIndex].vector.forEach((value, index) => {
      totals[index] += value;
    });
  });
  return normalizeVector(totals.map((value) => value / answers.length));
}

function footballTeamPool() {
  if (state.footballCategory === "all") return footballTeams;
  return footballTeams.filter((team) => team.category === state.footballCategory);
}

function badgeSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function badgePath(name) {
  const prefix = window.location.protocol === "file:" ? "assets/badges/" : "/static/assets/badges/";
  return `${prefix}${badgeSlug(name)}.png`;
}

function renderFootballCategorySelect() {
  elements.footballModelLabel.textContent = t("footballModelLabel");
  const labels = t("footballCategories");
  elements.footballCategorySelect.innerHTML = footballCategoryOrder
    .map((category) => `<option value="${category}"${state.footballCategory === category ? " selected" : ""}>${labels[category]}</option>`)
    .join("");
}

function scoreFootballTeams(vector) {
  return footballTeamPool()
    .map((team) => ({
      ...team,
      score: cosineSimilarity(vector, team.vector)
    }))
    .sort((a, b) => b.score - a.score);
}

function renderFootballQuestions() {
  const answered = state.footballAnswers.filter((answer) => answer !== null && answer !== undefined).length;
  elements.footballProgress.textContent = `${answered}/${footballQuestions.length}`;
  elements.footballQuestions.innerHTML = footballQuestions
    .map((question, questionIndex) => {
      const options = question.options
        .map((option, optionIndex) => {
          const selected = state.footballAnswers[questionIndex] === optionIndex;
          return `
            <button class="quiz-option${selected ? " selected" : ""}" type="button" data-football-question="${questionIndex}" data-football-option="${optionIndex}">
              ${option.text}
            </button>
          `;
        })
        .join("");
      return `
        <article class="quiz-question">
          <span class="question-group">${question.group}</span>
          <p>${question.question}</p>
          <div class="quiz-options">${options}</div>
        </article>
      `;
    })
    .join("");
}

function renderFootball() {
  renderFootballCategorySelect();
  renderFootballQuestions();
  const vector = averageFootballAnswers();
  if (!vector) {
    elements.footballTeam.textContent = t("footballEmptyTeam");
    elements.footballDescription.textContent = t("footballEmptyDescription");
    elements.footballMatches.innerHTML = "";
    elements.footballBadgeFrame.hidden = true;
    elements.footballMeters.forEach((meter) => {
      meter.value = 0;
    });
    elements.footballProfilePoint.style.left = "50%";
    elements.footballProfilePoint.style.top = "50%";
    return;
  }

  const ranked = scoreFootballTeams(vector);
  const primary = ranked[0];
  elements.footballTeam.textContent = primary.name;
  elements.footballDescription.textContent = `${primary.name} matches a profile that is ${primary.description}`;
  elements.footballBadgeFrame.hidden = false;
  elements.footballBadge.src = badgePath(primary.name);
  elements.footballBadge.alt = `${primary.name} badge`;
  elements.footballBadge.onerror = () => {
    elements.footballBadgeFrame.hidden = true;
  };
  elements.footballMatches.innerHTML = ranked
    .slice(0, 5)
    .map((match) => {
      const width = Math.max(4, Math.round(match.score * 100));
      return `
        <div class="match-row">
          <span>${match.name}</span>
          <strong>${formatScore(match.score)}</strong>
          <i style="width: ${width}%"></i>
        </div>
      `;
    })
    .join("");
  elements.footballMeters.forEach((meter, index) => {
    meter.value = vector[index];
  });
  const fieldX = 10 + ((vector[0] + vector[6]) / 2) * 80;
  const fieldY = 90 - ((vector[1] + vector[7]) / 2) * 80;
  elements.footballProfilePoint.style.left = `${fieldX}%`;
  elements.footballProfilePoint.style.top = `${fieldY}%`;

  identityStore.football = { primary: primary.name, score: primary.score, category: state.footballCategory };
  renderPassport();
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
  const exists = state.selectedSongs.some((selected) => {
    return selected.title.toLowerCase() === song.title.toLowerCase() && selected.artist.toLowerCase() === song.artist.toLowerCase();
  });
  if (exists) {
    elements.input.value = "";
    return;
  }
  state.selectedSongs.push(song);
  state.classifierPredictions = null;
  elements.input.value = "";
  render();
}

function renderOptions() {
  elements.addButton.textContent = t("addSong");
  renderModuleCopy();
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
    .slice(0, 12000)
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

function renderModuleCopy() {
  const copy = (moduleCopy[state.activeModule] || moduleCopy.music)[state.lang];
  document.querySelector("#eyebrowText").textContent = copy.eyebrow;
  document.querySelector("#titleText").textContent = copy.title;
  document.querySelector("#summaryText").textContent = copy.summary;
  document.querySelector("#statusText").textContent = copy.status;

  [
    ["moduleMusic", t("musicModule")],
    ["moduleFootball", t("footballModule")],
    ["moduleGames", t("gamesModule")],
    ["moduleCreators", t("creatorsModule")]
  ].forEach(([prefix, values]) => {
    elements[`${prefix}Label`].textContent = values[0];
    elements[`${prefix}Title`].textContent = values[1];
    elements[`${prefix}Meta`].textContent = values[2];
  });

  elements.savedIdentityLabel.textContent = t("savedIdentity");
  elements.recommendationsTitle.textContent = t("recommendations");
  elements.footballEyebrow.textContent = t("footballEyebrow");
  elements.footballPanelTitle.textContent = t("footballPanelTitle");
  elements.footballQuestionsTitle.textContent = t("footballQuestionsTitle");
  elements.footballModuleNote.textContent = t("footballModuleNote");
  elements.footballResultLabel.textContent = t("footballResultLabel");
  elements.footballMatchesLabel.textContent = t("topMatches");
  elements.footballFeatureLabels.forEach((element, index) => {
    element.textContent = t("footballFeatureLabels")[index];
  });
  elements.footballFieldLabels.forEach((element, index) => {
    element.textContent = t("footballFieldLabels")[index];
  });
  renderFootballCategorySelect();
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
  renderRecommendations(null);
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
  renderRecommendations(listenerVector);
  identityStore.music = { primary: archetypeName(primary), secondary: archetypeName(secondary), confidence };
  renderPassport();
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

elements.songRecommendations.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-rec-title]");
  if (button) addSong(findSong(button.dataset.recTitle));
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
    renderFootball();
    renderPassport();
  });
});

elements.resetButton.addEventListener("click", () => {
  state.selectedSongs = [];
  state.calibrationAnswers = Array(calibrationQuestions.length).fill(null);
  state.classifierPredictions = null;
  state.lastClassifierText = "";
  identityStore.music = null;
  renderPassport();
  render();
});

elements.moduleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveModule(button.dataset.module);
  });
});

elements.footballQuestions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-football-question]");
  if (!button) return;
  state.footballAnswers[Number(button.dataset.footballQuestion)] = Number(button.dataset.footballOption);
  renderFootball();
});

elements.footballCategorySelect.addEventListener("change", () => {
  state.footballCategory = elements.footballCategorySelect.value;
  renderFootball();
});

elements.footballReset.addEventListener("click", () => {
  state.footballAnswers = Array(footballQuestions.length).fill(null);
  identityStore.football = null;
  renderFootball();
  renderPassport();
});

state.footballAnswers = Array(footballQuestions.length).fill(null);
loadIdentity();
setActiveModule("music");
renderOptions();
render();
renderFootball();
renderPassport();
