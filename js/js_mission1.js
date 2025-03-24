document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const doneList = document.getElementById("doneList");

    // 할일추가
    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && todoInput.value.trim() !== "") {
            addTodo(todoInput.value.trim());
            todoInput.value = "";
        }
    });

    function addTodo(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <button class="complete-btn">완료</button>
        `;

        // 해낸일로이동
        li.querySelector(".complete-btn").addEventListener("click", function () {
            moveToDone(li, task);
            
        });

        todoList.appendChild(li);
    }

    function moveToDone(todoItem, task) {
        todoItem.remove(); //삭제

        const li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <button class="delete-btn">삭제</button>
        `;

        // 제거
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        doneList.appendChild(li);
    }
});
