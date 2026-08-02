import { WORD_PAIRS } from './data/words.js';
import { SENTENCE_QUESTIONS } from './data/sentences.js';
import { RULE_TEST_QUESTIONS } from './data/ruleTests.js';
import { PUNCTUATION_QUESTIONS } from './data/punctuationData.js';
import { PARAGRAPH_PUNCTUATION_QUESTIONS } from './data/paragraphPunctuationData.js';
import { soundManager } from './services/audio.js';
import { LeaderboardService } from './services/leaderboard.js';

// Uygulama Durumu (State)
const state = {
  user: null,
  activeMode: null, // 'words', 'sentences', 'rules', 'punctuation', 'paragraph_punctuation'
  currentQuestionIndex: 0,
  questions: [],
  score: 0,
  streak: 0,
  correctCount: 0,
  wrongCount: 0,
  timer: null,
  timeLeft: 20, // Paragraf modu için 20s
  isAnswered: false,
  soundEnabled: true
};

// DOM Elemanları
const el = {
  nicknameModal: document.getElementById('nicknameModal'),
  nicknameInput: document.getElementById('nicknameInput'),
  wolfAdminAuthBox: document.getElementById('wolfAdminAuthBox'),
  wolfPasswordInput: document.getElementById('wolfPasswordInput'),
  avatarGrid: document.getElementById('avatarGrid'),
  saveNicknameBtn: document.getElementById('saveNicknameBtn'),
  userDisplay: document.getElementById('userDisplay'),
  userAvatarDisplay: document.getElementById('userAvatarDisplay'),
  userNickDisplay: document.getElementById('userNickDisplay'),
  changeUserBtn: document.getElementById('changeUserBtn'),
  
  modeSelectSection: document.getElementById('modeSelectSection'),
  gameSection: document.getElementById('gameSection'),
  resultSection: document.getElementById('resultSection'),
  
  leaderboardModal: document.getElementById('leaderboardModal'),
  leaderboardBtn: document.getElementById('leaderboardBtn'),
  closeLeaderboardBtn: document.getElementById('closeLeaderboardBtn'),
  leaderboardList: document.getElementById('leaderboardList'),

  commentsModal: document.getElementById('commentsModal'),
  commentsBtn: document.getElementById('commentsBtn'),
  closeCommentsBtn: document.getElementById('closeCommentsBtn'),
  commentInput: document.getElementById('commentInput'),
  sendCommentBtn: document.getElementById('sendCommentBtn'),
  commentsList: document.getElementById('commentsList'),

  mistakesModal: document.getElementById('mistakesModal'),
  mistakesBtn: document.getElementById('mistakesBtn'),
  closeMistakesBtn: document.getElementById('closeMistakesBtn'),
  clearMistakesBtn: document.getElementById('clearMistakesBtn'),
  mistakesList: document.getElementById('mistakesList'),
  viewMistakesResultBtn: document.getElementById('viewMistakesResultBtn'),
  
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  tdkGuideBtn: document.getElementById('tdkGuideBtn'),
  tdkGuideModal: document.getElementById('tdkGuideModal'),
  closeTdkGuideBtn: document.getElementById('closeTdkGuideBtn'),
  guideTabSpelling: document.getElementById('guideTabSpelling'),
  guideTabPunctuation: document.getElementById('guideTabPunctuation'),
  spellingGuideContent: document.getElementById('spellingGuideContent'),
  punctuationGuideContent: document.getElementById('punctuationGuideContent'),
  
  // Oyun içi elemanlar
  modeTitleDisplay: document.getElementById('modeTitleDisplay'),
  scoreDisplay: document.getElementById('scoreDisplay'),
  streakDisplay: document.getElementById('streakDisplay'),
  timerDisplay: document.getElementById('timerDisplay'),
  progressBar: document.getElementById('progressBar'),
  
  gameContainer: document.getElementById('gameContainer'),
  explanationBox: document.getElementById('explanationBox'),
  answerFeedbackStatus: document.getElementById('answerFeedbackStatus'),
  explanationText: document.getElementById('explanationText'),
  nextQuestionBtn: document.getElementById('nextQuestionBtn'),
  
  // Sonuç ekranı
  finalScoreDisplay: document.getElementById('finalScoreDisplay'),
  finalAccuracyDisplay: document.getElementById('finalAccuracyDisplay'),
  finalCorrectDisplay: document.getElementById('finalCorrectDisplay'),
  finalWrongDisplay: document.getElementById('finalWrongDisplay'),
  restartGameBtn: document.getElementById('restartGameBtn'),
  homeBtn: document.getElementById('homeBtn')
};

