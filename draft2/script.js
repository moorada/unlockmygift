/**
 * common.js - JavaScript unificato per UnlockMyGift
 * Contiene logica comune e funzioni specifiche per Generator e Unlocker
 */

// ---------- CONFIGURAZIONI E VARIABILI INIZIALI ----------

// Registrazione plugin FilePond
FilePond.registerPlugin(FilePondPluginFileEncode);

// Dizionari traduzioni condivisi
const i18nDict = {
  en: {
    // Stringhe comuni
    heading: "UnlockMyGift",
    backBtn: "Back",

    // Generator
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
    finalMessageHeading: "Final Message",
    finalMessageInfo: "This is where you write the final message that will be revealed when all riddles are solved. This could be a code, a location where to find the gift, or any other surprise!",
    addQuestionBtn: "+ Add Riddle",
    saveQuizBtn: "Save your LockedGift",
    nextBtn: "Next Step",
    prevBtn: "Previous Step",
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
    step1: "Info",
    step2: "Riddles",
    step3: "Message",
    step4: "Generate",
    questionXofY: "Question %current% of %total%",

    // Unlocker
    unlockerIntro:
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
    unknownQuiz: "Unknown Quiz"
  },
  es: {
    // Stringhe comuni
    heading: "UnlockMyGift",
    backBtn: "Atrás",

    // Generator
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
    finalMessageHeading: "Mensaje Final",
    finalMessageInfo: "Aquí es donde escribes el mensaje final que se revelará cuando se resuelvan todos los acertijos. Puede ser un código, un lugar donde encontrar el regalo, ¡o cualquier otra sorpresa!",
    addQuestionBtn: "+ Agregar Acertijo",
    saveQuizBtn: "Guardar tu LockedGift",
    nextBtn: "Siguiente Paso",
    prevBtn: "Paso Anterior",
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
    step1: "Info",
    step2: "Acertijos",
    step3: "Mensaje",
    step4: "Generar",
    questionXofY: "Pregunta %current% de %total%",

    // Unlocker
    unlockerIntro:
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
    unknownQuiz: "Quiz Desconocido"
  },
  fr: {
    // Stringhe comuni
    heading: "UnlockMyGift",
    backBtn: "Retour",

    // Generator
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
    finalMessageHeading: "Message Final",
    finalMessageInfo: "C'est ici que vous écrivez le message final qui sera révélé lorsque toutes les énigmes seront résolues. Il peut s'agir d'un code, d'un lieu où trouver le cadeau, ou de toute autre surprise !",
    addQuestionBtn: "+ Ajouter une Énigme",
    saveQuizBtn: "Enregistrer votre LockedGift",
    nextBtn: "Étape Suivante",
    prevBtn: "Étape Précédente",
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
    step1: "Info",
    step2: "Énigmes",
    step3: "Message",
    step4: "Générer",
    questionXofY: "Question %current% sur %total%",

    // Unlocker
    unlockerIntro:
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
    unknownQuiz: "Quiz Inconnu"
  },
  it: {
    // Stringhe comuni
    heading: "UnlockMyGift",
    backBtn: "Indietro",

    // Generator
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
    finalMessageHeading: "Messaggio Finale",
    finalMessageInfo: "Qui scrivi il messaggio finale che verrà rivelato quando tutti gli indovinelli saranno risolti. Potrebbe essere un codice, un luogo dove trovare il regalo o qualsiasi altra sorpresa!",
    addQuestionBtn: "+ Aggiungi Indovinello",
    saveQuizBtn: "Salva il tuo LockedGift",
    nextBtn: "Passo Successivo",
    prevBtn: "Passo Precedente",
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
    step1: "Info",
    step2: "Indovinelli",
    step3: "Messaggio",
    step4: "Genera",
    questionXofY: "Domanda %current% di %total%",

    // Unlocker
    unlockerIntro:
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
    unknownQuiz: "Quiz Sconosciuto"
  }
};

