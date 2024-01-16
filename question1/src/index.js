import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';


import questions from './utils/questions';
// app.js

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const calculateScoreBtn = document.getElementById('calculate-score-btn');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');

    let currentQuestions = [];
    let userAnswers = [];

    function loadQuestions() {
        // Shuffle questions array to get random questions
        currentQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 3);

        // Display questions and answers
        quizContainer.innerHTML = currentQuestions.map(question => {
            const answersHTML = question.answers.map(answer => `
                <label>
                    <input type="radio" name="question-${question.id}" value="${answer.text}">
                    ${answer.text}
                </label>
            `).join('');

            return `
                <div class="question">
                    <p>${question.question}</p>
                     ${answersHTML}
                </div>
            `;
        }).join('');
        
        // Show the "Calculer le score" button
        calculateScoreBtn.style.display = 'block';
    }

    function calculateScore() {
        userAnswers = [];
        const selectedInputs = document.querySelectorAll('input:checked');

        selectedInputs.forEach(input => {
            const questionId = parseInt(input.name.split('-')[1], 10);
            const answerText = input.value;

            userAnswers.push({ questionId, answerText });
        });

        const score = userAnswers.reduce((acc, userAnswer) => {
            const question = currentQuestions.find(q => q.id === userAnswer.questionId);
            const {isCorrect} = question.answers.find(answer => answer.text === userAnswer.answerText);
            return acc + (isCorrect ? 1 : 0);
        }, 0);

        // Display the score
        resultContainer.style.display = 'block';
        scoreElement.textContent = score;
        quizContainer.style.display = 'none';
        
        // Hide the "Calculer le score" button
        calculateScoreBtn.style.display = 'none';
    }

    function restartQuiz() {
        resultContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestions();
    }

    // Load questions on page load
    loadQuestions();

    // Event listeners
    calculateScoreBtn.addEventListener('click', calculateScore);
    restartBtn.addEventListener('click', restartQuiz);
});
