FilePond.registerPlugin(FilePondPluginFileEncode);

let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];

// We track how many times the user is wrong for the CURRENT question
// so we can show the "wrong" messages in order, cycling if needed
let wrongAttemptCountForCurrentQuestion = 0;

const introEl = document.getElementById('unlockerIntro');
const uploadAreaEl = document.getElementById('uploadArea');
const quizInfoEl = document.getElementById('quizInfo');
const quizTitleEl = document.getElementById('quizTitle');
const quizDescEl = document.getElementById('quizDesc');
const startQuizBtn = document.getElementById('startQuizBtn');
const quizContainerEl = document.getElementById('quizContainer');

const fileInputElement = document.getElementById('fileInput');
const pond = FilePond.create(fileInputElement, {
  allowMultiple: false,
  labelIdle: 'Drag & drop .unlock file or click to browse',
  credits: false,
  allowFileEncode: true,
  instantUpload: false
});

const langFlagsContainerUnlocker = document.getElementById('langFlagsContainerUnlocker');

// Basic i18n dictionary for Unlocker
const i18nDictUnlocker = {
  en: {
    heading: "UnlockMyGift",
    intro:
      "Welcome to UnlockMyGift! Here, you can upload a .unlock file created with our Generator " +
      "and answer a series of riddles or questions to reveal your special gift. Good luck!",
    startQuizBtn: "Start the Quiz",
    enterAnswerMsg: "Please enter an answer.",
    wrongAnswerMsg: "Wrong answer.",
    noMessage: "You've finished the quiz, but there's no final message!",
    failMessage: "You couldn't unlock the final message.",
    questionPlaceholder: "Type your answer...",
    verifyBtn: "Verify",
    nextBtn: "Next",
    unknownQuiz: "Unknown Quiz"
  },
  es: {
    heading: "UnlockMyGift",
    intro:
      "¡Bienvenido a UnlockMyGift! Aquí puedes subir un archivo .unlock creado con nuestro Generador " +
      "y responder una serie de acertijos o preguntas para revelar tu regalo especial. ¡Buena suerte!",
    startQuizBtn: "Iniciar el Quiz",
    enterAnswerMsg: "Por favor ingresa una respuesta.",
    wrongAnswerMsg: "Respuesta incorrecta.",
    noMessage: "Has terminado el quiz, ¡pero no hay mensaje final!",
    failMessage: "No pudiste desbloquear el mensaje final.",
    questionPlaceholder: "Escribe tu respuesta...",
    verifyBtn: "Verificar",
    nextBtn: "Siguiente",
    unknownQuiz: "Quiz Desconocido"
  },
  fr: {
    heading: "UnlockMyGift",
    intro:
      "Bienvenue sur UnlockMyGift ! Ici, vous pouvez télécharger un fichier .unlock créé avec notre Générateur " +
      "et répondre à une série d'énigmes ou de questions pour révéler votre cadeau spécial. Bonne chance!",
    startQuizBtn: "Commencer le Quiz",
    enterAnswerMsg: "Veuillez entrer une réponse.",
    wrongAnswerMsg: "Mauvaise réponse.",
    noMessage: "Vous avez terminé le quiz, mais il n'y a pas de message final!",
    failMessage: "Vous n'avez pas pu déverrouiller le message final.",
    questionPlaceholder: "Tapez votre réponse...",
    verifyBtn: "Vérifier",
    nextBtn: "Suivant",
    unknownQuiz: "Quiz Inconnu"
  },
  it: {
    heading: "UnlockMyGift",
    intro:
      "Benvenuto su UnlockMyGift! Qui puoi caricare un file .unlock creato con il nostro Generatore " +
      "e rispondere a una serie di indovinelli o domande per scoprire il tuo regalo speciale. Buona fortuna!",
    startQuizBtn: "Inizia il Quiz",
    enterAnswerMsg: "Inserisci una risposta.",
    wrongAnswerMsg: "Risposta errata.",
    noMessage: "Hai completato il quiz, ma non c'è nessun messaggio finale!",
    failMessage: "Non sei riuscito a sbloccare il messaggio finale.",
    questionPlaceholder: "Scrivi la tua risposta...",
    verifyBtn: "Verifica",
    nextBtn: "Avanti",
    unknownQuiz: "Quiz Sconosciuto"
  }
};

function detectBrowserLang() {
  const lang = navigator.language.slice(0, 2).toLowerCase();
  if (["en", "es", "fr", "it"].includes(lang)) {
    return lang;
  }
  return "en";
}

let currentLang = localStorage.getItem('umgLangView') || detectBrowserLang();

function updateLanguageStringsUnlocker(lang) {
  currentLang = lang;
  localStorage.setItem('umgLangView', lang);

  const dict = i18nDictUnlocker[lang];
  document.getElementById('unlockerHeading').textContent = dict.heading;
  introEl.textContent = dict.intro;
  startQuizBtn.textContent = dict.startQuizBtn;
}

// Initialize i18n
updateLanguageStringsUnlocker(currentLang);

// Handle clicks on flags in the Unlocker
langFlagsContainerUnlocker.querySelectorAll('img').forEach(flag => {
  flag.addEventListener('click', () => {
    const lang = flag.dataset.lang;
    updateLanguageStringsUnlocker(lang);
  });
});

async function decryptData(encData, key) {
  const iv = new Uint8Array(encData.iv);
  const content = new Uint8Array(encData.content);
  const algoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key.padEnd(32)),
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, algoKey, content);
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function decryptWithKey(encryptedObj, rawKey) {
  const iv = new Uint8Array(encryptedObj.iv);
  const content = new Uint8Array(encryptedObj.content);
  const algoKey = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, algoKey, content);
  return new TextDecoder().decode(decrypted);
}