// ---------- FUNZIONI COMUNI ----------

/**
 * Rileva la lingua del browser
 */
function detectBrowserLang() {
  const lang = navigator.language.slice(0, 2).toLowerCase();
  if (["en", "es", "fr", "it"].includes(lang)) {
    return lang;
  }
  return "en";
}

/**
 * Mostra/nasconde il pulsante back
 */
function updateBackButton(backButtonEl, currentPhase) {
  if (!backButtonEl) return;

  if (currentPhase > 1) {
    backButtonEl.classList.remove('hidden');
  } else {
    backButtonEl.classList.add('hidden');
  }
}

/**
 * Funzione SHA-256 (crittografia)
 */
async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Inizializza il selettore di lingua a tendina
 */
function initializeLanguageDropdown(containerId, updateFunction, storageKey) {
  // Seleziona il contenitore delle bandiere
  const langContainer = document.getElementById(containerId);
  if (!langContainer) return;

  // Salva tutte le bandiere originali
  const allFlagsOriginal = Array.from(langContainer.querySelectorAll('img'));
  if (allFlagsOriginal.length === 0) return;

  // Crea la struttura del dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'language-dropdown';

  // Trova la bandiera della lingua attuale
  const currentLang = localStorage.getItem(storageKey) || detectBrowserLang();
  const currentFlag = allFlagsOriginal.find(flag => flag.dataset.lang === currentLang) || allFlagsOriginal[0];

  // Crea l'elemento per la lingua corrente
  const currentLangEl = document.createElement('img');
  currentLangEl.src = currentFlag.src;
  currentLangEl.alt = currentFlag.alt;
  currentLangEl.title = 'Select Language';
  currentLangEl.className = 'current-language';
  currentLangEl.dataset.lang = currentFlag.dataset.lang;

  // Crea il contenitore per le opzioni
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'language-options';

  // Funzione per aggiornare le opzioni del menu
  function updateOptions() {
    // Svuota le opzioni attuali
    optionsContainer.innerHTML = '';

    // Aggiungi tutte le lingue tranne quella corrente
    allFlagsOriginal.forEach(flag => {
      if (flag.dataset.lang !== currentLangEl.dataset.lang) {
        const option = document.createElement('img');
        option.src = flag.src;
        option.alt = flag.alt;
        option.title = flag.title;
        option.dataset.lang = flag.dataset.lang;

        option.addEventListener('click', () => {
          // Aggiorna la lingua
          updateFunction(option.dataset.lang);

          // Aggiorna l'interfaccia del dropdown
          currentLangEl.src = option.src;
          currentLangEl.alt = option.alt;
          currentLangEl.dataset.lang = option.dataset.lang;

          // Aggiorna le opzioni
          updateOptions();

          // Nascondi le opzioni
          optionsContainer.classList.remove('show');
        });

        optionsContainer.appendChild(option);
      }
    });
  }

  // Inizializza le opzioni
  updateOptions();

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

// ---------- FUNZIONI CRITTOGRAFICHE COMUNI ----------

/**
 * Encrypta dati con una chiave
 */
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

/**
 * Decrypta dati con una chiave
 */
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

/**
 * Decrypta i dati del quiz
 */
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

/**
 * Encrypta i dati del quiz
 */
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

/**
 * Prodotto cartesiano di array (per combinazioni di risposte)
 */
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

// ---------- LOGICA SPECIFICA PER IL GENERATOR ----------

// Questo codice si attiva solo quando è caricata la pagina Generator
document.addEventListener('DOMContentLoaded', function () {
  // Verifica se siamo nella pagina Generator controllando un elemento specifico
  const isGeneratorPage = document.getElementById('quizForm') || document.getElementById('generatorHeading');

  if (isGeneratorPage) {
    initializeGenerator();
  }
});

function initializeGenerator() {
  console.log("Initializing Generator...");

  let questionCount = 0;
  const ponds = [];
  let currentPhase = 1; // Inizia dalla fase 1

  // Riferimenti agli elementi DOM
  const showFormBtn = document.getElementById('showFormBtn');
  const quizForm = document.getElementById('quizForm');
  const addQuestionBtn = document.getElementById('addQuestionBtn');
  const saveQuizBtn = document.getElementById('saveQuizBtn');
  const questionsContainer = document.getElementById('questions');
  const quizInfoContainer = document.getElementById('quizInfoContainer');
  const questionAddContainer = document.getElementById('questionAddContainer');
  const finalMessageContainer = document.getElementById('finalMessageContainer'); // Nuovo container
  const backButtonGen = document.getElementById('backButtonGen');
  const progressIndicator = document.getElementById('progressIndicator');
  const continueToQuestionsBtn = document.getElementById('continueToQuestionsBtn');
  const continueToFinalBtn = document.getElementById('continueToFinalBtn'); // Nuovo pulsante
  const continueToGenerateBtn = document.getElementById('continueToGenerateBtn');

  // Inizializzazione selettore lingua
  let currentLang = localStorage.getItem('umgLangGen') || detectBrowserLang();

  // Inizializza il dropdown della lingua
  initializeLanguageDropdown('langFlagsContainer', updateLanguageStringsGenerator, 'umgLangGen');

  // Aggiorna le stringhe in base alla lingua attuale
  updateLanguageStringsGenerator(currentLang);

  // Aggiorna stato UI iniziale
  updateBackButton(backButtonGen, currentPhase);
  updateProgressIndicator();

  // Gestori eventi
  if (showFormBtn) {
    showFormBtn.addEventListener('click', () => {
      currentPhase = 1;
      const initialView = document.getElementById('initialView');
      if (initialView) initialView.classList.add('hidden');
      if (quizForm) quizForm.classList.remove('hidden');
      showFormBtn.style.display = 'none';

      updateBackButton(backButtonGen, currentPhase);
      updateProgressIndicator();
    });
  }

  if (backButtonGen) {
    backButtonGen.addEventListener('click', () => {
      if (currentPhase === 4) {
        // Da generazione a messaggio finale
        currentPhase = 3;
        const generateContainer = document.getElementById('generateContainer');
        if (generateContainer) generateContainer.classList.add('hidden');
        if (finalMessageContainer) finalMessageContainer.classList.remove('hidden');
      } else if (currentPhase === 3) {
        // Da messaggio finale a domande
        currentPhase = 2;
        if (finalMessageContainer) finalMessageContainer.classList.add('hidden');
        if (questionAddContainer) questionAddContainer.classList.remove('hidden');
      } else if (currentPhase === 2) {
        // Da domande a info di base
        currentPhase = 1;
        if (questionAddContainer) questionAddContainer.classList.add('hidden');
        if (quizInfoContainer) quizInfoContainer.classList.remove('hidden');
      }

      updateBackButton(backButtonGen, currentPhase);
      updateProgressIndicator();
    });
  }

  if (continueToQuestionsBtn) {
    continueToQuestionsBtn.addEventListener('click', () => {
      // Convalida i dati base
      const quizNameEl = document.getElementById('quizName');
      const dict = i18nDict[currentLang];

      const name = quizNameEl ? quizNameEl.value.trim() : '';

      if (!name) {
        alert(dict.noNameAlert);
        if (quizNameEl) quizNameEl.focus();
        return;
      }

      currentPhase = 2;
      if (quizInfoContainer) quizInfoContainer.classList.add('hidden');
      if (questionAddContainer) questionAddContainer.classList.remove('hidden');

      updateBackButton(backButtonGen, currentPhase);
      updateProgressIndicator();
    });
  }

  if (continueToFinalBtn) {
    continueToFinalBtn.addEventListener('click', () => {
      // Controlla che ci sia almeno una domanda
      if (questionCount === 0) {
        const dict = i18nDict[currentLang];
        alert(dict.noQuestionAlert);
        return;
      }

      currentPhase = 3;
      if (questionAddContainer) questionAddContainer.classList.add('hidden');
      if (finalMessageContainer) finalMessageContainer.classList.remove('hidden');

      updateBackButton(backButtonGen, currentPhase);
      updateProgressIndicator();
    });
  }

  if (continueToGenerateBtn) {
    continueToGenerateBtn.addEventListener('click', () => {
      // Verifica il messaggio finale
      const finalMessageEl = document.getElementById('finalMessage');
      const dict = i18nDict[currentLang];

      const finalMessage = finalMessageEl ? finalMessageEl.value.trim() : '';

      if (!finalMessage) {
        alert(dict.noFinalMessageAlert);
        if (finalMessageEl) finalMessageEl.focus();
        return;
      }

      currentPhase = 4;
      if (finalMessageContainer) finalMessageContainer.classList.add('hidden');
      const generateContainer = document.getElementById('generateContainer');
      if (generateContainer) generateContainer.classList.remove('hidden');

      updateBackButton(backButtonGen, currentPhase);
      updateProgressIndicator();
    });
  }

  if (addQuestionBtn) {
    addQuestionBtn.addEventListener('click', () => {
      addQuestion();
    });
  }

  if (saveQuizBtn) {
    saveQuizBtn.addEventListener('click', async () => {
      await downloadQuiz();
    });
  }

  /**
   * Aggiorna l'indicatore di progresso
   */
  function updateProgressIndicator() {
    if (!progressIndicator) return;

    const steps = progressIndicator.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
      step.classList.remove('active');

      if (index + 1 === currentPhase) {
        step.classList.add('active');
      }
    });
  }

  /**
   * Funzione per aggiungere un nuovo indovinello
   */
  function addQuestion() {
    const dict = i18nDict[currentLang];

    const container = document.createElement('div');
    container.className = 'question';

    // Ottieni il prossimo numero effettivo (basato sul conteggio attuale)
    const questionNumber = document.querySelectorAll('.question').length + 1;

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

      // Gestione del pulsante rimuovi
      const removeBtn = container.querySelector('.remove-question-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', function () {
          container.remove();

          // Aggiorna i numeri di tutti gli indovinelli
          updateRiddleNumbers();
        });
      }
    }
  }

  /**
   * Aggiorna i numeri degli indovinelli
   */
  function updateRiddleNumbers() {
    const dict = i18nDict[currentLang];
    const riddleContainers = document.querySelectorAll('.question');

    // Aggiorna i numeri degli indovinelli
    riddleContainers.forEach((container, index) => {
      const headerSpan = container.querySelector('.question-header span');
      if (headerSpan) {
        headerSpan.textContent = `${dict.riddleWord} ${index + 1}`;
      }
    });
  }

  /**
   * Scarica il quiz come file .unlock
   */
  async function downloadQuiz() {
    const dict = i18nDict[currentLang];

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

    // Verifica campo obbligatori
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

    // Raccogliamo le possibili risposte corrette per generare chiavi multiple
    const correctAnswersMatrix = [];

    for (let i = 0; i < questionElements.length; i++) {
      const qEl = questionElements[i];
      const questionTextEl = qEl.querySelector('.questionText');
      const answersRawEl = qEl.querySelector('.correctAnswers');
      const textIfCorrectEl = qEl.querySelector('.textCorrect');
      const wrongAnswersRawEl = qEl.querySelector('.wrongAnswers');

      if (!questionTextEl || !answersRawEl || !textIfCorrectEl || !wrongAnswersRawEl) {
        console.warn(`Missing elements in ${dict.riddleWord.toLowerCase()} ${i + 1}`);
        continue;
      }

      const questionText = questionTextEl.value.trim();
      const answersRaw = answersRawEl.value.split(',')
        .map(a => a.trim().toLowerCase())
        .filter(a => a);
      const textIfCorrect = textIfCorrectEl.value.trim();

      // Array di messaggi per risposte errate
      const wrongAnswersRaw = wrongAnswersRawEl.value.split(',')
        .map(a => a.trim())
        .filter(a => a);

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

      // Trova l'istanza FilePond per questa domanda
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
        wrongAnswersMessages: wrongAnswersRaw
      });

      correctAnswersMatrix.push(answersRaw);
    }

    if (!validQuestionExists) {
      alert(dict.noValidQuestionAlert);
      return;
    }

    // Crea array di messaggi finali criptati
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

    const encryptionKey = "UnlockMyGiftSuperSecretKey";
    const encrypted = await encryptData(quizData, encryptionKey);

    // Preparazione file
    const fileContent = `# Welcome to the official UnlockMyGift puzzle!
# Load this file at https://moorada.github.io/unlockmygift/unlocker.html and prepare for a thrilling challenge!
` + JSON.stringify(encrypted);

    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "locked_gift.unlock";
    link.click();

    // Mostra conferma
    const generateContainer = document.getElementById('generateContainer');
    if (generateContainer) {
      const existingMsg = generateContainer.querySelector('.success-message');
      if (existingMsg) existingMsg.remove();

      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Your LockedGift file has been successfully created!';
      generateContainer.appendChild(successMessage);

      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.remove();
        }
      }, 5000);
    }
  }

  /**
   * Aggiorna le stringhe localizzate del Generator
   */
  function updateLanguageStringsGenerator(lang) {
    currentLang = lang;
    localStorage.setItem('umgLangGen', lang);

    const dict = i18nDict[lang];

    // Funzione di supporto per aggiornare il testo
    const updateElementText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    // Funzione di supporto per aggiornare i placeholder
    const updateElementPlaceholder = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.placeholder = text;
    };

    // Aggiorna intestazioni e descrizioni
    updateElementText("generatorHeading", dict.generatorHeading);
    updateElementText("generatorIntro", dict.generatorIntro);
    if (showFormBtn) showFormBtn.textContent = dict.createQuizBtn;
    updateElementText("generatorAlreadyGift", dict.alreadyGift);
    updateElementText("generatorGoToUnlocker", dict.goToUnlocker);

    // Aggiorna le sezioni del form
    updateElementText("quizDetailHeading", dict.quizDetailsHeading);
    updateElementText("quizNameLabel", dict.quizNameLabel);
    updateElementPlaceholder("quizName", dict.quizNamePlaceholder);
    updateElementText("quizDescriptionLabel", dict.quizDescriptionLabel);
    updateElementPlaceholder("quizDescription", dict.quizDescriptionPlaceholder);
    updateElementText("finalMessageLabel", dict.finalMessageLabel);
    updateElementPlaceholder("finalMessage", dict.finalMessagePlaceholder);

    // Aggiorna bottoni
    if (addQuestionBtn) {
      const addText = addQuestionBtn.querySelector('.add-text');
      if (addText) addText.textContent = dict.addQuestionBtn.replace('+ ', '');
    }
    if (saveQuizBtn) saveQuizBtn.textContent = dict.saveQuizBtn;
    if (backButtonGen) backButtonGen.textContent = dict.backBtn;

    // Aggiorna intestazioni e descrizioni delle sezioni
    updateElementText("addQuestionsHeading", dict.addQuestionsHeading);
    updateElementText("addQuestionsInfoText", dict.addQuestionsInfo);
    updateElementText("finalMessageHeading", dict.finalMessageHeading || "Final Message");
    updateElementText("finalMessageInfoText", dict.finalMessageInfo || "This is where you write the final message that will be revealed when all riddles are solved.");
    updateElementText("generateHeading", dict.generateHeading);

    // Aggiorna indicatori di progresso
    updateElementText("step1", dict.step1);
    updateElementText("step2", dict.step2);
    updateElementText("step3", dict.step3 || "Message");
    updateElementText("step4", dict.step4 || "Generate");

    // Aggiorna pulsanti di navigazione
    if (continueToQuestionsBtn) continueToQuestionsBtn.textContent = dict.nextBtn;
    if (continueToFinalBtn) continueToFinalBtn.textContent = dict.nextBtn;
    if (continueToGenerateBtn) continueToGenerateBtn.textContent = dict.nextBtn;

    // Aggiorna i numeri degli indovinelli
    const questionHeaders = document.querySelectorAll('.question-header span');
    questionHeaders.forEach((span) => {
      const questionNumber = span.textContent.split(' ')[1];
      span.textContent = `${dict.riddleWord} ${questionNumber}`;
    });
  }
}

