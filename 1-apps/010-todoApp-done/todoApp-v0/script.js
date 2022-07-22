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
