FilePond.registerPlugin(FilePondPluginFileEncode);

let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let previousQuestionIndex = -1; // Per tornare all'indovinello precedente

// We track how many times the user is wrong for the CURRENT question
// so we can show the "wrong" messages in order, cycling if needed
let wrongAttemptCountForCurrentQuestion = 0;

// Track the current phase of the unlocker process
// 1: Upload file
// 2: Quiz info
// 3: Question view
// 4: Final message
let currentPhase = 1;

// Riferimenti agli elementi DOM
const introEl = document.getElementById('unlockerIntro');
const uploadAreaEl = document.getElementById('uploadArea');
const quizInfoEl = document.getElementById('quizInfo');
const quizTitleEl = document.getElementById('quizTitle');
const quizDescEl = document.getElementById('quizDesc');
const startQuizBtn = document.getElementById('startQuizBtn');
const quizContainerEl = document.getElementById('quizContainer');
const backButtonEl = document.getElementById('backButton');
const continueAfterUploadBtn = document.getElementById('continueAfterUploadBtn');

// Inizializzazione di FilePond con ritardo per assicurarsi che gli stili siano caricati
let pond;
document.addEventListener('DOMContentLoaded', () => {
  const fileInputElement = document.getElementById('fileInput');
  // Inizializziamo FilePond solo quando tutti gli stili sono caricati
  pond = FilePond.create(fileInputElement, {
    allowMultiple: false,
    labelIdle: 'Drag & drop .unlock file or click to browse',
    credits: false,
    allowFileEncode: true,
    instantUpload: false
  });
  
  // Registriamo l'evento di aggiunta file
  pond.on('addfile', handleFileUpload);
});

const langFlagsContainerUnlocker = document.getElementById('langFlagsContainerUnlocker');

