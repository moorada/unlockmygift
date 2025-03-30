FilePond.registerPlugin(FilePondPluginFileEncode);

let questionCount = 0;
const ponds = [];

const showFormBtn = document.getElementById('showFormBtn');
const quizForm = document.getElementById('quizForm');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const saveQuizBtn = document.getElementById('saveQuizBtn');
const questionsContainer = document.getElementById('questions');

const langFlagsContainer = document.getElementById('langFlagsContainer');

// Example i18n dictionary for the Generator
const i18nDictGenerator = {
  en: {
    generatorHeading: "UnlockMyGift - Generator",
    generatorIntro:
      "UnlockMyGift is a playful web application that lets you create a series of riddles or questions that 'lock' a gift. " +
      "Generate a .unlock file, share it with a friend or loved one, and watch them try to solve your puzzle to uncover " +
      "their present. It's a fun way to add mystery and excitement to gift-giving. Start by creating your quiz below!",
    createQuizBtn: "Create your Quiz",
    alreadyGift: "Already have a gift to unlock?",
    goToUnlocker: "Go to Unlocker",
    quizDetailsHeading: "Quiz Details",
    quizNameLabel: "Quiz Name",
    quizDescriptionLabel: "Description",
    finalMessageLabel: "Final Message",
    addQuestionBtn: "+ Add Question",
    saveQuizBtn: "Save your LockedGift",

    questionLabel: "Question",
    answersLabel: "Correct Answers (comma-separated)",
    textCorrectLabel: "Text shown if correct",
    imageUploadLabel: "Upload images (optional)",
    wrongAnswersLabel: "Wrong Answers Messages (comma-separated)",

    noQuestionAlert: "You must add at least one question!",
    noValidQuestionAlert: "At least one question must have a text and a correct answer!"
  },
  es: {
    generatorHeading: "UnlockMyGift - Generador",
    generatorIntro:
      "UnlockMyGift es una aplicación web lúdica que te permite crear una serie de acertijos o preguntas para 'bloquear' un regalo. " +
      "Genera un archivo .unlock, compártelo con un amigo o ser querido, y observa cómo tratan de resolver tu rompecabezas " +
      "para descubrir su presente. Es una forma divertida de agregar misterio y emoción al regalar. ¡Comienza creando tu quiz a continuación!",
    createQuizBtn: "Crea tu Quiz",
    alreadyGift: "¿Ya tienes un regalo para desbloquear?",
    goToUnlocker: "Ir al Unlocker",
    quizDetailsHeading: "Detalles del Quiz",
    quizNameLabel: "Nombre del Quiz",
    quizDescriptionLabel: "Descripción",
    finalMessageLabel: "Mensaje Final",
    addQuestionBtn: "+ Agregar Pregunta",
    saveQuizBtn: "Guardar tu LockedGift",

    questionLabel: "Pregunta",
    answersLabel: "Respuestas correctas (separadas por comas)",
    textCorrectLabel: "Texto mostrado si es correcto",
    imageUploadLabel: "Subir imágenes (opcional)",
    wrongAnswersLabel: "Textos para respuesta errónea (separados por comas)",

    noQuestionAlert: "¡Debes agregar al menos una pregunta!",
    noValidQuestionAlert: "¡Al menos una pregunta debe tener texto y respuesta correcta!"
  },
  fr: {
    generatorHeading: "UnlockMyGift - Générateur",
    generatorIntro:
      "UnlockMyGift est une application web ludique qui vous permet de créer une série d'énigmes ou de questions pour 'verrouiller' un cadeau. " +
      "Générez un fichier .unlock, partagez-le avec un ami ou un proche, et regardez-les tenter de résoudre votre puzzle " +
      "pour découvrir leur présent. C'est un moyen amusant d'ajouter du mystère et de l'excitation à vos cadeaux. Commencez dès maintenant en créant votre quiz !",
    createQuizBtn: "Créez votre Quiz",
    alreadyGift: "Vous avez déjà un cadeau à déverrouiller ?",
    goToUnlocker: "Aller au Unlocker",
    quizDetailsHeading: "Détails du Quiz",
    quizNameLabel: "Nom du Quiz",
    quizDescriptionLabel: "Description",
    finalMessageLabel: "Message Final",
    addQuestionBtn: "+ Ajouter une Question",
    saveQuizBtn: "Enregistrer votre LockedGift",

    questionLabel: "Question",
    answersLabel: "Réponses correctes (séparées par des virgules)",
    textCorrectLabel: "Texte affiché si correct",
    imageUploadLabel: "Télécharger des images (optionnel)",
    wrongAnswersLabel: "Textes pour réponse fausse (séparés par virgules)",

    noQuestionAlert: "Vous devez ajouter au moins une question !",
    noValidQuestionAlert: "Au moins une question doit comporter du texte et une réponse correcte !"
  },
  it: {
    generatorHeading: "UnlockMyGift - Generator",
    generatorIntro:
      "UnlockMyGift è un'applicazione web divertente che ti permette di creare una serie di indovinelli o domande per 'bloccare' un regalo. " +
      "Genera un file .unlock, condividilo con un amico o una persona cara e osservali mentre cercano di risolvere il tuo quiz " +
      "per scoprire il loro regalo. È un modo originale per aggiungere mistero ed entusiasmo al momento del dono. Inizia qui sotto creando il tuo quiz!",
    createQuizBtn: "Crea il tuo Quiz",
    alreadyGift: "Hai già un regalo da sbloccare?",
    goToUnlocker: "Vai al Unlocker",
    quizDetailsHeading: "Dettagli del Quiz",
    quizNameLabel: "Nome del Quiz",
    quizDescriptionLabel: "Descrizione",
    finalMessageLabel: "Messaggio Finale",
    addQuestionBtn: "+ Aggiungi Domanda",
    saveQuizBtn: "Salva il tuo LockedGift",

    questionLabel: "Domanda",
    answersLabel: "Risposte corrette (separate da virgola)",
    textCorrectLabel: "Testo mostrato se corretto",
    imageUploadLabel: "Carica immagini (opzionale)",
    wrongAnswersLabel: "Testi per risposta errata (separati da virgola)",

    noQuestionAlert: "Devi aggiungere almeno una domanda!",
    noValidQuestionAlert: "Almeno una domanda deve avere testo e una risposta corretta!"
  }
};

