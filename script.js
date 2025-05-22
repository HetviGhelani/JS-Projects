document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const addbtn = document.getElementById("addbtn");
  const list = document.getElementById("list");

  let task = JSON.parse(localStorage.getItem("task")) || [];

  task.forEach((tasks) => renderTask(tasks));

  addbtn.addEventListener("click", () => {
    const tasktest = input.value.trim();
    if (tasktest === "") {
      return;
    }
    const newtask = {
      id: Date.now(),
      text: tasktest,
      completed: false,
    };
    task.push(newtask);
    savetask();
    renderTask(newtask);
    input.value = "";
    console.log(task);
  });
  function savetask() {
    localStorage.setItem("task", JSON.stringify(task));
  }
  function renderTask(tasks) {
    console.log(tasks.text);
    const li = document.createElement("li");
    li.setAttribute("data-id", tasks.id);
    if (tasks.completed) li.classList.add("completed");
    li.innerHTML = `
        <span>${tasks.text}</span>
        <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      tasks.completed = !tasks.completed;
      li.classList.toggle("completed");
      savetask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      task = task.filter((t) => t.id !== tasks.id);
      li.remove();
      savetask();
    });
    list.appendChild(li);
  }
});