// Basic i18n dictionary for Unlocker
const i18nDictUnlocker = {
  en: {
    heading: "UnlockMyGift",
    intro:
      "Welcome to UnlockMyGift! Here, you can upload a .unlock file created with our Generator " +
      "and answer a series of riddles or questions to reveal your special gift. Good luck!",
    startQuizBtn: "Unlock the Gift",
    continueBtn: "Continue to Riddle Info",
    enterAnswerMsg: "Please enter an answer.",
    wrongAnswerMsg: "Wrong answer.",
    noMessage: "You've finished the quiz, but there's no final message!",
    failMessage: "You couldn't unlock the final message.",
    questionPlaceholder: "Type your answer...",
    submitBtn: "Submit",
    nextRiddleBtn: "Continue to Next Riddle",
    previousBtn: "Go to Previous Riddle",
    backBtn: "Back",
    unknownQuiz: "Unknown Quiz"
  },
  es: {
    heading: "UnlockMyGift",
    intro:
      "¡Bienvenido a UnlockMyGift! Aquí puedes subir un archivo .unlock creado con nuestro Generador " +
      "y responder una serie de acertijos o preguntas para revelar tu regalo especial. ¡Buena suerte!",
    startQuizBtn: "Desbloquea el Regalo",
    continueBtn: "Continuar a la Información del Acertijo",
    enterAnswerMsg: "Por favor ingresa una respuesta.",
    wrongAnswerMsg: "Respuesta incorrecta.",
    noMessage: "Has terminado el quiz, ¡pero no hay mensaje final!",
    failMessage: "No pudiste desbloquear el mensaje final.",
    questionPlaceholder: "Escribe tu respuesta...",
    submitBtn: "Enviar",
    nextRiddleBtn: "Continuar al Siguiente Acertijo",
    previousBtn: "Ir al Acertijo Anterior",
    backBtn: "Atrás",
    unknownQuiz: "Quiz Desconocido"
  },
  fr: {
    heading: "UnlockMyGift",
    intro:
      "Bienvenue sur UnlockMyGift ! Ici, vous pouvez télécharger un fichier .unlock créé avec notre Générateur " +
      "et répondre à une série d'énigmes ou de questions pour révéler votre cadeau spécial. Bonne chance!",
    startQuizBtn: "Débloquer le Cadeau",
    continueBtn: "Continuer aux Informations de l'Énigme",
    enterAnswerMsg: "Veuillez entrer une réponse.",
    wrongAnswerMsg: "Mauvaise réponse.",
    noMessage: "Vous avez terminé le quiz, mais il n'y a pas de message final!",
    failMessage: "Vous n'avez pas pu déverrouiller le message final.",
    questionPlaceholder: "Tapez votre réponse...",
    submitBtn: "Soumettre",
    nextRiddleBtn: "Continuer à l'Énigme Suivante",
    previousBtn: "Aller à l'Énigme Précédente",
    backBtn: "Retour",
    unknownQuiz: "Quiz Inconnu"
  },
  it: {
    heading: "UnlockMyGift",
    intro:
      "Benvenuto su UnlockMyGift! Qui puoi caricare un file .unlock creato con il nostro Generatore " +
      "e rispondere a una serie di indovinelli o domande per scoprire il tuo regalo speciale. Buona fortuna!",
    startQuizBtn: "Sblocca il Regalo",
    continueBtn: "Continua alle Informazioni dell'Indovinello",
    enterAnswerMsg: "Inserisci una risposta.",
    wrongAnswerMsg: "Risposta errata.",
    noMessage: "Hai completato il quiz, ma non c'è nessun messaggio finale!",
    failMessage: "Non sei riuscito a sbloccare il messaggio finale.",
    questionPlaceholder: "Scrivi la tua risposta...",
    submitBtn: "Invia",
    nextRiddleBtn: "Continua al prossimo indovinello",
    previousBtn: "Vai all'indovinello precedente",
    backBtn: "Indietro",
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
  
  // Aggiorna i pulsanti solo se esistono
  if (startQuizBtn) startQuizBtn.textContent = dict.startQuizBtn;
  if (backButtonEl) backButtonEl.textContent = dict.backBtn;
  if (continueAfterUploadBtn) continueAfterUploadBtn.textContent = dict.continueBtn;
  
  // Aggiorna i pulsanti di invio e continua nelle domande attive
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.textContent = dict.submitBtn;
  
  const nextRiddleBtn = document.getElementById('nextRiddleBtn');
  if (nextRiddleBtn) nextRiddleBtn.textContent = dict.nextRiddleBtn;
  
  const previousBtn = document.getElementById('previousBtn');
  if (previousBtn) previousBtn.textContent = dict.previousBtn;
}

// Show/hide back button based on current phase
function updateBackButton() {
  if (currentPhase > 1) {
    backButtonEl.classList.remove('hidden');
  } else {
    backButtonEl.classList.add('hidden');
  }
}
// Codice da aggiungere a generator.js e unlocker.js

function initializeLanguageDropdown() {
  // Seleziona il contenitore delle bandiere
  const langContainer = document.getElementById('langFlagsContainer'); // o langFlagsContainerUnlocker per unlocker.js
  if (!langContainer) return;
  
  // Salva tutte le bandiere
  const allFlags = Array.from(langContainer.querySelectorAll('img'));
  if (allFlags.length === 0) return;
  
  // Crea la struttura del dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'language-dropdown';
  
  // Trova la bandiera della lingua attuale
  const currentLang = localStorage.getItem('umgLangGen') || detectBrowserLang(); // usa 'umgLangView' per unlocker.js
  const currentFlag = allFlags.find(flag => flag.dataset.lang === currentLang) || allFlags[0];
  
  // Crea l'elemento per la lingua corrente
  const currentLangEl = document.createElement('img');
  currentLangEl.src = currentFlag.src;
  currentLangEl.alt = currentFlag.alt;
  currentLangEl.title = 'Select Language';
  currentLangEl.className = 'current-language';
  
  // Crea il contenitore per le opzioni
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'language-options';
  
  // Aggiungi le opzioni al contenitore
  allFlags.forEach(flag => {
    if (flag.dataset.lang !== currentLang) {
      const option = document.createElement('img');
      option.src = flag.src;
      option.alt = flag.alt;
      option.title = flag.title;
      option.dataset.lang = flag.dataset.lang;
      
      option.addEventListener('click', () => {
        // Aggiorna la lingua
        updateLanguageStringsGenerator(option.dataset.lang); // o updateLanguageStringsUnlocker per unlocker.js
        
        // Aggiorna l'interfaccia del dropdown
        currentLangEl.src = option.src;
        currentLangEl.alt = option.alt;
        
        // Nascondi le opzioni
        optionsContainer.classList.remove('show');
      });
      
      optionsContainer.appendChild(option);
    }
  });
  
  // Aggiungi listener per mostrare/nascondere le opzioni
  currentLangEl.addEventListener('click', () => {
    optionsContainer.classList.toggle('show');
  });
  
  // Chiudi il dropdown quando si clicca altrove
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      optionsContainer.classList.remove('show');
    }
  });
  
  // Assembla il dropdown
  dropdown.appendChild(currentLangEl);
  dropdown.appendChild(optionsContainer);
  
  // Sostituisci il vecchio contenitore con il nuovo dropdown
  langContainer.innerHTML = '';
  langContainer.appendChild(dropdown);
}

// Chiamare la funzione all'inizializzazione
document.addEventListener('DOMContentLoaded', initializeLanguageDropdown);

function updateContinueButton() {
  if (quizData && currentPhase === 1) {
    continueAfterUploadBtn.classList.remove('hidden');
  } else {
    continueAfterUploadBtn.classList.add('hidden');
  }
}

// Initialize i18n
updateLanguageStringsUnlocker(currentLang);
updateBackButton();
updateContinueButton();

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

async function handleFileUpload(error, file) {
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

  // Invece di passare automaticamente alla fase 2, 
  // mostriamo il pulsante per continuare
  updateContinueButton();
}

// Gestore eventi per il pulsante Continua dopo Upload
continueAfterUploadBtn.addEventListener('click', () => {
  goToQuizInfo();
});