let selectedAvatar = '🎓';

// Başlatma
function init() {
  soundManager.init();
  setupEventListeners();
  checkUser();
  updateSoundIcon();
}

function checkUser() {
  state.user = LeaderboardService.getCurrentUser();
  if (!state.user || !state.user.nickname) {
    showNicknameModal();
  } else {
    hideNicknameModal();
    updateUserHeader();
  }
}

function showNicknameModal() {
  el.nicknameModal.classList.remove('hidden');
  el.nicknameModal.classList.add('flex');
}

function hideNicknameModal() {
  el.nicknameModal.classList.add('hidden');
  el.nicknameModal.classList.remove('flex');
}

function updateUserHeader() {
  if (state.user) {
    el.userAvatarDisplay.textContent = state.user.avatar || '🎓';
    let nickText = state.user.nickname;
    if (state.user.isAdmin) {
      nickText = `👑 ${nickText}`;
    }
    el.userNickDisplay.textContent = nickText;
    el.userDisplay.classList.remove('hidden');
  }
}

function setupEventListeners() {
  // Avatar Seçimi
  const avatarButtons = el.avatarGrid.querySelectorAll('.avatar-opt');
  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      soundManager.playClick();
      avatarButtons.forEach(b => b.classList.remove('border-cyan-400', 'bg-cyan-950/40'));
      btn.classList.add('border-cyan-400', 'bg-cyan-950/40');
      selectedAvatar = btn.dataset.avatar;
    });
  });

  // WOLF Nickname Dinleme
  el.nicknameInput.addEventListener('input', () => {
    const val = el.nicknameInput.value.trim().toUpperCase();
    if (val === 'WOLF') {
      el.wolfAdminAuthBox.classList.remove('hidden');
    } else {
      el.wolfAdminAuthBox.classList.add('hidden');
    }
  });

  // Nickname Kaydet
  el.saveNicknameBtn.addEventListener('click', () => {
    const nick = el.nicknameInput.value.trim();
    if (!nick) {
      alert('Lütfen geçerli bir kullanıcı adı (nickname) giriniz!');
      return;
    }

    const isWolf = nick.toUpperCase() === 'WOLF';
    let isAdmin = false;

    if (isWolf) {
      const pwd = el.wolfPasswordInput.value.trim();
      if (!LeaderboardService.verifyWolfAdminPassword(pwd)) {
        soundManager.playWrong();
        alert('❌ Hatalı Admin Şifresi! WOLF rumuzu şifre ile korunmaktadır. Doğru şifre girmeden bu rumuz kullanılamaz.');
        return;
      }
      isAdmin = true;
      alert('👑 Tebrikler WOLF! Admin yetkileri aktif edildi. Yorumları ve skorları silme yetkiniz bulunmaktadır.');
    }

    soundManager.playClick();
    state.user = LeaderboardService.saveCurrentUser(nick, selectedAvatar, isAdmin);
    updateUserHeader();
    hideNicknameModal();
  });

  // Kullanıcı Değiştir
  el.changeUserBtn.addEventListener('click', () => {
    soundManager.playClick();
    showNicknameModal();
  });

  // Oyun Modu Seçimleri (5 MOD)
  document.querySelectorAll('[data-mode]').forEach(card => {
    card.addEventListener('click', (e) => {
      soundManager.playClick();
      if (!state.user || !state.user.nickname) {
        showNicknameModal();
        return;
      }
      const mode = card.dataset.mode;
      startGame(mode);
    });
  });

  // Ses Aç / Kapat
  el.soundToggleBtn.addEventListener('click', () => {
    const enabled = soundManager.toggleSound();
    state.soundEnabled = enabled;
    updateSoundIcon();
  });

  // Skor Tablosu
  el.leaderboardBtn.addEventListener('click', () => {
    soundManager.playClick();
    loadAndShowLeaderboard();
  });

  el.closeLeaderboardBtn.addEventListener('click', () => {
    soundManager.playClick();
    el.leaderboardModal.classList.add('hidden');
  });

  // Yorumlar & Öneriler
  el.commentsBtn.addEventListener('click', () => {
    soundManager.playClick();
    loadAndShowComments();
  });

  el.closeCommentsBtn.addEventListener('click', () => {
    soundManager.playClick();
    el.commentsModal.classList.add('hidden');
  });

  // Kişisel Geçmiş Yanlışlarım Modal Aç/Kapat
  el.mistakesBtn.addEventListener('click', () => {
    soundManager.playClick();
    loadAndShowPersonalMistakes();
  });

  el.viewMistakesResultBtn.addEventListener('click', () => {
    soundManager.playClick();
    loadAndShowPersonalMistakes();
  });

  el.closeMistakesBtn.addEventListener('click', () => {
    soundManager.playClick();
    el.mistakesModal.classList.add('hidden');
  });

  el.clearMistakesBtn.addEventListener('click', () => {
    if (!state.user || !state.user.nickname) return;
    if (confirm('Tüm geçmiş yanlış kaydınızı temizlemek istediğinize emin misiniz?')) {
      LeaderboardService.clearPersonalMistakes(state.user.nickname);
      loadAndShowPersonalMistakes();
    }
  });

  // Yorum Gönder
  el.sendCommentBtn.addEventListener('click', async () => {
    const txt = el.commentInput.value.trim();
    if (!txt) return;
    if (!state.user || !state.user.nickname) {
      showNicknameModal();
      return;
    }

    soundManager.playClick();
    el.commentInput.value = '';
    await LeaderboardService.postComment(txt);
    loadAndShowComments();
  });

  // TDK Kılavuzu Modal & Kategori Geçişleri
  el.tdkGuideBtn.addEventListener('click', () => {
    soundManager.playClick();
    el.tdkGuideModal.classList.remove('hidden');
    el.tdkGuideModal.classList.add('flex');
  });

  el.closeTdkGuideBtn.addEventListener('click', () => {
    soundManager.playClick();
    el.tdkGuideModal.classList.add('hidden');
  });

  el.guideTabSpelling.addEventListener('click', () => {
    soundManager.playClick();
    el.guideTabSpelling.className = 'px-4 py-2 text-xs md:text-sm font-bold rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40';
    el.guideTabPunctuation.className = 'px-4 py-2 text-xs md:text-sm font-bold rounded-xl bg-slate-800 text-slate-400 hover:text-white';
    el.spellingGuideContent.classList.remove('hidden');
    el.punctuationGuideContent.classList.add('hidden');
  });

  el.guideTabPunctuation.addEventListener('click', () => {
    soundManager.playClick();
    el.guideTabPunctuation.className = 'px-4 py-2 text-xs md:text-sm font-bold rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
    el.guideTabSpelling.className = 'px-4 py-2 text-xs md:text-sm font-bold rounded-xl bg-slate-800 text-slate-400 hover:text-white';
    el.punctuationGuideContent.classList.remove('hidden');
    el.spellingGuideContent.classList.add('hidden');
  });

  // Sonraki Soru Butonu
  el.nextQuestionBtn.addEventListener('click', () => {
    soundManager.playClick();
    nextQuestion();
  });

  // Oyunu Yeniden Başlat / Ana Sayfa
  el.restartGameBtn.addEventListener('click', () => {
    soundManager.playClick();
    startGame(state.activeMode);
  });

  el.homeBtn.addEventListener('click', () => {
    soundManager.playClick();
    showHome();
  });
}