function detectBrowserLang() {
  const lang = navigator.language.slice(0, 2).toLowerCase();
  if (["en", "es", "fr", "it"].includes(lang)) {
    return lang;
  }
  return "en";
}

let currentLang = localStorage.getItem('umgLangGen') || detectBrowserLang();

function updateLanguageStringsGenerator(lang) {
  currentLang = lang;
  localStorage.setItem('umgLangGen', lang);

  const dict = i18nDictGenerator[lang];

  document.getElementById("generatorHeading").textContent = dict.generatorHeading;
  document.getElementById("generatorIntro").textContent = dict.generatorIntro;
  showFormBtn.textContent = dict.createQuizBtn;
  document.getElementById("generatorAlreadyGift").textContent = dict.alreadyGift;
  document.getElementById("generatorGoToUnlocker").textContent = dict.goToUnlocker;

  document.getElementById("quizDetailHeading").textContent = dict.quizDetailsHeading;
  document.getElementById("quizNameLabel").textContent = dict.quizNameLabel;
  document.getElementById("quizDescriptionLabel").textContent = dict.quizDescriptionLabel;
  document.getElementById("finalMessageLabel").textContent = dict.finalMessageLabel;

  addQuestionBtn.textContent = dict.addQuestionBtn;
  saveQuizBtn.textContent = dict.saveQuizBtn;
}

updateLanguageStringsGenerator(currentLang);

// Handle clicks on flags
langFlagsContainer.querySelectorAll('img').forEach(flag => {
  flag.addEventListener('click', () => {
    const lang = flag.dataset.lang;
    updateLanguageStringsGenerator(lang);
  });
});

showFormBtn.addEventListener('click', () => {
  quizForm.classList.remove('hidden');
  showFormBtn.style.display = 'none';
});

addQuestionBtn.addEventListener('click', addQuestion);
saveQuizBtn.addEventListener('click', downloadQuiz);

function addQuestion() {
  const dict = i18nDictGenerator[currentLang];

  const container = document.createElement('div');
  container.className = 'question';

  const questionIndex = questionCount;

  // We add an extra field for "wrong answers messages"
  container.innerHTML = `
    <label>${dict.questionLabel}</label>
    <input type="text" class="questionText" placeholder="e.g. What is the fastest land animal?" />

    <label>${dict.answersLabel}</label>
    <input type="text" class="correctAnswers" placeholder="e.g. cheetah, ghepardo" />

    <label>${dict.textCorrectLabel}</label>
    <input type="text" class="textCorrect" placeholder="e.g. Correct! It is the cheetah." />

    <label>${dict.wrongAnswersLabel}</label>
    <input type="text" class="wrongAnswers" placeholder="e.g. How can you not know this?, I expected better!, You failed again?" />

    <label>${dict.imageUploadLabel}</label>
    <input type="file" class="imageFiles" name="imageFiles${questionIndex}" multiple accept="image/*" />
  `;

  questionsContainer.appendChild(container);

  const input = container.querySelector('.imageFiles');
  const pond = FilePond.create(input, {
    allowMultiple: true,
    credits: false,
    labelIdle: "Drag & drop images or click to browse",
  });

  ponds.push(pond);
  questionCount++;
}

