FilePond.registerPlugin(FilePondPluginFileEncode);

let questionCount = 0;
const ponds = [];
let questionIDs = []; // Array per tenere traccia degli ID degli indovinelli

// Track the current phase of the generator process
// 1: Initial view
// 2: Form view
// 3: Questions view
// 4: Confirmation view
let currentPhase = 1;

const showFormBtn = document.getElementById('showFormBtn');
const quizForm = document.getElementById('quizForm');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const saveQuizBtn = document.getElementById('saveQuizBtn');
const questionsContainer = document.getElementById('questions');
const quizInfoContainer = document.getElementById('quizInfoContainer');
const questionAddContainer = document.getElementById('questionAddContainer');
const backButtonGen = document.getElementById('backButtonGen');
const progressIndicator = document.getElementById('progressIndicator');
const continueToQuestionsBtn = document.getElementById('continueToQuestionsBtn');
const continueToGenerateBtn = document.getElementById('continueToGenerateBtn');
const addQuestionsInfoText = document.getElementById('addQuestionsInfoText');

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
    quizNameLabel: "Quiz Name (required)",
    quizNamePlaceholder: "e.g. Birthday Mystery, Anniversary Surprise, Christmas Riddles",
    quizDescriptionLabel: "Description",
    quizDescriptionPlaceholder: "e.g. Solve these riddles to find your special birthday gift! Each answer brings you closer to the surprise.",
    finalMessageLabel: "Final Message (required)",
    finalMessagePlaceholder: "e.g. Your Amazon voucher code is XXXX-YYYY-ZZZZ or Your gift is hidden in the bedroom closet, bottom drawer!",
    addQuestionBtn: "+ Add Riddle",
    saveQuizBtn: "Save your LockedGift",
    continueBtn: "Continue",
    nextBtn: "Next Step",
    prevBtn: "Previous Step",
    backBtn: "Back",
    addQuestionsHeading: "Add Riddles",
    addQuestionsInfo: "This is where you create riddles for your gift. Each riddle should be challenging but solvable. Add as many as you like to make your gift more exciting!",
    reviewHeading: "Review Your Gift",
    generateHeading: "Generate Your LockedGift",

    questionLabel: "Riddle",
    answersLabel: "Correct Answers (comma-separated)",
    textCorrectLabel: "Text shown if correct",
    imageUploadLabel: "Upload images (optional)",
    wrongAnswersLabel: "Wrong Answers Messages (comma-separated)",

    noQuestionAlert: "You must add at least one riddle!",
    noValidQuestionAlert: "At least one riddle must have a text and a correct answer!",
    noNameAlert: "Please enter a quiz name",
    noFinalMessageAlert: "Please enter a final message",
    
    riddleWord: "Riddle",
    
    step1: "Basic Info",
    step2: "Riddles",
    step3: "Generate"
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
    quizNameLabel: "Nombre del Quiz (obligatorio)",
    quizNamePlaceholder: "p.ej. Misterio de Cumpleaños, Sorpresa de Aniversario, Acertijos de Navidad",
    quizDescriptionLabel: "Descripción",
    quizDescriptionPlaceholder: "p.ej. ¡Resuelve estos acertijos para encontrar tu regalo especial de cumpleaños! Cada respuesta te acerca más a la sorpresa.",
    finalMessageLabel: "Mensaje Final (obligatorio)",
    finalMessagePlaceholder: "p.ej. Tu código de cupón de Amazon es XXXX-YYYY-ZZZZ o ¡Tu regalo está escondido en el armario del dormitorio, en el cajón inferior!",
    addQuestionBtn: "+ Agregar Acertijo",
    saveQuizBtn: "Guardar tu LockedGift",
    continueBtn: "Continuar",
    nextBtn: "Siguiente Paso",
    prevBtn: "Paso Anterior",
    backBtn: "Atrás",
    addQuestionsHeading: "Agregar Acertijos",
    addQuestionsInfo: "Aquí es donde creas acertijos para tu regalo. Cada acertijo debe ser desafiante pero resoluble. ¡Agrega tantos como quieras para hacer tu regalo más emocionante!",
    reviewHeading: "Revisar Tu Regalo",
    generateHeading: "Generar Tu LockedGift",

    questionLabel: "Acertijo",
    answersLabel: "Respuestas correctas (separadas por comas)",
    textCorrectLabel: "Texto mostrado si es correcto",
    imageUploadLabel: "Subir imágenes (opcional)",
    wrongAnswersLabel: "Textos para respuesta errónea (separados por comas)",

    noQuestionAlert: "¡Debes agregar al menos un acertijo!",
    noValidQuestionAlert: "¡Al menos un acertijo debe tener texto y una respuesta correcta!",
    noNameAlert: "Por favor, ingrese un nombre para el quiz",
    noFinalMessageAlert: "Por favor, ingrese un mensaje final",
    
    riddleWord: "Acertijo",
    
    step1: "Información Básica",
    step2: "Acertijos",
    step3: "Generar"
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
    quizNameLabel: "Nom du Quiz (requis)",
    quizNamePlaceholder: "ex. Mystère d'Anniversaire, Surprise d'Anniversaire, Énigmes de Noël",
    quizDescriptionLabel: "Description",
    quizDescriptionPlaceholder: "ex. Résolvez ces énigmes pour trouver votre cadeau d'anniversaire spécial ! Chaque réponse vous rapproche de la surprise.",
    finalMessageLabel: "Message Final (requis)",
    finalMessagePlaceholder: "ex. Votre code de bon Amazon est XXXX-YYYY-ZZZZ ou Votre cadeau est caché dans la penderie de la chambre, dans le tiroir du bas !",
    addQuestionBtn: "+ Ajouter une Énigme",
    saveQuizBtn: "Enregistrer votre LockedGift",
    continueBtn: "Continuer",
    nextBtn: "Étape Suivante",
    prevBtn: "Étape Précédente",
    backBtn: "Retour",
    addQuestionsHeading: "Ajouter des Énigmes",
    addQuestionsInfo: "C'est ici que vous créez des énigmes pour votre cadeau. Chaque énigme doit être stimulante mais résoluble. Ajoutez-en autant que vous le souhaitez pour rendre votre cadeau plus captivant !",
    reviewHeading: "Réviser Votre Cadeau",
    generateHeading: "Générer Votre LockedGift",

    questionLabel: "Énigme",
    answersLabel: "Réponses correctes (séparées par des virgules)",
    textCorrectLabel: "Texte affiché si correct",
    imageUploadLabel: "Télécharger des images (optionnel)",
    wrongAnswersLabel: "Textes pour réponse fausse (séparés par virgules)",

    noQuestionAlert: "Vous devez ajouter au moins une énigme !",
    noValidQuestionAlert: "Au moins une énigme doit comporter du texte et une réponse correcte !",
    noNameAlert: "Veuillez saisir un nom pour le quiz",
    noFinalMessageAlert: "Veuillez saisir un message final",
    
    riddleWord: "Énigme",
    
    step1: "Informations de base",
    step2: "Énigmes",
    step3: "Générer"
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
    quizNameLabel: "Nome del Quiz (obbligatorio)",
    quizNamePlaceholder: "es. Mistero di Compleanno, Sorpresa di Anniversario, Indovinelli di Natale",
    quizDescriptionLabel: "Descrizione",
    quizDescriptionPlaceholder: "es. Risolvi questi indovinelli per trovare il tuo regalo di compleanno speciale! Ogni risposta ti avvicina alla sorpresa.",
    finalMessageLabel: "Messaggio Finale (obbligatorio)",
    finalMessagePlaceholder: "es. Il tuo codice voucher Amazon è XXXX-YYYY-ZZZZ oppure Il tuo regalo è nascosto nell'armadio della camera da letto, nel cassetto in basso!",
    addQuestionBtn: "+ Aggiungi Indovinello",
    saveQuizBtn: "Salva il tuo LockedGift",
    continueBtn: "Continua",
    nextBtn: "Passo Successivo",
    prevBtn: "Passo Precedente",
    backBtn: "Indietro",
    addQuestionsHeading: "Aggiungi Indovinelli",
    addQuestionsInfo: "Qui puoi creare indovinelli per il tuo regalo. Ogni indovinello dovrebbe essere stimolante ma risolvibile. Aggiungine quanti ne vuoi per rendere il tuo regalo più emozionante!",
    reviewHeading: "Rivedi il Tuo Regalo",
    generateHeading: "Genera il Tuo LockedGift",

    questionLabel: "Indovinello",
    answersLabel: "Risposte corrette (separate da virgola)",
    textCorrectLabel: "Testo mostrato se corretto",
    imageUploadLabel: "Carica immagini (opzionale)",
    wrongAnswersLabel: "Testi per risposta errata (separati da virgola)",

    noQuestionAlert: "Devi aggiungere almeno un indovinello!",
    noValidQuestionAlert: "Almeno un indovinello deve avere testo e una risposta corretta!",
    noNameAlert: "Inserisci un nome per il quiz",
    noFinalMessageAlert: "Inserisci un messaggio finale",
    
    riddleWord: "Indovinello",
    
    step1: "Informazioni di Base",
    step2: "Indovinelli",
    step3: "Genera"
  }
};

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

  // Safely update text content only if elements exist
  const updateElementText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  
  // Safely update placeholder only if element exists
  const updateElementPlaceholder = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = text;
  };

  updateElementText("generatorHeading", dict.generatorHeading);
  updateElementText("generatorIntro", dict.generatorIntro);
  if (showFormBtn) showFormBtn.textContent = dict.createQuizBtn;
  updateElementText("generatorAlreadyGift", dict.alreadyGift);
  updateElementText("generatorGoToUnlocker", dict.goToUnlocker);

  updateElementText("quizDetailHeading", dict.quizDetailsHeading);
  updateElementText("quizNameLabel", dict.quizNameLabel);
  updateElementPlaceholder("quizName", dict.quizNamePlaceholder);
  updateElementText("quizDescriptionLabel", dict.quizDescriptionLabel);
  updateElementPlaceholder("quizDescription", dict.quizDescriptionPlaceholder);
  updateElementText("finalMessageLabel", dict.finalMessageLabel);
  updateElementPlaceholder("finalMessage", dict.finalMessagePlaceholder);

  if (addQuestionBtn) {
    const addText = addQuestionBtn.querySelector('.add-text');
    if (addText) addText.textContent = dict.addQuestionBtn.replace('+ ', '');
  }
  if (saveQuizBtn) saveQuizBtn.textContent = dict.saveQuizBtn;
  if (backButtonGen) backButtonGen.textContent = dict.backBtn;
  
  // Update heading for add questions section
  updateElementText("addQuestionsHeading", dict.addQuestionsHeading);
  
  // Update intro text for add questions
  updateElementText("addQuestionsInfoText", dict.addQuestionsInfo);
  
  // Update heading for generate section
  updateElementText("generateHeading", dict.generateHeading);
  
  // Update progress steps
  updateElementText("step1", dict.step1);
  updateElementText("step2", dict.step2);
  updateElementText("step3", dict.step3);
  
  // Update buttons based on current phase
  if (continueToQuestionsBtn) {
    continueToQuestionsBtn.textContent = dict.nextBtn;
  }
  if (continueToGenerateBtn) {
    continueToGenerateBtn.textContent = dict.nextBtn;
  }
  
  // Update existing questions to use the translated riddle word
  document.querySelectorAll('.question-header span').forEach((span) => {
    const questionNumber = span.textContent.split(' ')[1];
    span.textContent = `${dict.riddleWord} ${questionNumber}`;
  });
}

