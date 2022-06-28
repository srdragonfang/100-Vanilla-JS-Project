const quizData = [
  {
    question: "What are the different data types present in javascript?",
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
  {
    question: "Question 03",
    a: "Its a",
    b: "Its b",
    c: "Its c",
    d: "Its d",
    type: "none",
    correct: "a",
  },
];
// console.log(quizData);
const dashboard = document.getElementById("dashboard");
const quiz = document.getElementById("quiz");
const quizNoti = document.getElementById("quiz-noti");
const quizWp = document.getElementById("quiz-wrapper");

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

const answers = document.querySelectorAll(".answer-option");
// console.log(answerSelected.children[0].id);
// dashboard

// quiz
let countQuestion = 0;
let currentIndex = 0;
let score = 0;

// dashboard
function submit() {
  dashboard.classList.remove("show");
  dashboard.classList.add("hidden");
  quiz.classList.remove("hidden");
  quiz.classList.add("show");
  loadQuestion();
}

function loadQuestion() {
  cleanAnswer();
  let currentQuestion = quizData[currentIndex];
  if (currentIndex == 3) {
    quizWp.style.display = "none";
    question.innerHTML = `End Quiz. Your Score: ${score}`;
  }
  if (currentIndex < quizData.length && !!quizData[currentIndex].question) {
    question.innerHTML =
      "Question " + countQuestion + ": " + currentQuestion.question;
    if (currentQuestion.type === "none") {
      answer1.innerHTML = currentQuestion.a;
      answer2.innerHTML = currentQuestion.b;
      answer3.innerHTML = currentQuestion.c;
      answer4.innerHTML = currentQuestion.d;
    } else {
      answers4option.style.display = "none";
      answers2option.style.display = "flex";
    }
  }
}
function cleanAnswer() {
  answers.forEach((answer) => {
    answer.children[0].checked = false;
    answer.classList.remove("selected");
    console.log(answer.children[0].checked);
  });
}
function answerElSelected() {
  answers.forEach((answerEl) => {
    cleanAnswer();
    answerEl.addEventListener("click", () => {
      answerEl.children[0].checked = true;
      answerEl.classList.add("selected");
    });
  });
}
answerElSelected();

function submitQuestion() {
  let answerSelected = document.querySelector(".answer-option.selected");
  // console.log(answerSelected.children[0].id);
  // console.log(quizData[currentIndex].correct);
  // console.log("currentIndex", currentIndex);
  // console.log("countQuestion", countQuestion);
  // console.log("quizData.length", quizData.length);
  if (currentIndex < quizData.length && !!quizData[currentIndex].question) {
    if (answerSelected.children[0].id === quizData[currentIndex].correct) {
      // console.log(score);
      score += 1;
      // alert(score);
    }
    currentIndex++;
    countQuestion++;
    console.log("currentIndex", currentIndex);
    console.log("countQuestion", countQuestion);
    loadQuestion();
  }
}
