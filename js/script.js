const todos = [];
const RENDER_EVENT = "todo-render";

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", e => {
    e.preventDefault();
    addTodo();
    document.dispatchEvent(new Event(RENDER_EVENT));
  });
});

function generateId() {
  return +new Date();
}

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const dateTodo = document.getElementById("date").value;

  const id = generateId();

  const todo = generateObject(id, textTodo, dateTodo, false);
  todos.push(todo);
}

function generateObject(id, title, date, isCompleted) {
  return {
    id: id,
    title: title,
    date: date,
    isCompleted: isCompleted,
  };
}

function makeTodo(object) {
  const text = document.createElement("h2");
  text.innerText = object.title;

  const date = document.createElement("p");
  date.innerHTML = object.date;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(text, date);

  const container = document.createElement("div");
  container.classList.add("shadow", "item");
  container.append(textContainer);
  container.setAttribute("id", `todo-${object.id}`);

  return container;
}

document.addEventListener(RENDER_EVENT, () => {
  console.log(todos);
  const uncompletedList = document.getElementById("todos");

  //todos sudah ada push dulu di fungsi addTodo
  const newTodo = todos[todos.length - 1]; //karena index pada array
  const todoElement = makeTodo(newTodo);

  if (!newTodo.isCompleted) {
    uncompletedList.append(todoElement);
  }
});