// Show/hide back button based on current phase
function updateBackButton() {
  if (backButtonGen) {
    if (currentPhase > 1) {
      backButtonGen.classList.remove('hidden');
    } else {
      backButtonGen.classList.add('hidden');
    }
  }
}

// Update progress indicator
function updateProgressIndicator() {
  if (!progressIndicator) return;
  
  const steps = progressIndicator.querySelectorAll('.progress-step');
  steps.forEach((step, index) => {
    // Clear all active classes first
    step.classList.remove('active');
    
    // Set active based on current phase
    if (index + 1 === currentPhase) {
      step.classList.add('active');
    }
  });
}

// Funzione per rigenerare i numeri degli indovinelli
function updateRiddleNumbers() {
  const dict = i18nDictGenerator[currentLang];
  const riddleContainers = document.querySelectorAll('.question');
  
  // Aggiorna i numeri degli indovinelli
  riddleContainers.forEach((container, index) => {
    const headerSpan = container.querySelector('.question-header span');
    if (headerSpan) {
      headerSpan.textContent = `${dict.riddleWord} ${index + 1}`;
    }
  });
}

// Initialize UI state
updateLanguageStringsGenerator(currentLang);
updateBackButton();
updateProgressIndicator();

// Handle clicks on flags
if (langFlagsContainer) {
  langFlagsContainer.querySelectorAll('img').forEach(flag => {
    flag.addEventListener('click', () => {
      const lang = flag.dataset.lang;
      updateLanguageStringsGenerator(lang);
    });
  });
}