function updateSoundIcon() {
  el.soundToggleBtn.innerHTML = state.soundEnabled ? '🔊 Ses Açık' : '🔇 Ses Kapalı';
}

function showHome() {
  clearInterval(state.timer);
  el.modeSelectSection.classList.remove('hidden');
  el.gameSection.classList.add('hidden');
  el.resultSection.classList.add('hidden');
}

// Oyunu Başlatma
function startGame(mode) {
  state.activeMode = mode;
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.correctCount = 0;
  state.wrongCount = 0;
  state.isAnswered = false;

  if (mode === 'words') {
    state.questions = [...WORD_PAIRS].sort(() => Math.random() - 0.5);
    el.modeTitleDisplay.textContent = '⚡ Oyun 1: Doğrusunu Seç (Karıştırılan Sözcükler)';
  } else if (mode === 'sentences') {
    state.questions = [...SENTENCE_QUESTIONS].sort(() => Math.random() - 0.5);
    el.modeTitleDisplay.textContent = '🔍 Oyun 2: Yanlışı Yakala (Cümle İçi Avcı)';
  } else if (mode === 'rules') {
    state.questions = [...RULE_TEST_QUESTIONS].sort(() => Math.random() - 0.5);
    el.modeTitleDisplay.textContent = '📝 Oyun 3: TYT Kural Testi (de/ki/Büyük Harfler)';
  } else if (mode === 'punctuation') {
    state.questions = [...PUNCTUATION_QUESTIONS].sort(() => Math.random() - 0.5);
    el.modeTitleDisplay.textContent = '📍 Oyun 4: Noktalama İşaretleri Testi';
  } else if (mode === 'paragraph_punctuation') {
    state.questions = [...PARAGRAPH_PUNCTUATION_QUESTIONS].sort(() => Math.random() - 0.5);
    el.modeTitleDisplay.textContent = '📖 Oyun 5: Paragrafta Noktalama Avcısı (TYT Metin Modu)';
  }

  el.modeSelectSection.classList.add('hidden');
  el.resultSection.classList.add('hidden');
  el.gameSection.classList.remove('hidden');

  updateStatsUI();
  renderQuestion();
}

