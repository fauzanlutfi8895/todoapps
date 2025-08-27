const todos = [];
const RENDER_EVENT = "render-todo";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", e => (e.preventDefault(), addTodo()));
});

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const dateTodo = document.getElementById("date").value;

  const id = generateId();
  const todoObject = generateObject(id, textTodo, dateTodo, false);
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function generateObject(id, text, date, isComplete) {
  return {
    id: id,
    text: text,
    date: date,
    isComplete: isComplete,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);
});