// Back button functionality
if (backButtonGen) {
  backButtonGen.addEventListener('click', () => {
    if (currentPhase === 3) {
      // From review/generate phase to questions
      currentPhase = 2;
      const generateContainer = document.getElementById('generateContainer');
      if (generateContainer) generateContainer.classList.add('hidden');
      if (questionAddContainer) questionAddContainer.classList.remove('hidden');
    } else if (currentPhase === 2) {
      // From questions to basic info
      currentPhase = 1;
      if (questionAddContainer) questionAddContainer.classList.add('hidden');
      if (quizInfoContainer) quizInfoContainer.classList.remove('hidden');
    }
    
    updateBackButton();
    updateProgressIndicator();
  });
}

// Initial "Create your Quiz" button
if (showFormBtn) {
  showFormBtn.addEventListener('click', () => {
    currentPhase = 1;
    const initialView = document.getElementById('initialView');
    if (initialView) initialView.classList.add('hidden');
    if (quizForm) quizForm.classList.remove('hidden');
    showFormBtn.style.display = 'none';
    
    updateBackButton();
    updateProgressIndicator();
  });
}

// Move from basic info to questions
if (continueToQuestionsBtn) {
  continueToQuestionsBtn.addEventListener('click', () => {
    // Validate basic info
    const quizNameEl = document.getElementById('quizName');
    const finalMessageEl = document.getElementById('finalMessage');
    const dict = i18nDictGenerator[currentLang];
    
    const name = quizNameEl ? quizNameEl.value.trim() : '';
    const finalMessage = finalMessageEl ? finalMessageEl.value.trim() : '';
    
    if (!name) {
      alert(dict.noNameAlert);
      if (quizNameEl) quizNameEl.focus();
      return;
    }
    
    if (!finalMessage) {
      alert(dict.noFinalMessageAlert);
      if (finalMessageEl) finalMessageEl.focus();
      return;
    }
    
    currentPhase = 2;
    if (quizInfoContainer) quizInfoContainer.classList.add('hidden');
    if (questionAddContainer) questionAddContainer.classList.remove('hidden');
    
    updateBackButton();
    updateProgressIndicator();
  });
}

