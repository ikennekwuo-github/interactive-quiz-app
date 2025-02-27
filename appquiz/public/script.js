// Function to fetch quiz data
async function fetchQuizData(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching quiz data:', error);
      alert('Failed to fetch quiz data. Please try again later.');
  }
}

// Function to render quiz
function renderQuiz(quiz) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';

  quiz.questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.className = 'question';

      const questionText = document.createElement('h2');
      questionText.textContent = `${index + 1}. ${question.questionText}`;
      questionElement.appendChild(questionText);

      question.options.forEach(option => {
          const optionElement = document.createElement('div');
          optionElement.className = 'option';

          const optionInput = document.createElement('input');
          optionInput.type = 'radio';
          optionInput.name = `question${index}`;
          optionInput.value = option.optionText;
          optionElement.appendChild(optionInput);

          const optionLabel = document.createElement('label');
          optionLabel.textContent = option.optionText;
          optionElement.appendChild(optionLabel);

          questionElement.appendChild(optionElement);
      });

      quizContainer.appendChild(questionElement);
  });
}

// Function to initialize the quiz app
async function initQuizApp() {
  const quizDataUrl = 'path/to/your/quiz/data.json';
  const quizData = await fetchQuizData(quizDataUrl);
  if (quizData) {
      renderQuiz(quizData);
  }
}

// Initialize the quiz app on page load
document.addEventListener('DOMContentLoaded', initQuizApp);