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
  console.log(this.parentElement);
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

const todoDoc = JSON.parse(localStorage.getItem("todoApp"));
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
          <div class="todo-btn">
          <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
          <div class="todo-tools">
            <div class="todo-tool chapterCl" id="chapter">Chapter</div>
            <div class="todo-tool sceneCl" id="scene">Scene</div>
            <div class="todo-tool importCl" id="import">Important</div>
            <div class="todo-tool" id="delete">Delete</div>
          </div>
      `;
    todo.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todo.remove();
      updateLS();
    });

    todoList.appendChild(todo);
    inputText.value = "";
    updateLS();
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);

    const todoBtns = document.querySelectorAll(".todo-btn");
    const todoTools = document.querySelectorAll(".todo-tools");
    const toolChapters = document.querySelectorAll(".chapterCl");
    const toolScenes = document.querySelectorAll(".sceneCl");
    const toolImports = document.querySelectorAll(".importCl");

    todoBtns.forEach((todoBtn) => {
      todoBtn.onclick = function () {
        todoTools.forEach((todoTool) => {
          todoTool.classList.toggle("active");
        });
      };
    });
    toolChapters.forEach((toolChapter) => {
      toolChapter.onclick = function () {
        todo.classList.remove("scene");
        todo.classList.remove("import");
        todo.classList.toggle("chapter");
      };
    });
    toolScenes.forEach((toolScene) => {
      toolScene.onclick = function () {
        todo.classList.remove("chapter");
        todo.classList.remove("import");
        todo.classList.toggle("scene");
      };
    });
    toolImports.forEach((toolImport) => {
      toolImport.onclick = function () {
        todo.classList.remove("chapter");
        todo.classList.remove("scene");
        todo.classList.toggle("import");
      };
    });
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll(".todo");
  const todoList = [];
  todosEl.forEach((todoEl) => {
    todoList.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todoApp", JSON.stringify(todoList));
}