// Move from questions to generate/review
if (continueToGenerateBtn) {
  continueToGenerateBtn.addEventListener('click', () => {
    // Validate that at least one question exists
    const questionElements = document.querySelectorAll('.question');
    if (questionElements.length === 0) {
      const dict = i18nDictGenerator[currentLang];
      alert(dict.noQuestionAlert);
      return;
    }
    
    currentPhase = 3;
    if (questionAddContainer) questionAddContainer.classList.add('hidden');
    const generateContainer = document.getElementById('generateContainer');
    if (generateContainer) generateContainer.classList.remove('hidden');
    
    updateBackButton();
    updateProgressIndicator();
  });
}

if (addQuestionBtn) {
  addQuestionBtn.addEventListener('click', addQuestion);
}

if (saveQuizBtn) {
  saveQuizBtn.addEventListener('click', downloadQuiz);
}

function addQuestion() {
  const dict = i18nDictGenerator[currentLang];

  const container = document.createElement('div');
  container.className = 'question';

  // Usa il numero della prossima posizione effettiva nell'elenco
  const questionNumber = document.querySelectorAll('.question').length + 1;

  // We add an extra field for "wrong answers messages"
  container.innerHTML = `
    <div class="question-header">
      <span>${dict.riddleWord} ${questionNumber}</span>
      <button type="button" class="remove-question-btn" data-index="${questionNumber}">×</button>
    </div>
    
    <label>${dict.questionLabel}</label>
    <input type="text" class="questionText" placeholder="e.g. What is the fastest land animal?" />

    <label>${dict.answersLabel}</label>
    <input type="text" class="correctAnswers" placeholder="e.g. cheetah, ghepardo" />

    <label>${dict.textCorrectLabel}</label>
    <input type="text" class="textCorrect" placeholder="e.g. Correct! It is the cheetah." />

    <label>${dict.wrongAnswersLabel}</label>
    <input type="text" class="wrongAnswers" placeholder="e.g. How can you not know this?, I expected better!, You failed again?" />

    <label>${dict.imageUploadLabel}</label>
    <input type="file" class="imageFiles" name="imageFiles${questionNumber}" multiple accept="image/*" />
  `;

  if (questionsContainer) {
    questionsContainer.appendChild(container);

    const input = container.querySelector('.imageFiles');
    const pond = FilePond.create(input, {
      allowMultiple: true,
      credits: false,
      labelIdle: "Drag & drop images or click to browse",
    });

    ponds.push(pond);
    questionCount++;
    
    // Add event listener for remove button
    const removeBtn = container.querySelector('.remove-question-btn');
    if (removeBtn) {
      removeBtn.addEventListener('click', function() {
        container.remove();
        // Dopo la rimozione, aggiorniamo i numeri degli indovinelli
        updateRiddleNumbers();
      });
    }
  }
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

  const nameEl = document.getElementById('quizName');
  const descriptionEl = document.getElementById('quizDescription');
  const finalMessageEl = document.getElementById('finalMessage');
  
  if (!nameEl || !descriptionEl || !finalMessageEl) {
    console.error("Required form elements not found");
    return;
  }
  
  const name = nameEl.value.trim();
  const description = descriptionEl.value.trim();
  const finalMessage = finalMessageEl.value.trim();
  
  // Verifica campi obbligatori
  if (!name) {
    alert(dict.noNameAlert);
    return;
  }
  
  if (!finalMessage) {
    alert(dict.noFinalMessageAlert);
    return;
  }

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
    const questionTextEl = qEl.querySelector('.questionText');
    const answersRawEl = qEl.querySelector('.correctAnswers');
    const textIfCorrectEl = qEl.querySelector('.textCorrect');
    const wrongAnswersRawEl = qEl.querySelector('.wrongAnswers');
    
    if (!questionTextEl || !answersRawEl || !textIfCorrectEl || !wrongAnswersRawEl) {
      console.warn(`Missing elements in ${dict.riddleWord.toLowerCase()} ${i+1}`);
      continue;
    }
    
    const questionText = questionTextEl.value.trim();
    const answersRaw = answersRawEl.value.split(',')
      .map(a => a.trim().toLowerCase())
      .filter(a => a);
    const textIfCorrect = textIfCorrectEl.value.trim();

    // The new field for wrong answers
    const wrongAnswersRaw = wrongAnswersRawEl.value.split(',')
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

    // Find the FilePond instance for this question
    let pondIndex = -1;
    for (let j = 0; j < questionElements.length; j++) {
      if (questionElements[j] === qEl) {
        pondIndex = j;
        break;
      }
    }
    
    let images = [];
    if (pondIndex >= 0 && ponds[pondIndex]) {
      const pond = ponds[pondIndex];
      const imageFiles = pond.getFiles();
      for (const f of imageFiles) {
        const base64 = f.getFileEncodeBase64String();
        images.push("data:" + f.fileType + ";base64," + base64);
      }
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
  
  // Show success message
  const generateContainer = document.getElementById('generateContainer');
  if (generateContainer) {
    // Remove any existing success messages
    const existingMsg = generateContainer.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    // Add new success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Your LockedGift file has been successfully created!';
    generateContainer.appendChild(successMessage);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.remove();
      }
    }, 5000);
  }
}