async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function encryptWithKey(plainText, rawKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const algoKey = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    algoKey,
    new TextEncoder().encode(plainText)
  );
  return {
    iv: Array.from(iv),
    content: Array.from(new Uint8Array(encrypted))
  };
}

function cartesianProduct(arrOfArr) {
  return arrOfArr.reduce((acc, curr) => {
    const tmp = [];
    acc.forEach(a => {
      curr.forEach(b => {
        tmp.push([...a, b]);
      });
    });
    return tmp;
  }, [[]]);
}

async function downloadQuiz() {
  const dict = i18nDictGenerator[currentLang];

  const name = document.getElementById('quizName').value.trim();
  const description = document.getElementById('quizDescription').value.trim();
  const finalMessage = document.getElementById('finalMessage').value.trim();

  const questionElements = document.querySelectorAll('.question');
  if (questionElements.length === 0) {
    alert(dict.noQuestionAlert);
    return;
  }

  const questions = [];
  let validQuestionExists = false;

  // We'll store arrays of possible correct answers to generate multiple keys
  const correctAnswersMatrix = [];

  for (let i = 0; i < questionElements.length; i++) {
    const qEl = questionElements[i];
    const questionText = qEl.querySelector('.questionText').value.trim();
    const answersRaw = qEl.querySelector('.correctAnswers').value.split(',')
      .map(a => a.trim().toLowerCase())
      .filter(a => a);
    const textIfCorrect = qEl.querySelector('.textCorrect').value.trim();

    // The new field for wrong answers
    const wrongAnswersRaw = qEl.querySelector('.wrongAnswers').value.split(',')
      .map(a => a.trim())
      .filter(a => a); // array of possible wrong answer messages

    if (questionText !== '' && answersRaw.length > 0) {
      validQuestionExists = true;
    }

    let allHashes = new Set();
    for (const ans of answersRaw) {
      if (ans !== '') {
        const h = await sha256(ans);
        allHashes.add(h);
      }
    }

    const pond = ponds[i];
    const imageFiles = pond.getFiles();
    let images = [];
    for (const f of imageFiles) {
      const base64 = f.getFileEncodeBase64String();
      images.push("data:" + f.fileType + ";base64," + base64);
    }

    questions.push({
      question: questionText || '',
      images: images.length > 0 ? images : undefined,
      solutionHashes: Array.from(allHashes),
      textIfCorrect: textIfCorrect || '',
      // store the array of wrong messages
      wrongAnswersMessages: wrongAnswersRaw
    });

    correctAnswersMatrix.push(answersRaw);
  }

  if (!validQuestionExists) {
    alert(dict.noValidQuestionAlert);
    return;
  }

  // Final message encryption with multiple combos
  let finalMessageEncArray = [];
  if (finalMessage) {
    const allCombinations = cartesianProduct(correctAnswersMatrix);
    for (const combo of allCombinations) {
      const concatenated = combo.join('');
      const finalKeyHex = await sha256(concatenated);
      const finalKeyBuffer = new Uint8Array(finalKeyHex.match(/.{2}/g).map(byte => parseInt(byte, 16)));

      const encObj = await encryptWithKey(finalMessage, finalKeyBuffer);
      finalMessageEncArray.push(encObj);
    }
  }

  const quizData = {
    name,
    description,
    questions,
    finalMessageEncArray
  };

  async function encryptData(data, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const algoKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key.padEnd(32)),
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      algoKey,
      new TextEncoder().encode(JSON.stringify(data))
    );
    return {
      iv: Array.from(iv),
      content: Array.from(new Uint8Array(encrypted))
    };
  }

  const encryptionKey = "UnlockMyGiftSuperSecretKey";
  const encrypted = await encryptData(quizData, encryptionKey);

  // Keep the 2 lines, then JSON
  const fileContent = `# Welcome to the official UnlockMyGift puzzle!
# Load this file at https://moorada.github.io/unlockmygift/unlocker.html and prepare for a thrilling challenge!
` + JSON.stringify(encrypted);

  const blob = new Blob([fileContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "locked_gift.unlock";
  link.click();
}
