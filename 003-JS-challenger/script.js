const quizData = [
  {
    question: "Question 01",
    a: "Its a",
    b: "Its b",
    c: "Its c",
    d: "Its d",
    type: "none",
    correct: "a",
  },
  {
    question: "Question 02",
    a: "Its a",
    b: "Its b",
    c: "Its c",
    d: "Its d",
    type: "none",
    correct: "a",
  },
];
console.log(quizData);
const dashboard = document.getElementById("dashboard");
const quiz = document.getElementById("quiz");
const answers4option = document.getElementById("answers-4option");
const answers2option = document.getElementById("answers-2option");
// quiz
const question = document.getElementById("question");
const answer1 = document.getElementById("answer-1"); // a
const answer2 = document.getElementById("answer-2"); // b
const answer3 = document.getElementById("answer-3"); // c
const answer4 = document.getElementById("answer-4"); // d
const answer5 = document.getElementById("answer-5"); // true
const answer6 = document.getElementById("answer-6"); // false
// dashboard

// quiz
let currentIndex = 0;
let currentQuestion = quizData[currentIndex];
question.innerHTML = currentQuestion.question;
if (currentQuestion.type === "none") {
  answer1.innerHTML = currentQuestion.a;
  answer2.innerHTML = currentQuestion.b;
  answer3.innerHTML = currentQuestion.c;
  answer4.innerHTML = currentQuestion.d;
} else {
  answers4option.classList.remove("show");
  answers4option.classList.add("hidden");
  answers2option.classList.remove("hidden");
  answers2option.classList.add("show");
}

// dashboard

function submit() {
  dashboard.classList.remove("show");
  dashboard.classList.add("hidden");
  quiz.classList.remove("hidden");
  quiz.classList.add("show");
}
