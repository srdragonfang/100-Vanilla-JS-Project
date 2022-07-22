const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");

let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "flex";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

const todoList = document.querySelector(".todoList");
const addBtn = document.getElementById("addBtn");
const form = document.getElementById("form-1");
const inputText = document.getElementById("inputText");

const todoDoc = JSON.parse(localStorage.getItem("TCOM2"));
console.log(todoDoc);
if (todoDoc) {
  todoDoc.forEach((todoItem) => {
    addNewTodo(todoItem);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
function addNewTodo(todoItem) {
  let todoText = inputText.value;
  if (todoItem) {
    todoText = todoItem.text;
  }
  if (todoText) {
    const todo = document.createElement("div");

    if (todoItem && todoItem.completed) {
      todo.classList.add("completed");
    }
    todo.classList.add("todo");
    todo.setAttribute("draggable", "true");
    todo.innerHTML = `
          <p class="todo-item">${todoText}</p>
      `;
    todo.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todo.remove();
      updateLS();
    });

    todo.addEventListener("click", (e) => {
      e.preventDefault();
      todo.classList.toggle("completed");
      updateLS();
    });
    todoList.appendChild(todo);
    inputText.value = "";
    updateLS();
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
  }
}

function updateLS() {
  const todoList = [];
  todos.forEach((todos) => {
    todoList.push({
      text: todos.innerText,
      completed: todos.classList.contains("completed"),
    });
  });
  localStorage.setItem("TCOM2", JSON.stringify(todoList));
}
