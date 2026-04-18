const questions = [
  {
    image:
      "https://bck.by/upload/iblock/cd2/munwrz9hf9twtj3peo27x05wuqdivbbn.jpg",
    correct: "Qum",
    options: ["Qum", "Sement", "Beton", "G'isht"],
  },
  {
    image:
      "https://baltkz.ru/assets/images/stati/primenenie-granita/kamen_granit_2.jpg",
    correct: "Granit",
    options: ["Marmar", "Granit", "G'isht", "Beton"],
  },
  {
    image:
      "https://www.marblesystems.com/wp-content/uploads/2012/slabimages/SL91022.jpg",
    correct: "Marmar",
    options: ["Granit", "Marmar", "Kерамика", "Shisha"],
  },
  {
    image:
      "https://stroybaza61.ru/wp-content/uploads/2016/10/Gipsokartonnyj-list-GKL-Knauf.jpg",
    correct: "Gipsokarton",
    options: ["Yog'och", "G'isht", "Gipsokarton", "Beton"],
  },
  {
    image: "https://etalonk.com/images/blog/08-2022/HY_blobid1660499268702.png",
    correct: "Kерамik plitka",
    options: ["Marmar", "Kераmik plitka", "Shisha", "Granit"],
  },
  {
    image:
      "https://klinkerprom.ru/upload/medialibrary/15d/o2ezcv3alsvc6pyicieaz2udv1ttvq4b/2023-02-17%2010.26.45.jpg",
    correct: "Cherepitsa",
    options: ["G'isht", "Beton", "Cherepitsa", "Shisha"],
  },
  {
    image:
      "https://grad-snab.ru/upload/iblock/bf5/3o0ucly7zulkizmy4ls53dpdjszt9g24.jpg",
    correct: "Mineral vata",
    options: ["Pina qatlami", "Mineral vata", "Penoplex", "Gipsokarton"],
  },
  {
    image: "https://st22.stpulscen.ru/images/product/148/582/599_medium2.jpg",
    correct: "Plastik truba",
    options: ["Temir truba", "Plastik truba", "Yog'och", "Beton"],
  },
  {
    image:
      "https://oz-gbi.ru/upload/resize_cache/webp/iblock/2f9/3thvfshexlgioh2rnwnmcykbfwt1o4xt.webp",
    correct: "Asfalt",
    options: ["Beton", "Asfalt", "Sement", "Qum"],
  },
  {
    image:
      "https://static.tildacdn.com/tild6231-3639-4032-a332-616264393465/keramzitobetonnye_bloki.jpg",
    correct: "Keramzit blok",
    options: ["G'isht", "Gazobeton", "Keramzit blok", "Beton blok"],
  },
  {
    image:
      "https://tk-konstruktor.ru/upload/iblock/f71/4g2o47wblzo9e9yvlxcgd60ayyv0cvry.jpg",
    correct: "Gazobeton",
    options: ["Keramzit blok", "G'isht", "Gazobeton", "Pina qatlami"],
  },
  {
    image:
      "https://prorab82.ru/images/product/dedd821894ea3ad7c31d4091cdc350b2.png",
    correct: "Penoplex",
    options: ["Mineral vata", "Penoplex", "Pina qatlami", "Gipsokarton"],
  },
  {
    image:
      "https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1669038551/lmcode/oS4E2yrIf0q09qCLA-TXLg/13857214.png",
    correct: "Shtukaturka",
    options: ["Sement", "Shtukaturka", "Beton", "Gipsokarton"],
  },
  {
    image:
      "https://www.alta-profil.ru/upload/mobile_articles_resize/369484-Kvarc-vinilovyj-laminat.webp",
    correct: "Laminat",
    options: ["Parket", "Laminat", "Linoleum", "Yog'och"],
  },
  {
    image:
      "https://finefloor.ru/images/article/PhotoGallery/kak-stelit-linoleum-na-derevyannyj-pol-1.jpg",
    correct: "Parket",
    options: ["Laminat", "Parket", "Linoleum", "Plitka"],
  },
];

let current = 0;
let score = 0;
let time = 15;
let timer;
let canAnswer = true;

const image = document.getElementById("image");
const answersDiv = document.getElementById("answers");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const questionText = document.getElementById("question");
const container = document.querySelector(".container");

// Создаем элементы для таймера
const timerBar = document.createElement("div");
timerBar.className = "timer-bar";
const timerProgress = document.createElement("div");
timerProgress.className = "timer-progress";
timerBar.appendChild(timerProgress);
container.appendChild(timerBar);

function startTimer() {
  clearInterval(timer);
  time = 15;
  updateTimerDisplay();

  timer = setInterval(() => {
    time--;
    updateTimerDisplay();

    if (time <= 0) {
      clearInterval(timer);
      showResult(false, "Vaqt tugadi!");
      setTimeout(() => nextQuestion(), 1500);
    }
  }, 1000);
}