function updateStatsUI() {
  el.scoreDisplay.textContent = state.score;
  el.streakDisplay.textContent = state.streak > 1 ? `🔥 ${state.streak}x` : '1x';
  
  const total = state.questions.length;
  const progressPercent = ((state.currentQuestionIndex) / total) * 100;
  el.progressBar.style.width = `${progressPercent}%`;
}

function startTimer() {
  clearInterval(state.timer);
  state.timeLeft = state.activeMode === 'paragraph_punctuation' ? 25 : 15;
  el.timerDisplay.textContent = `${state.timeLeft}s`;
  el.timerDisplay.className = 'text-cyan-400 font-bold text-lg font-heading';

  state.timer = setInterval(() => {
    state.timeLeft--;
    el.timerDisplay.textContent = `${state.timeLeft}s`;

    if (state.timeLeft <= 5) {
      el.timerDisplay.className = 'text-rose-500 font-extrabold text-lg font-heading animate-ping';
      soundManager.playClick();
    }

    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  if (state.isAnswered) return;
  state.isAnswered = true;
  state.wrongCount++;
  state.streak = 0;
  soundManager.playWrong();

  const q = state.questions[state.currentQuestionIndex];
  let correctText = '';
  let questionTitle = '';

  if (state.activeMode === 'words') {
    correctText = q.correct;
    questionTitle = `TDK Doğru Yazımı: "${q.correct}"`;
    el.gameContainer.querySelectorAll('.option-card').forEach(btn => {
      if (btn.dataset.correct === 'true') btn.classList.add('correct');
    });
  } else if (state.activeMode === 'sentences') {
    correctText = q.options[q.correctIndex];
    questionTitle = `Cümle: "${q.sentence}"`;
    el.gameContainer.querySelectorAll('.option-card').forEach((btn, idx) => {
      if (idx === q.correctIndex) btn.classList.add('correct');
    });
  } else if (state.activeMode === 'paragraph_punctuation') {
    correctText = q.options[q.answer];
    questionTitle = `Paragraf: "${q.paragraph.substring(0, 40)}..."`;
    el.gameContainer.querySelectorAll('.rule-opt-btn').forEach((btn, idx) => {
      if (idx === q.answer) btn.classList.add('correct');
    });
  } else {
    correctText = q.options[q.answer];
    questionTitle = q.question;
    el.gameContainer.querySelectorAll('.rule-opt-btn').forEach((btn, idx) => {
      if (idx === q.answer) btn.classList.add('correct');
    });
  }

  const modeName = getModeTitle(state.activeMode);

  LeaderboardService.saveMistake({
    question: questionTitle,
    userAnswer: '⏰ Süre Doldu',
    correctAnswer: correctText,
    explanation: q.explanation,
    mode: modeName
  });

  el.answerFeedbackStatus.innerHTML = `<span class="text-rose-400">⏰ SÜRE DOLDU!</span> <span class="text-emerald-400">Doğru Cevap: ${correctText}</span>`;
  el.explanationText.textContent = q.explanation;
  el.explanationBox.classList.remove('hidden');
  el.nextQuestionBtn.classList.remove('hidden');
  updateStatsUI();
}

function getModeTitle(mode) {
  switch (mode) {
    case 'words': return 'Karıştırılan Sözcükler';
    case 'sentences': return 'Cümle Avcısı';
    case 'rules': return 'TYT Kural Testi';
    case 'punctuation': return 'Noktalama Testi';
    case 'paragraph_punctuation': return 'Paragrafta Noktalama';
    default: return 'Test';
  }
}

// Soruları Ekrana Çizme
function renderQuestion() {
  state.isAnswered = false;
  el.explanationBox.classList.add('hidden');
  el.nextQuestionBtn.classList.add('hidden');
  
  startTimer();
  updateStatsUI();

  const q = state.questions[state.currentQuestionIndex];

  if (state.activeMode === 'words') {
    const isCorrectLeft = Math.random() > 0.5;
    const optionA = isCorrectLeft ? q.correct : q.wrong;
    const optionB = isCorrectLeft ? q.wrong : q.correct;

    el.gameContainer.innerHTML = `
      <div class="text-center mb-8">
        <span class="inline-block bg-cyan-950/60 text-cyan-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-cyan-500/20 mb-3">
          ${q.category} • Soru ${state.currentQuestionIndex + 1}/${state.questions.length}
        </span>
        <h3 class="text-2xl md:text-3xl font-extrabold font-heading text-white">
          TDK'ye göre hangisinin yazımı DOĞRUDUR?
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <button class="option-card" data-val="${optionA}" data-correct="${isCorrectLeft}">
          ${optionA}
        </button>
        <button class="option-card" data-val="${optionB}" data-correct="${!isCorrectLeft}">
          ${optionB}
        </button>
      </div>
    `;

    el.gameContainer.querySelectorAll('.option-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.isAnswered) return;
        const isCorrect = btn.dataset.correct === 'true';
        handleAnswer(isCorrect, btn, q.explanation, btn.dataset.val, q.correct, `TDK Kelime: "${q.correct}"`);
      });
    });

  } else if (state.activeMode === 'sentences') {
    el.gameContainer.innerHTML = `
      <div class="text-center mb-6">
        <span class="inline-block bg-purple-950/60 text-purple-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-purple-500/20 mb-3">
          Cümle Analizi • Soru ${state.currentQuestionIndex + 1}/${state.questions.length}
        </span>
        <div class="glass-panel p-6 my-4 border-l-4 border-l-purple-500">
          <p class="text-xl md:text-2xl font-medium text-slate-100 italic leading-relaxed">
            "${q.sentence}"
          </p>
        </div>
        <p class="text-sm text-slate-400 mt-2">Bu cümlede HANGİ kısımda yazım yanlışı vardır?</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        ${q.options.map((opt, idx) => `
          <button class="option-card py-4 text-lg" data-idx="${idx}">
            ${opt}
          </button>
        `).join('')}
      </div>
    `;

    el.gameContainer.querySelectorAll('.option-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.isAnswered) return;
        const selectedIdx = parseInt(btn.dataset.idx);
        const isCorrect = selectedIdx === q.correctIndex;
        const userChoice = q.options[selectedIdx];
        const correctChoice = q.options[q.correctIndex];
        handleAnswer(isCorrect, btn, q.explanation, userChoice, correctChoice, `Cümle: "${q.sentence}"`);
      });
    });

  } else if (state.activeMode === 'paragraph_punctuation') {
    // OYUN 5: PARAGRAFTA NOKTALAMA AVCISI
    el.gameContainer.innerHTML = `
      <div class="mb-6">
        <span class="inline-block bg-blue-950/60 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-500/20 mb-3">
          📖 TYT Metin Modu • Soru ${state.currentQuestionIndex + 1}/${state.questions.length}
        </span>
        
        <div class="glass-panel p-6 my-3 border-l-4 border-l-blue-500 bg-blue-950/20">
          <p class="text-base md:text-lg text-slate-100 font-serif leading-loose">
            ${q.paragraph.replace(/\((\d+)\)/g, '<span class="inline-block bg-blue-500/30 text-blue-300 font-sans font-bold px-2 py-0.5 rounded border border-blue-400/40 mx-1">($1)</span>')}
          </p>
        </div>

        <p class="text-xs text-slate-400 font-semibold mb-4">Yukarıdaki numaralanmış boşluklara sırasıyla hangi noktalama işaretleri getirilmelidir?</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${q.options.map((opt, idx) => `
            <button class="text-left glass-panel p-4 text-base font-bold font-heading hover:border-blue-400 transition-all rounded-xl cursor-pointer rule-opt-btn" data-idx="${idx}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    el.gameContainer.querySelectorAll('.rule-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.isAnswered) return;
        const selectedIdx = parseInt(btn.dataset.idx);
        const isCorrect = selectedIdx === q.answer;
        const userChoice = q.options[selectedIdx];
        const correctChoice = q.options[q.answer];
        handleAnswer(isCorrect, btn, q.explanation, userChoice, correctChoice, `Paragraf: "${q.paragraph.substring(0, 45)}..."`);
      });
    });

  } else if (state.activeMode === 'rules' || state.activeMode === 'punctuation') {
    const badgeColor = state.activeMode === 'rules' ? 'amber' : 'emerald';
    el.gameContainer.innerHTML = `
      <div class="mb-6">
        <span class="inline-block bg-${badgeColor}-950/60 text-${badgeColor}-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-${badgeColor}-500/20 mb-3">
          ${q.category} • Soru ${state.currentQuestionIndex + 1}/${state.questions.length}
        </span>
        <h3 class="text-xl md:text-2xl font-bold font-heading text-white leading-relaxed mb-6">
          ${q.question}
        </h3>

        <div class="space-y-4">
          ${q.options.map((opt, idx) => `
            <button class="w-full text-left glass-panel p-4 md:p-5 text-base md:text-lg font-medium hover:border-cyan-400 transition-all rounded-xl cursor-pointer rule-opt-btn" data-idx="${idx}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    el.gameContainer.querySelectorAll('.rule-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.isAnswered) return;
        const selectedIdx = parseInt(btn.dataset.idx);
        const isCorrect = selectedIdx === q.answer;
        const userChoice = q.options[selectedIdx];
        const correctChoice = q.options[q.answer];
        handleAnswer(isCorrect, btn, q.explanation, userChoice, correctChoice, q.question);
      });
    });
  }
}