pond.on('addfile', async (error, file) => {
  if (error) {
    console.error('FilePond addfile error:', error);
    return;
  }
  if (!file || !file.getFileEncodeBase64String) {
    return;
  }
  const base64 = file.getFileEncodeBase64String();
  const fileContent = atob(base64);

  const lines = fileContent.split('\n');
  if (lines.length < 3) {
    alert('Invalid or corrupted file.');
    return;
  }
  const jsonPart = lines.slice(2).join('\n');
  let encrypted;
  try {
    encrypted = JSON.parse(jsonPart);
  } catch (e) {
    alert('Invalid or corrupted file.');
    return;
  }

  const encryptionKey = "UnlockMyGiftSuperSecretKey";
  try {
    quizData = await decryptData(encrypted, encryptionKey);
  } catch (e) {
    alert('Unable to decrypt file. Possibly corrupted or invalid key.');
    console.error(e);
    return;
  }

  introEl.style.display = 'none';
  uploadAreaEl.style.display = 'none';

  const dict = i18nDictUnlocker[currentLang];
  quizTitleEl.textContent = quizData.name || dict.unknownQuiz;
  quizDescEl.textContent = quizData.description || '';
  quizInfoEl.classList.remove('hidden');
});

startQuizBtn.addEventListener('click', () => {
  quizInfoEl.classList.add('hidden');
  currentQuestionIndex = 0;
  userAnswers = [];
  showCurrentQuestion();
});

startQuizBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    startQuizBtn.click();
  }
});

async function showCurrentQuestion() {
  const dict = i18nDictUnlocker[currentLang];
  quizContainerEl.innerHTML = '';

  if (!quizData) {
    quizContainerEl.innerHTML = '<p>Please upload a .unlock file first.</p>';
    return;
  }

  // No more questions => final message
  if (currentQuestionIndex >= quizData.questions.length) {
    let finalMessage = dict.noMessage;
    if (quizData.finalMessageEncArray && quizData.finalMessageEncArray.length > 0) {
      const concatenated = userAnswers.join('');
      const finalKeyHex = await sha256(concatenated);
      const finalKeyBuffer = new Uint8Array(finalKeyHex.match(/.{2}/g).map(byte => parseInt(byte, 16)));

      let successfullyDecrypted = false;
      for (const encObj of quizData.finalMessageEncArray) {
        try {
          const msg = await decryptWithKey(encObj, finalKeyBuffer);
          finalMessage = msg;
          successfullyDecrypted = true;
          break;
        } catch (error) {
          // next
        }
      }
      if (!successfullyDecrypted) {
        finalMessage = dict.failMessage;
      }
    }

    quizContainerEl.innerHTML = `<div class="final">${finalMessage}</div>`;
    return;
  }

  // Reset the wrong attempts for this question
  wrongAttemptCountForCurrentQuestion = 0;

  const q = quizData.questions[currentQuestionIndex];
  const div = document.createElement('div');
  div.className = 'question-container';

  div.innerHTML = `
    <h2>Question ${currentQuestionIndex + 1}</h2>
    <p>${q.question}</p>
    <div id="imageGallery" class="image-gallery"></div>
    <input type="text" id="answerInput" class="answer-input" placeholder="${dict.questionPlaceholder}" />
    <button class="btn" id="verifyBtn">${dict.verifyBtn}</button>
    <div class="result" id="result"></div>
  `;

  quizContainerEl.appendChild(div);

  if (q.images && Array.isArray(q.images) && q.images.length > 0) {
    const galleryDiv = div.querySelector('#imageGallery');
    q.images.forEach((img) => {
      const a = document.createElement('a');
      a.href = img;
      a.dataset.src = img;
      const imageEl = document.createElement('img');
      imageEl.src = img;
      a.appendChild(imageEl);
      galleryDiv.appendChild(a);
    });
    lightGallery(galleryDiv, {
      plugins: [lgZoom],
      zoom: true,
      licenseKey: '0000-0000-000-0000',
      speed: 300,
    });
  }

  const answerInput = div.querySelector('#answerInput');
  const verifyBtn = div.querySelector('#verifyBtn');
  const resultEl = div.querySelector('#result');

  verifyBtn.addEventListener('click', async () => {
    const answer = answerInput.value.trim().toLowerCase();
    if (!answer) {
      resultEl.style.color = 'green';
      resultEl.textContent = dict.enterAnswerMsg;
      return;
    }

    let correct = false;
    const hashedAnswer = await sha256(answer);
    if (q.solutionHashes && q.solutionHashes.includes(hashedAnswer)) {
      correct = true;
    }

    if (correct) {
      userAnswers[currentQuestionIndex] = answer;
      quizContainerEl.innerHTML = `
        <div class="question-container">
          <h2>${q.textIfCorrect || "Good job!"}</h2>
          <button class="btn" id="nextBtn">${dict.nextBtn}</button>
        </div>
      `;
      const nextBtn = quizContainerEl.querySelector('#nextBtn');
      nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          currentQuestionIndex++;
          showCurrentQuestion();
        }
      });
      nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        showCurrentQuestion();
      });
    } else {
      // Wrong answer => show next "wrong" message from the array, cycling
      wrongAttemptCountForCurrentQuestion++;
      resultEl.style.color = 'red';

      if (q.wrongAnswersMessages && q.wrongAnswersMessages.length > 0) {
        // Cycle through
        const idx = (wrongAttemptCountForCurrentQuestion - 1) % q.wrongAnswersMessages.length;
        resultEl.textContent = q.wrongAnswersMessages[idx];
      } else {
        // fallback if no messages
        resultEl.textContent = dict.wrongAnswerMsg;
      }
    }
  });

  answerInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      verifyBtn.click();
    }
  });
}
