const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const errorMessage = document.getElementById("errorMessage");
const list = document.getElementById("daftar");

//LOCALSTROGE-buka tugas
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
});

//input tugas baru
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const value = input.value.trim();

  if (value === "") {
    errorMessage.textContent = "Field tidak boleh kosong";
    input.classList.add("invalid");
    input.classList.remove("valid");
    return;
  }

  errorMessage.textContent = "";
  input.classList.remove("invalid");
  input.classList.add("valid");

  addTask(value);
  input.value = "";
});

// tugas-> daftar
function addTask(text, completed = false) {
  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit tugas:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  saveTasks();
}

// save ke lokal
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(li => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
