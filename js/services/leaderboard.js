// Global ve Yerel Skor Tablosu & Yorumlar & Kişisel Yanlış Geçmişi Servisi

const LOCAL_STORAGE_KEY = 'tyt_yazim_leaderboard_v1';
const LOCAL_COMMENTS_KEY = 'tyt_yazim_comments_v1';
const MISTAKES_KEY_PREFIX = 'tyt_yazim_mistakes_';
const USER_KEY = 'tyt_yazim_current_user_v1';

const GLOBAL_API_URL = 'https://tyt-yazim-oyunu-default-rtdb.europe-west1.firebasedatabase.app/leaderboard';
const COMMENTS_API_URL = 'https://tyt-yazim-oyunu-default-rtdb.europe-west1.firebasedatabase.app/comments';

export const LeaderboardService = {
  getCurrentUser() {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  verifyWolfAdminPassword(pwd) {
    return pwd === 'WOLF54';
  },

  saveCurrentUser(nickname, avatar = '🎓', isAdmin = false) {
    const user = {
      nickname: nickname.trim(),
      avatar: avatar,
      isAdmin: isAdmin || nickname.trim().toUpperCase() === 'WOLF',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  clearCurrentUser() {
    localStorage.removeItem(USER_KEY);
  },

  getLocalScores() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async fetchScores() {
    let globalScores = [];
    try {
      const res = await fetch(GLOBAL_API_URL + '.json', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          globalScores = Object.entries(data).map(([key, val]) => ({
            ...val,
            firebaseKey: key
          }));
        }
      }
    } catch (err) {
      console.warn('Global skor çekme hatası (Yerel veriler kullanılacak):', err);
    }

    const localScores = this.getLocalScores();
    const combined = [...globalScores];
    
    localScores.forEach(localItem => {
      if (!combined.some(item => item.id === localItem.id)) {
        combined.push(localItem);
      }
    });

    combined.sort((a, b) => b.score - a.score || b.accuracy - a.accuracy);
    return combined;
  },

  async saveScore(entry) {
    const user = this.getCurrentUser();
    if (!user || !user.nickname) return false;

    const scoreRecord = {
      id: 'score_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      nickname: user.nickname,
      avatar: user.avatar || '🎓',
      isAdmin: !!user.isAdmin,
      score: entry.score || 0,
      accuracy: entry.accuracy || 0,
      correctCount: entry.correctCount || 0,
      wrongCount: entry.wrongCount || 0,
      mode: entry.mode || 'Karıştırılan Sözcükler',
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };

    const localScores = this.getLocalScores();
    localScores.unshift(scoreRecord);
    if (localScores.length > 100) localScores.pop();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localScores));

    try {
      await fetch(GLOBAL_API_URL + '.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreRecord)
      });
    } catch (err) {
      console.warn('Global skor sunucusuna iletilemedi:', err);
    }

    return scoreRecord;
  },

  async deleteScore(scoreId, firebaseKey) {
    const localScores = this.getLocalScores().filter(s => s.id !== scoreId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localScores));

    if (firebaseKey) {
      try {
        await fetch(`${GLOBAL_API_URL}/${firebaseKey}.json`, { method: 'DELETE' });
      } catch (err) {
        console.error('Firebase skor silinemedi:', err);
      }
    }
  },

  // YORUMLAR SERVİSİ
  getLocalComments() {
    try {
      const data = localStorage.getItem(LOCAL_COMMENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async fetchComments() {
    let globalComments = [];
    try {
      const res = await fetch(COMMENTS_API_URL + '.json', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          globalComments = Object.entries(data).map(([key, val]) => ({
            ...val,
            firebaseKey: key
          }));
        }
      }
    } catch (err) {
      console.warn('Yorumlar çekilemedi:', err);
    }

    const localComments = this.getLocalComments();
    const combined = [...globalComments];
    localComments.forEach(localItem => {
      if (!combined.some(item => item.id === localItem.id)) {
        combined.push(localItem);
      }
    });

    combined.sort((a, b) => b.timestamp - a.timestamp);
    return combined;
  },

  async postComment(text) {
    const user = this.getCurrentUser();
    if (!user || !user.nickname) return null;

    const commentObj = {
      id: 'cmt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      nickname: user.nickname,
      avatar: user.avatar || '🎓',
      isAdmin: !!user.isAdmin,
      text: text.trim(),
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };

    const localComments = this.getLocalComments();
    localComments.unshift(commentObj);
    localStorage.setItem(LOCAL_COMMENTS_KEY, JSON.stringify(localComments));

    try {
      await fetch(COMMENTS_API_URL + '.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentObj)
      });
    } catch (err) {
      console.warn('Yorum sunucuya iletilemedi:', err);
    }

    return commentObj;
  },

  async deleteComment(commentId, firebaseKey) {
    const localComments = this.getLocalComments().filter(c => c.id !== commentId);
    localStorage.setItem(LOCAL_COMMENTS_KEY, JSON.stringify(localComments));

    if (firebaseKey) {
      try {
        await fetch(`${COMMENTS_API_URL}/${firebaseKey}.json`, { method: 'DELETE' });
      } catch (err) {
        console.error('Yorum silinemedi:', err);
      }
    }
  },

  // KİŞİSEL YANLIŞ GEÇMİŞİ SERVİSİ
  getPersonalMistakes(nickname) {
    if (!nickname) return [];
    try {
      const key = MISTAKES_KEY_PREFIX + nickname.trim().toLowerCase();
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveMistake({ question, userAnswer, correctAnswer, explanation, mode }) {
    const user = this.getCurrentUser();
    if (!user || !user.nickname) return;

    const key = MISTAKES_KEY_PREFIX + user.nickname.trim().toLowerCase();
    const mistakes = this.getPersonalMistakes(user.nickname);

    const newMistake = {
      id: 'mst_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      question: question,
      userAnswer: userAnswer || 'Süre Doldu',
      correctAnswer: correctAnswer,
      explanation: explanation,
      mode: mode,
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };

    mistakes.unshift(newMistake);
    if (mistakes.length > 50) mistakes.pop(); // Son 50 yanlışı sakla
    localStorage.setItem(key, JSON.stringify(mistakes));
    return newMistake;
  },

  clearPersonalMistakes(nickname) {
    if (!nickname) return;
    const key = MISTAKES_KEY_PREFIX + nickname.trim().toLowerCase();
    localStorage.removeItem(key);
  }
};
