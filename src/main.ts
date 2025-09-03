import './style.css';
import confetti from 'canvas-confetti';

const bgmUrl = 'https://www.youtube.com/embed/5U55t9LIU_o?autoplay=1&playlist=5U55t9LIU_o&loop=1';

function playHeartEffect(): void {
  // ハートの紙吹雪を生成
    confetti({
    particleCount: 75,
    spread: 100,
    shapes: ['heart'],
    colors: ['#fab53eff', '#ff69b4', '#ffef14ff'],
    scalar: 1.5,
    });
}

function playBGM(): void {
    const iframe = document.createElement('iframe');
    iframe.src = bgmUrl;
    iframe.width = '0';
    iframe.height = '0';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.title = '誕生日のお祝いBGM';
    iframe.style.display = 'none';

    document.body.appendChild(iframe);
}

// --- クイズのロジック ---
const quizData = [
    {
        question: "このサイトを作り始めたのはいつ？",
        answers: [
            { text: "8月14日", correct: false },
            { text: "8月30日", correct: true },
            { text: "㋈2日", correct: false }
        ]
    },
    {
        question: "今回の誕生日プレゼントは何個？",
        answers: [
            { text: "4個", correct: false },
            { text: "28個", correct: false },
            { text: "数えてない", correct: true }
        ]
    },
    {
        question: "誕生日にしてもらえて1番嬉しかったことは？",
        answers: [
            { text: "一緒にいれたこと", correct: true },
            { text: "ご飯作ってくれたこと", correct: false },
            { text: "プレゼントをたくさんもらえたこと", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container') as HTMLElement;
const questionText = document.getElementById('question-text') as HTMLElement;
const answerButtons = document.getElementById('answer-buttons') as HTMLElement;
const quizResult = document.getElementById('quiz-result') as HTMLElement;
const resetButton = document.getElementById('reset-button') as HTMLElement;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuiz = quizData[currentQuestionIndex];
    questionText.innerText = currentQuiz.question;

    currentQuiz.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    quizResult.innerText = "";
}

function selectAnswer(e: Event) {
    const selectedButton = e.target as HTMLButtonElement;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedButton.style.backgroundColor = '#90EE90'; // 正解
    } else {
        selectedButton.style.backgroundColor = '#FFB6C1'; // 不正解
    }

    Array.from(answerButtons.children).forEach(button => {
        (button as HTMLButtonElement).disabled = true;
    });

    if (currentQuestionIndex < quizData.length - 1) {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 1000);
    } else {
        setTimeout(() => {
            showResult();
        }, 1000);
    }
}



function showResult() {
    resetState();
    quizResult.innerText = `${quizData.length}問中${score}問正解しました！`;
    
    if (score === quizData.length) {
        quizResult.innerHTML += `<br>🥳 おめでとう！素敵なプレゼントがまってるよ！`;
        
        // 全問正解したらプレゼント交換券を表示
        const couponSection = document.createElement('div');
        couponSection.innerHTML = `
            <h3>プレゼント交換券ゲット！</h3>
            <p>下のボタンを押して画像を保存してね！</p>
            <img src="./public/purezent.png" alt="プレゼント交換券" style="max-width: 250px; margin-top: 1rem;">
            <a href="./public/purezent.png" download="プレゼント交換券.png" class="download-link" style="display: block; text-align: center;">
                <button id="download-button">
                    <i class="fas fa-heart"></i> ダウンロード <i class="fas fa-arrow-down"></i>
                </button>
            </a>
        `;
        quizResult.appendChild(couponSection);

    } else {
        quizResult.innerHTML += `<br>残念！もう一度チャンスをあげる！`;
    }
    
    // リセットボタンを表示
    resetButton.style.display = 'block';
}

// --- クイズのロジック ---
// ... (既存のクイズロジック) ...
resetButton.addEventListener('click', () => {
    startQuiz();
    resetButton.style.display = 'none'; // リセットボタンを非表示にする
});

function checkPassword(): void {
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;
    if (!passwordInput) {
        return;
    }

    const password = passwordInput.value;
    const correctPassword = 'smile0728kyaru';

    if (password === correctPassword) {
        const overlay = document.getElementById('password-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        playHeartEffect();
        startQuiz();
    } else {
        alert('招待コードが違います。もう一度試してください。');
    }
}

// BGM再生ボタンがクリックされたときにBGMを再生
document.getElementById('play-bgm-button')?.addEventListener('click', () => {
    playBGM();
});


// グローバルスコープに関数を公開
(window as any).checkPassword = checkPassword;

// パスワード入力フィールドでEnterキーを押したらチェック
document.getElementById('password-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});