function goToQuizInfo() {
  // Update to phase 2: Quiz info
  currentPhase = 2;
  updateBackButton();
  updateContinueButton();

  introEl.style.display = 'none';
  uploadAreaEl.style.display = 'none';
  continueAfterUploadBtn.classList.add('hidden');

  const dict = i18nDictUnlocker[currentLang];
  quizTitleEl.textContent = quizData.name || dict.unknownQuiz;
  quizDescEl.textContent = quizData.description || '';
  quizInfoEl.classList.remove('hidden');
}

startQuizBtn.addEventListener('click', () => {
  quizInfoEl.classList.add('hidden');
  currentQuestionIndex = 0;
  previousQuestionIndex = -1;
  userAnswers = [];
  currentPhase = 3;
  updateBackButton();
  showCurrentQuestion();
});

startQuizBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    startQuizBtn.click();
  }
});

// Back button functionality
backButtonEl.addEventListener('click', () => {
  if (currentPhase === 4) {
    // From final message to questions
    currentPhase = 3;
    // Torna all'ultimo indovinello
    currentQuestionIndex = quizData.questions.length - 1;
    showCurrentQuestion();
  } else if (currentPhase === 3) {
    // Se siamo al primo indovinello, torniamo alle info del quiz
    if (currentQuestionIndex === 0) {
      currentPhase = 2;
      quizContainerEl.innerHTML = '';
      quizInfoEl.classList.remove('hidden');
    } else {
      // Altrimenti torniamo all'indovinello precedente
      previousQuestionIndex = currentQuestionIndex;
      currentQuestionIndex--;
      showCurrentQuestion();
    }
  } else if (currentPhase === 2) {
    // From quiz info to upload
    currentPhase = 1;
    quizInfoEl.classList.add('hidden');
    introEl.style.display = 'block';
    uploadAreaEl.style.display = 'block';
    
    // Mostra il pulsante Continua se c'è un file caricato
    updateContinueButton();
  }
  
  updateBackButton();
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
    currentPhase = 4;
    updateBackButton();
    
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

    quizContainerEl.innerHTML = `
      <div class="final">
        ${finalMessage}
      </div>
    `;
    
    return;
  }

  // Reset the wrong attempts for this question
  wrongAttemptCountForCurrentQuestion = 0;

  const q = quizData.questions[currentQuestionIndex];
  const div = document.createElement('div');
  div.className = 'question-container';

  div.innerHTML = `
    <h2>Question ${currentQuestionIndex + 1} of ${quizData.questions.length}</h2>
    <p>${q.question}</p>
    <div id="imageGallery" class="image-gallery"></div>
    <input type="text" id="answerInput" class="answer-input" placeholder="${dict.questionPlaceholder}" />
    <button class="btn" id="submitBtn">${dict.submitBtn}</button>
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
  const submitBtn = div.querySelector('#submitBtn');
  const resultEl = div.querySelector('#result');

  submitBtn.addEventListener('click', async () => {
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
      
      // Modifica: mostra il testo corretto e pulsanti per navigare
      const buttonsHtml = currentQuestionIndex > 0 ? 
        `<div class="navigation-buttons">
          <button class="btn secondary-btn" id="previousBtn">${dict.previousBtn}</button>
          <button class="btn" id="nextRiddleBtn">${dict.nextRiddleBtn}</button>
         </div>` :
        `<button class="btn" id="nextRiddleBtn">${dict.nextRiddleBtn}</button>`;
        
      quizContainerEl.innerHTML = `
        <div class="success-message">
          <h3>${q.textIfCorrect || "Good job!"}</h3>
          ${buttonsHtml}
        </div>
      `;
      
      // Gestione pulsante precedente
      const previousBtn = quizContainerEl.querySelector('#previousBtn');
      if (previousBtn) {
        previousBtn.addEventListener('click', () => {
          previousQuestionIndex = currentQuestionIndex;
          currentQuestionIndex--;
          showCurrentQuestion();
        });
      }
      
      // Gestione pulsante successivo
      const nextRiddleBtn = quizContainerEl.querySelector('#nextRiddleBtn');
      nextRiddleBtn.addEventListener('click', () => {
        previousQuestionIndex = currentQuestionIndex;
        currentQuestionIndex++;
        showCurrentQuestion();
      });
      
      // Auto focus sul pulsante per permettere di premere Enter
      nextRiddleBtn.focus();
      
      // Aggiungi anche un listener per Enter
      nextRiddleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          nextRiddleBtn.click();
        }
      });
    } else {
      // Wrong answer => show next "wrong" message from the array, cycling
      wrongAttemptCountForCurrentQuestion++;
      resultEl.style.color = 'red';

      if (q.wrongAnswersMessages && q.wrongAnswersMessages.length > 0) {
        // Cycle through wrong answer messages
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
      submitBtn.click();
    }
  });
  
  // Auto focus on the answer input for better UX
  answerInput.focus();
}