// ---------- LOGICA SPECIFICA PER L'UNLOCKER ----------

// Questo codice si attiva solo quando è caricata la pagina Unlocker
document.addEventListener('DOMContentLoaded', function () {
  // Verifica se siamo nella pagina Unlocker controllando un elemento specifico
  const isUnlockerPage = document.getElementById('quizInfo') || document.getElementById('unlockerHeading');

  if (isUnlockerPage) {
    initializeUnlocker();
  }
});

function initializeUnlocker() {
  console.log("Initializing Unlocker...");

  // Variabili di stato
  let quizData = null;
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let previousQuestionIndex = -1;
  let wrongAttemptCountForCurrentQuestion = 0;
  let currentPhase = 1;

  // Riferimenti DOM
  const introEl = document.getElementById('unlockerIntro');
  const uploadAreaEl = document.getElementById('uploadArea');
  const quizInfoEl = document.getElementById('quizInfo');
  const quizTitleEl = document.getElementById('quizTitle');
  const quizDescEl = document.getElementById('quizDesc');
  const startQuizBtn = document.getElementById('startQuizBtn');
  const quizContainerEl = document.getElementById('quizContainer');
  const backButtonEl = document.getElementById('backButton');
  const continueAfterUploadBtn = document.getElementById('continueAfterUploadBtn');

  // Inizializzazione selettore lingua
  let currentLang = localStorage.getItem('umgLangView') || detectBrowserLang();

  // Inizializza il dropdown della lingua
  initializeLanguageDropdown('langFlagsContainerUnlocker', updateLanguageStringsUnlocker, 'umgLangView');

  // Inizializzazione di FilePond con ritardo per assicurarsi che gli stili siano caricati
  let pond;
  const fileInputElement = document.getElementById('fileInput');
  if (fileInputElement) {
    // Inizializziamo FilePond
    pond = FilePond.create(fileInputElement, {
      allowMultiple: false,
      labelIdle: 'Drag & drop .unlock file or click to browse',
      credits: false,
      allowFileEncode: true,
      instantUpload: false
    });

    // Registriamo l'evento di aggiunta file
    pond.on('addfile', handleFileUpload);
  }

  // Aggiorna stringhe e stato UI iniziale
  updateLanguageStringsUnlocker(currentLang);
  updateBackButton(backButtonEl, currentPhase);
  updateContinueButton();

  /**
   * Gestisce l'upload del file .unlock
   */
  async function handleFileUpload(error, file) {
    if (error) {
      console.error('FilePond addfile error:', error);
      return;
    }

    if (!file || !file.getFileEncodeBase64String) return;

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

    // Mostra pulsante continua invece di procedere automaticamente
    updateContinueButton();
  }

  /**
   * Mostra/nasconde il pulsante di continuazione dopo l'upload
   */
  function updateContinueButton() {
    if (!continueAfterUploadBtn) return;

    if (quizData && currentPhase === 1) {
      continueAfterUploadBtn.classList.remove('hidden');
    } else {
      continueAfterUploadBtn.classList.add('hidden');
    }
  }

  // Gestore eventi per il pulsante Continua dopo Upload
  if (continueAfterUploadBtn) {
    continueAfterUploadBtn.addEventListener('click', () => {
      goToQuizInfo();
    });
  }

  /**
   * Passa alla pagina di informazioni del quiz
   */
  function goToQuizInfo() {
    if (!quizData) return;

    currentPhase = 2;
    updateBackButton(backButtonEl, currentPhase);
    updateContinueButton();

    introEl.style.display = 'none';
    uploadAreaEl.style.display = 'none';
    continueAfterUploadBtn.classList.add('hidden');

    const dict = i18nDict[currentLang];
    quizTitleEl.textContent = quizData.name || dict.unknownQuiz;
    quizDescEl.textContent = quizData.description || '';
    quizInfoEl.classList.remove('hidden');
  }

  // Gestione pulsante "Sblocca il regalo"
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      quizInfoEl.classList.add('hidden');
      currentQuestionIndex = 0;
      previousQuestionIndex = -1;
      userAnswers = [];
      currentPhase = 3;
      updateBackButton(backButtonEl, currentPhase);
      showCurrentQuestion();
    });

    startQuizBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        startQuizBtn.click();
      }
    });
  }

  // Gestione pulsante "Back"
  if (backButtonEl) {
    backButtonEl.addEventListener('click', () => {
      if (currentPhase === 4) {
        // Dal messaggio finale all'ultimo indovinello
        currentPhase = 3;
        currentQuestionIndex = quizData.questions.length - 1;
        showCurrentQuestion();
      } else if (currentPhase === 3) {
        // Se primo indovinello, torna alle info quiz
        if (currentQuestionIndex === 0) {
          currentPhase = 2;
          quizContainerEl.innerHTML = '';
          quizInfoEl.classList.remove('hidden');
        } else {
          // Altrimenti torna all'indovinello precedente
          previousQuestionIndex = currentQuestionIndex;
          currentQuestionIndex--;
          showCurrentQuestion();
        }
      } else if (currentPhase === 2) {
        // Dalle info quiz all'upload
        currentPhase = 1;
        quizInfoEl.classList.add('hidden');
        introEl.style.display = 'block';
        uploadAreaEl.style.display = 'block';

        updateContinueButton();
      }

      updateBackButton(backButtonEl, currentPhase);
    });
  }

  /**
   * Mostra l'indovinello corrente
   */
  async function showCurrentQuestion() {
    const dict = i18nDict[currentLang];
    quizContainerEl.innerHTML = '';

    if (!quizData) {
      quizContainerEl.innerHTML = '<p>Please upload a .unlock file first.</p>';
      return;
    }

    // Verifica se abbiamo terminato gli indovinelli e dobbiamo mostrare il messaggio finale
    if (currentQuestionIndex >= quizData.questions.length) {
      currentPhase = 4;
      updateBackButton(backButtonEl, currentPhase);

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
            // Passa alla prossima combinazione
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

    // Reset dei tentativi falliti per questo indovinello
    wrongAttemptCountForCurrentQuestion = 0;

    const q = quizData.questions[currentQuestionIndex];
    const div = document.createElement('div');
    div.className = 'question-container';

    // Usa la traduzione per "Question X of Y"
    const questionXofY = dict.questionXofY
      .replace('%current%', currentQuestionIndex + 1)
      .replace('%total%', quizData.questions.length);

    div.innerHTML = `
      <h2>${questionXofY}</h2>
      <p>${q.question}</p>
      <div id="imageGallery" class="image-gallery"></div>
      <input type="text" id="answerInput" class="answer-input" placeholder="${dict.questionPlaceholder}" />
      <button class="btn" id="submitBtn">${dict.submitBtn}</button>
      <div class="result" id="result"></div>
    `;

    quizContainerEl.appendChild(div);

    // Visualizza immagini se presenti
    if (q.images && Array.isArray(q.images) && q.images.length > 0) {
      const galleryDiv = div.querySelector('#imageGallery');

      // Assicurati che le immagini mantengano l'ordine originale
      q.images.forEach((img) => {
        const a = document.createElement('a');
        a.href = img;
        a.dataset.src = img;
        const imageEl = document.createElement('img');
        imageEl.src = img;
        imageEl.className = 'responsive-image'; // Aggiungi una classe per gestirla con CSS
        a.appendChild(imageEl);
        galleryDiv.appendChild(a);
      });

      // Inizializza LightGallery se disponibile
      if (typeof lightGallery === 'function') {
        lightGallery(galleryDiv, {
          plugins: typeof lgZoom !== 'undefined' ? [lgZoom] : [],
          zoom: true,
          licenseKey: '0000-0000-000-0000',
          speed: 300,
        });
      }
    }

    const answerInput = div.querySelector('#answerInput');
    const submitBtn = div.querySelector('#submitBtn');
    const resultEl = div.querySelector('#result');

    // Gestione pulsante submit
    submitBtn.addEventListener('click', async () => {
      const answer = answerInput.value.trim().toLowerCase();
      if (!answer) {
        resultEl.style.color = 'var(--primary)';
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

        // Mostra messaggio di successo e pulsanti di navigazione
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

        // Gestione navigazione indietro
        const previousBtn = quizContainerEl.querySelector('#previousBtn');
        if (previousBtn) {
          previousBtn.addEventListener('click', () => {
            previousQuestionIndex = currentQuestionIndex;
            currentQuestionIndex--;
            showCurrentQuestion();
          });
        }

        // Gestione navigazione avanti
        const nextRiddleBtn = quizContainerEl.querySelector('#nextRiddleBtn');
        nextRiddleBtn.addEventListener('click', () => {
          previousQuestionIndex = currentQuestionIndex;
          currentQuestionIndex++;
          showCurrentQuestion();
        });

        // Focus sul pulsante avanti
        nextRiddleBtn.focus();

        // Aggiungi supporto per tasto Enter
        nextRiddleBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            nextRiddleBtn.click();
          }
        });
      } else {
        // Risposta sbagliata: mostra prossimo messaggio di errore
        wrongAttemptCountForCurrentQuestion++;
        resultEl.style.color = 'var(--error)';

        if (q.wrongAnswersMessages && q.wrongAnswersMessages.length > 0) {
          // Cicla tra i messaggi di errore
          const idx = (wrongAttemptCountForCurrentQuestion - 1) % q.wrongAnswersMessages.length;
          resultEl.textContent = q.wrongAnswersMessages[idx];
        } else {
          // Fallback se non ci sono messaggi personalizzati
          resultEl.textContent = dict.wrongAnswerMsg;
        }
      }
    });

    // Supporto per premere Enter nell'input
    answerInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.click();
      }
    });

    // Auto focus sull'input per migliore UX
    answerInput.focus();
  }

  /**
   * Aggiorna le stringhe localizzate dell'Unlocker
   */
  function updateLanguageStringsUnlocker(lang) {
    currentLang = lang;
    localStorage.setItem('umgLangView', lang);

    const dict = i18nDict[lang];

    // Aggiorna elementi base
    const updateElementText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    updateElementText('unlockerHeading', dict.heading);
    if (introEl) introEl.textContent = dict.unlockerIntro;

    // Aggiorna pulsanti
    if (startQuizBtn) startQuizBtn.textContent = dict.startQuizBtn;
    if (backButtonEl) backButtonEl.textContent = dict.backBtn;
    if (continueAfterUploadBtn) continueAfterUploadBtn.textContent = dict.continueBtn;

    // Aggiorna pulsanti attivi
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.textContent = dict.submitBtn;

    const nextRiddleBtn = document.getElementById('nextRiddleBtn');
    if (nextRiddleBtn) nextRiddleBtn.textContent = dict.nextRiddleBtn;

    const previousBtn = document.getElementById('previousBtn');
    if (previousBtn) previousBtn.textContent = dict.previousBtn;
  }
}