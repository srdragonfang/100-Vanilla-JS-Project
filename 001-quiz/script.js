const interviewQuiz = [
  {
    question: "JavaScript có bao nhiêu loại khai báo biến?",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    correct: "c",
  },
  {
    question: "Question 2?",
    a: "It's a 2",
    b: "It's b 2",
    c: "It's c 2",
    d: "It's d 2",
    correct: "d",
  },
];
// check interviewQuiz
// console.log(interviewQuiz);
const question = document.getElementById("quiz-question");
const answerA = document.getElementById("answer-title-1");
const answerB = document.getElementById("answer-title-2");
const answerC = document.getElementById("answer-title-3");
const answerD = document.getElementById("answer-title-4");
const answerAll = document.querySelectorAll(".answerQ");

// console.log(answerAll);

questionIndex = 0;
// console.log(question);
score = 0;

loadQuestion();

function loadQuestion() {
  nonAnswerSelect();

  currentQuestion = interviewQuiz[questionIndex];
  // console.log(currentQuestion);
  question.innerHTML = currentQuestion.question;
  answerA.innerHTML = currentQuestion.a;
  answerB.innerHTML = currentQuestion.b;
  answerC.innerHTML = currentQuestion.c;
  answerD.innerHTML = currentQuestion.d;
  //   console.log(answerA.checked);
}

function nonAnswerSelect() {
  answerAll.forEach((answerEl) => {
    answerEl.checked = false;
  });
}
console.log(answerAll[0]);

function answerSelected() {
  let answerUserSelect = undefined;

  answerAll.forEach((answerEl) => {
    if (answerEl.checked) {
      answerUserSelect = answerEl.id;
    }
  });
  return answerUserSelect;
}

function submitAnswer() {
  const answerUserSelect = answerSelected();
  if (answerUserSelect === interviewQuiz[questionIndex].correct) {
    score++;
  }
  questionIndex++;
  if (questionIndex < interviewQuiz.length) {
    loadQuestion();
  } else {
    question.innerHTML = `End Quiz. Your Score: ${score}`;
    document.querySelector(".answer-list").style.display = "none";
  }
}