// Cevaplama Mantığı
function handleAnswer(isCorrect, element, explanation, userAnswerText, correctAnswerText, questionText) {
  clearInterval(state.timer);
  state.isAnswered = true;

  if (isCorrect) {
    soundManager.playCorrect();
    element.classList.add('correct');
    state.correctCount++;
    state.streak++;
    
    const speedBonus = state.timeLeft * 10;
    const streakMultiplier = state.streak > 3 ? 3 : (state.streak > 1 ? 2 : 1);
    const addedScore = (100 + speedBonus) * streakMultiplier;
    state.score += addedScore;

    el.answerFeedbackStatus.innerHTML = `<span class="text-emerald-400">✅ TEBRİKLER! DOĞRU CEVAP</span>`;

  } else {
    soundManager.playWrong();
    element.classList.add('wrong');
    state.wrongCount++;
    state.streak = 0;

    // Doğru Cevabı Yeşil Yakarak Göster
    if (state.activeMode === 'words') {
      el.gameContainer.querySelectorAll('.option-card').forEach(btn => {
        if (btn.dataset.correct === 'true') btn.classList.add('correct');
      });
    } else if (state.activeMode === 'sentences') {
      const q = state.questions[state.currentQuestionIndex];
      el.gameContainer.querySelectorAll('.option-card').forEach((btn, idx) => {
        if (idx === q.correctIndex) btn.classList.add('correct');
      });
    } else {
      const q = state.questions[state.currentQuestionIndex];
      el.gameContainer.querySelectorAll('.rule-opt-btn').forEach((btn, idx) => {
        if (idx === q.answer) btn.classList.add('correct');
      });
    }

    el.answerFeedbackStatus.innerHTML = `
      <span class="text-rose-400">❌ MAALESEF YANLIŞ!</span> 
      <span class="text-emerald-400 ml-2">Doğru Cevap: <strong>${correctAnswerText}</strong></span>
    `;

    const modeName = getModeTitle(state.activeMode);

    LeaderboardService.saveMistake({
      question: questionText,
      userAnswer: userAnswerText,
      correctAnswer: correctAnswerText,
      explanation: explanation,
      mode: modeName
    });
  }

  el.explanationText.textContent = explanation;
  el.explanationBox.classList.remove('hidden');
  el.nextQuestionBtn.classList.remove('hidden');

  updateStatsUI();
}

