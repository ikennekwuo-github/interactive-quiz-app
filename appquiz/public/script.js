let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedAnswer = null;

fetch("/api/questions")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    loadQuestion();
  });

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => selectAnswer(index);
    answersDiv.appendChild(button);
  });
  document.getElementById("next-button").style.display = "none";
  selectedAnswer = null;
}

function selectAnswer(index) {
  if (selectedAnswer !== null) return;
  selectedAnswer = index;
  const buttons = document.querySelectorAll("#answers button");
  buttons[index].classList.add("selected");
  document.getElementById("next-button").style.display = "block";
  checkAnswer(index);
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll("#answers button");
  buttons[question.correct].classList.add("correct");
  if (selectedIndex === question.correct) {
    score++;
  } else {
    buttons[selectedIndex].classList.add("incorrect");
  }
}

document.getElementById("next-button").onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  document.getElementById("quiz-container").innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: ${score}/${questions.length}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
  submitScore(score);
}

function submitScore(userScore) {
  fetch("/api/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: "User1", score: userScore }),
  });
}
