const $ = document.getElementById.bind(document);
const $$ = document.querySelectorAll.bind(document);

var quizAPI = "./data/data.json";
// console.log(quizAPI);

async function getPosts() {
  const res = await fetch(quizAPI);

  const data = await res.json();
  // console.log(data.quizData);
  return data.quizData;
}

const dashboard = $("dashboard");
const quiz = $("quiz");
const quizNoti = $("quiz-noti");
const quizWp = $("quiz-wrapper");

const answers4option = $("answers-4option");
const answers2option = $("answers-2option");
// quiz
const question = $("question");
const answer1 = $("answer-1"); // a
const answer2 = $("answer-2"); // b
const answer3 = $("answer-3"); // c
const answer4 = $("answer-4"); // d
const answer5 = $("answer-5"); // true
const answer6 = $("answer-6"); // false

const answers = document.querySelectorAll(".answer-option");
// console.log(answerSelected.children[0].id);
// dashboard
const quizExport = $("quiz-export");
const allQuestions = $("option-7");

// quiz
function quizApp() {}
let countQuestion = 1;
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

async function loadQuestion() {
  let quizData = await getPosts();
  cleanAnswer();
  let currentQuestion = quizData[currentIndex];
  if (
    currentIndex == quizData.length ||
    quizData[currentIndex].question == "" // end quiz when get question = ''
  ) {
    quizWp.style.display = "none";
    question.innerHTML = `End Quiz. Your Score: ${score}`;
    quizExport.style.display = "flex";
  } else if (
    currentIndex < quizData.length &&
    !!quizData[currentIndex].question
  ) {
    question.innerHTML =
      "Question " + countQuestion + ": " + currentQuestion.question;
    if (currentQuestion.type === "none") {
      answers4option.style.display = "flex";
      answers2option.style.display = "none";
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
// set answer - checked = false
function cleanAnswer() {
  answers.forEach((answer) => {
    answer.children[0].checked = false;
    answer.classList.remove("selected");
    console.log(answer.children[0].checked);
  });
}
function answerSelected() {
  answers.forEach((answerEl) => {
    answerEl.addEventListener("click", () => {
      cleanAnswer(); // fix bug old selected option not delete class="seleted"
      answerEl.children[0].checked = true;
      answerEl.classList.add("selected");
    });
  });
}
answerSelected();

async function submitQuestion() {
  let quizData = await getPosts(); // khai báo 2 lần không có ổn lắm - kiểu này thủ công qu
  let answerUserSelected = document.querySelector(".answer-option.selected");

  if (currentIndex < quizData.length && !!quizData[currentIndex].question) {
    if (
      !!answerUserSelected &&
      answerUserSelected.children[0].id === quizData[currentIndex].correct
    ) {
      score += 1;
    }
    currentIndex++;
    countQuestion++;
    console.log("currentIndex", currentIndex);
    console.log("countQuestion", countQuestion);
    loadQuestion();
  }
}
