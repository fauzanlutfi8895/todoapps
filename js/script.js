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

function addTodo() {
  const titleTodo = document.getElementById("title").value;
  const dateTodo = document.getElementById("date").value;

  const id = generateId();

  const todoObject = generateObject(id, titleTodo, dateTodo, false);

  todos.push(todoObject);
}

function generateId() {
  return +new Date();
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
  const titleText = document.createElement("h2");
  titleText.innerText = object.title;

  const dateText = document.createElement("p");
  dateText.innerText = object.date;

  const containerText = document.createElement("div");
  containerText.classList.add("inner");
  containerText.append(titleText, dateText);

  const container = document.createElement("div");
  container.classList.add("shadow", "item");
  container.append(containerText);

  if (object.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", () => {
      undoTaskFromCompleted(object.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", () => {
      removeTaskFromCompleted(object.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", () => {
      addTaskToCompleted(object.id);
    });

    container.append(checkButton);
  }

  return container;
}

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget === null) return;

  todoTarget.isCompleted = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId) {
  for (todo of todos) {
    if (todo.id === todoId) {
      return todo;
    }
  }
  return null;
}

document.addEventListener(RENDER_EVENT, () => {
  console.log(todos);
  const uncompletedList = document.getElementById("todos");
  uncompletedList.innerHTML = "";

  const todo = todos[todos.length - 1];
  const elementTodo = makeTodo(todo);
  if (!todo.isCompleted) {
    uncompletedList.append(elementTodo);
  } else {
    return;
  }
});
