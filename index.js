// Select elements
const form = document.querySelector("form");
const taskInput = document.querySelector('input[type="text"]');
const taskList = document.querySelector("ul");
const totalTasks = document.querySelector("footer p");
const clearCompletedBtn = document.querySelector("footer button");

// Update task count
function updateTaskCount() {
    const count = taskList.children.length;
    totalTasks.textContent = `Total Tasks: ${count}`;
}

// Add a new task
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();

    updateTaskCount();
});

// Delete or Edit using Event Delegation
taskList.addEventListener("click", function (event) {

    // Delete task
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove();
        updateTaskCount();
    }

    // Edit task
    if (event.target.classList.contains("edit-btn")) {
        const span = event.target.parentElement.querySelector("span");

        const updatedTask = prompt("Edit task:", span.textContent);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            span.textContent = updatedTask.trim();
        }
    }
});

// Mark completed
taskList.addEventListener("change", function (event) {

    if (event.target.type === "checkbox") {

        const span = event.target.parentElement.querySelector("span");

        if (event.target.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        } else {
            span.style.textDecoration = "none";
            span.style.color = "black";
        }
    }
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", function () {

    const completedTasks = taskList.querySelectorAll("input:checked");

    completedTasks.forEach((checkbox) => {
        checkbox.parentElement.remove();
    });

    updateTaskCount();
});

// Initialize task count on page load
updateTaskCount();