function nextQuestion() {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= state.questions.length) {
    finishGame();
  } else {
    renderQuestion();
  }
}

// Oyun Sonu
async function finishGame() {
  clearInterval(state.timer);
  soundManager.playVictory();

  el.gameSection.classList.add('hidden');
  el.resultSection.classList.remove('hidden');

  const total = state.questions.length;
  const accuracy = Math.round((state.correctCount / total) * 100);

  el.finalScoreDisplay.textContent = state.score;
  el.finalAccuracyDisplay.textContent = `%${accuracy}`;
  el.finalCorrectDisplay.textContent = `${state.correctCount} Doğru`;
  el.finalWrongDisplay.textContent = `${state.wrongCount} Yanlış`;

  if (accuracy >= 70 && window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const modeName = getModeTitle(state.activeMode);

  await LeaderboardService.saveScore({
    score: state.score,
    accuracy: accuracy,
    correctCount: state.correctCount,
    wrongCount: state.wrongCount,
    mode: modeName
  });
}

// Kişisel Geçmiş Yanlışlarımı Yükle ve Göster
function loadAndShowPersonalMistakes() {
  if (!state.user || !state.user.nickname) {
    showNicknameModal();
    return;
  }

  el.mistakesModal.classList.remove('hidden');
  el.mistakesModal.classList.add('flex');

  const mistakes = LeaderboardService.getPersonalMistakes(state.user.nickname);

  if (mistakes.length === 0) {
    el.mistakesList.innerHTML = `
      <div class="text-center py-12 text-slate-400">
        <span class="text-4xl block mb-2">🎉</span>
        <p class="text-base font-bold text-white">Harika! Kayıtlı Yanlışın Bulunmuyor.</p>
        <p class="text-xs text-slate-400">Yanlış yaptığın sorular TDK gerekçeleriyle birlikte burada listelenecek.</p>
      </div>
    `;
    return;
  }

  el.mistakesList.innerHTML = mistakes.map(m => `
    <div class="glass-panel p-5 space-y-3 rounded-xl border border-rose-500/20 bg-slate-900/80">
      <div class="flex items-center justify-between">
        <span class="bg-rose-950/80 text-rose-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-500/30">
          ${m.mode || 'Test'}
        </span>
        <span class="text-[10px] text-slate-500">${m.date}</span>
      </div>

      <h4 class="font-bold text-slate-100 text-sm font-heading">
        ${m.question}
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        <div class="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300">
          <span class="font-semibold block text-[10px] text-rose-400 uppercase">Senin Seçimin:</span>
          ${m.userAnswer}
        </div>
        <div class="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
          <span class="font-semibold block text-[10px] text-emerald-400 uppercase">TDK Doğru Cevap:</span>
          ${m.correctAnswer}
        </div>
      </div>

      <div class="p-3 rounded-lg bg-slate-950 text-slate-300 text-xs border border-slate-800">
        <span class="font-bold text-cyan-400 block mb-0.5">📚 TDK Gerekçesi:</span>
        ${m.explanation}
      </div>
    </div>
  `).join('');
}

// Skor Tablosunu Yükle ve Göster
async function loadAndShowLeaderboard() {
  el.leaderboardModal.classList.remove('hidden');
  el.leaderboardList.innerHTML = `
    <div class="text-center py-12 text-slate-400">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full mb-3"></div>
      <p>Skor tablosu senkronize ediliyor...</p>
    </div>
  `;

  const scores = await LeaderboardService.fetchScores();

  if (scores.length === 0) {
    el.leaderboardList.innerHTML = `
      <div class="text-center py-12 text-slate-400">
        <p>Henüz kayıtlı skor bulunmuyor. İlk skoru sen yap!</p>
      </div>
    `;
    return;
  }

  const isAdmin = state.user && state.user.isAdmin;

  el.leaderboardList.innerHTML = scores.map((item, index) => {
    let rankBadge = `<span class="font-bold text-slate-400 w-8 text-center">${index + 1}.</span>`;
    let rankClass = 'glass-panel p-4 flex items-center justify-between gap-4 rounded-xl';

    if (index === 0) {
      rankBadge = `<span class="text-2xl w-8 text-center">🥇</span>`;
      rankClass += ' rank-1';
    } else if (index === 1) {
      rankBadge = `<span class="text-2xl w-8 text-center">🥈</span>`;
      rankClass += ' rank-2';
    } else if (index === 2) {
      rankBadge = `<span class="text-2xl w-8 text-center">🥉</span>`;
      rankClass += ' rank-3';
    }

    const deleteBtnHtml = isAdmin ? `
      <button class="delete-score-btn text-rose-400 hover:text-rose-300 text-xs bg-rose-950/60 border border-rose-500/30 px-2 py-1 rounded ml-2" data-id="${item.id}" data-key="${item.firebaseKey || ''}" title="Skoru Sil (Admin WOLF)">
        🗑️ Sil
      </button>
    ` : '';

    return `
      <div class="${rankClass}">
        <div class="flex items-center gap-3">
          ${rankBadge}
          <div class="text-2xl">${item.avatar || '🎓'}</div>
          <div>
            <h4 class="font-bold text-white font-heading flex items-center gap-1.5">
              ${item.isAdmin ? '👑 ' : ''}${item.nickname}
            </h4>
            <div class="text-xs text-slate-400 flex items-center gap-2">
              <span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">${item.mode || 'Karıştırılan Sözcükler'}</span>
              <span>• ${item.date || ''}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-right">
            <div class="text-xl font-extrabold font-heading text-cyan-400">${item.score} <span class="text-xs font-normal">Puan</span></div>
            <div class="text-xs text-emerald-400 font-semibold">%${item.accuracy} Başarı</div>
          </div>
          ${deleteBtnHtml}
        </div>
      </div>
    `;
  }).join('');

  if (isAdmin) {
    el.leaderboardList.querySelectorAll('.delete-score-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Bu skoru silmek istediğinize emin misiniz?')) {
          await LeaderboardService.deleteScore(btn.dataset.id, btn.dataset.key);
          loadAndShowLeaderboard();
        }
      });
    });
  }
}

