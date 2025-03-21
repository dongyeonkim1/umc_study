const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
}

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

/* 할 일 목록 렌더링 하는 함수 정의 */
const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = ''; 

    todos.forEach((todo): void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo): void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

/* 할 일 텍스트 입력 처리 함수(공백자르기) */
const getTodoText = (): string => {
    return todoInput.value.trim();
};

/* 할 일 추가 함수 */
const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
};


/* 할 일 상태 변경 (완료로 이동) */
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

/* 완료된 할 일 삭제 함수 */
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTasks();
};


/* 할 일 아이템 생성 함수 */
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';  
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';  
    }
    
    button.addEventListener('click', (): void => {
        if(isDone) {
            deleteTodo(todo);
        } else {
            completeTodo(todo)
        }
    });

    li.appendChild(button);
    return li;
};


/* 이벤트 처리 */
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks();





 