function updateTimerDisplay() {
  timeText.innerHTML = `Vaqt: <span>${time}</span>`;
  const progress = (time / 15) * 100;
  timerProgress.style.width = progress + "%";

  // Меняем цвет при малом времени
  if (time <= 5) {
    timerProgress.style.background = "linear-gradient(90deg, #ef4444, #dc2626)";
    timeText.style.color = "#ef4444";
  } else {
    timerProgress.style.background = "linear-gradient(90deg, #f59e0b, #ef4444)";
    timeText.style.color = "#f59e0b";
  }
}

function loadQuestion() {
  canAnswer = true;
  const q = questions[current];

  // Анимация смены изображения
  image.style.opacity = "0";
  setTimeout(() => {
    image.src = q.image;
    image.style.opacity = "1";
  }, 200);

  answersDiv.innerHTML = "";

  // Перемешиваем варианты
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

  shuffledOptions.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = opt;
    btn.style.animationDelay = index * 0.1 + "s";
    btn.style.animation = "fadeInUp 0.5s ease forwards";

    btn.onclick = () => {
      if (!canAnswer) return;
      canAnswer = false;

      clearInterval(timer);

      const isCorrect = opt === q.correct;

      if (isCorrect) {
        score++;
        btn.classList.add("correct");
        showResult(true, "Ajoyib! ✅");
      } else {
        btn.classList.add("wrong");
        // Подсвечиваем правильный ответ
        const buttons = answersDiv.querySelectorAll("button");
        buttons.forEach((b) => {
          if (b.innerText === q.correct) {
            b.classList.add("correct");
          }
        });
        showResult(false, "Xato! ❌");
      }

      updateScore();
      setTimeout(() => nextQuestion(), 1500);
    };

    answersDiv.appendChild(btn);
  });

  questionText.innerHTML = `Savol: <span>${current + 1}/${questions.length}</span>`;
  updateScore();
  startTimer();
}

function updateScore() {
  scoreText.innerHTML = `Ball: <span>${score}</span>`;
}

function showResult(isCorrect, message) {
  // Удаляем старое уведомление если есть
  const oldNotification = document.querySelector(".notification");
  if (oldNotification) oldNotification.remove();

  const notification = document.createElement("div");
  notification.className = "notification " + (isCorrect ? "success" : "error");
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${isCorrect ? "🎉" : "😕"}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  // Анимация появления
  setTimeout(() => notification.classList.add("show"), 10);

  // Удаляем через 1.5 секунды
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 1500);
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showGameOver();
  }
}

function showGameOver() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const percentage = Math.round((score / questions.length) * 100);
  let message = "";
  let emoji = "";

  if (percentage === 100) {
    message = "Mukammal! Siz ekspertsiz! 🏆";
    emoji = "🌟";
  } else if (percentage >= 80) {
    message = "Ajoyib natija! 👏";
    emoji = "🎉";
  } else if (percentage >= 60) {
    message = "Yaxshi, davom eting! 👍";
    emoji = "😊";
  } else {
    message = "Yana bir bor urinib ko'ring! 💪";
    emoji = "📚";
  }

  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-emoji">${emoji}</div>
            <h2>O'yin tugadi!</h2>
            <div class="final-score">
                <span class="score-number">${score}</span>
                <span class="score-total">/${questions.length}</span>
            </div>
            <p class="modal-message">${message}</p>
            <div class="score-bar">
                <div class="score-fill" style="width: ${percentage}%"></div>
            </div>
            <button class="restart-btn" onclick="restartGame()">
                🔄 Qayta o'ynash
            </button>
        </div>
    `;

  document.body.appendChild(modal);

  // Анимация заполнения шкалы
  setTimeout(() => {
    modal.querySelector(".score-fill").style.width = percentage + "%";
  }, 300);
}

function restartGame() {
  current = 0;
  score = 0;
  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
  loadQuestion();
}

// Добавляем стили для уведомлений динамически
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        padding: 15px 30px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1.1rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 1.5rem;
    }
    
    .modal-emoji {
        font-size: 4rem;
        margin-bottom: 10px;
        animation: bounce 1s ease infinite;
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .final-score {
        font-size: 3rem;
        font-weight: 900;
        margin: 20px 0;
        font-family: 'Orbitron', sans-serif;
    }
    
    .score-number {
        color: #00d4ff;
        text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
    }
    
    .score-total {
        color: #94a3b8;
    }
    
    .modal-message {
        font-size: 1.2rem;
        color: #e2e8f0;
        margin-bottom: 20px;
    }
    
    .score-bar {
        width: 100%;
        height: 10px;
        background: rgba(255,255,255,0.1);
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 25px;
    }
    
    .score-fill {
        height: 100%;
        background: linear-gradient(90deg, #00d4ff, #7c3aed);
        border-radius: 5px;
        transition: width 1s ease;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
    }
`;
document.head.appendChild(style);

// Запускаем игру
loadQuestion();