// Yorumlar & Öneriler Yükle ve Göster
async function loadAndShowComments() {
  el.commentsModal.classList.remove('hidden');
  el.commentsList.innerHTML = `
    <div class="text-center py-8 text-slate-400">
      <div class="animate-spin inline-block w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full mb-2"></div>
      <p>Yorumlar yükleniyor...</p>
    </div>
  `;

  const comments = await LeaderboardService.fetchComments();

  if (comments.length === 0) {
    el.commentsList.innerHTML = `
      <div class="text-center py-8 text-slate-400 text-sm">
        <p>Henüz yorum yapılmamış. İlk öneriyi sen yap!</p>
      </div>
    `;
    return;
  }

  const isAdmin = state.user && state.user.isAdmin;

  el.commentsList.innerHTML = comments.map(c => {
    const deleteBtnHtml = isAdmin ? `
      <button class="delete-cmt-btn text-rose-400 hover:text-rose-300 text-xs bg-rose-950/60 border border-rose-500/30 px-2.5 py-1 rounded-lg" data-id="${c.id}" data-key="${c.firebaseKey || ''}" title="Yorumu Sil (WOLF Admin)">
        🗑️ Sil
      </button>
    ` : '';

    return `
      <div class="glass-panel p-4 space-y-2 rounded-xl border border-slate-800">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">${c.avatar || '🎓'}</span>
            <span class="font-bold text-sm text-cyan-300 font-heading">
              ${c.isAdmin ? '👑 ' : ''}${c.nickname}
            </span>
            <span class="text-[10px] text-slate-500">• ${c.date}</span>
          </div>
          ${deleteBtnHtml}
        </div>
        <p class="text-sm text-slate-200 leading-relaxed pl-7">
          ${c.text}
        </p>
      </div>
    `;
  }).join('');

  if (isAdmin) {
    el.commentsList.querySelectorAll('.delete-cmt-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
          await LeaderboardService.deleteComment(btn.dataset.id, btn.dataset.key);
          loadAndShowComments();
        }
      });
    });
  }
}

// Uygulamayı Başlat
document.addEventListener('DOMContentLoaded', init);
