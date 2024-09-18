let todos = JSON.parse(localStorage.getItem('todos')) || [];
let archivedTodos = JSON.parse(localStorage.getItem('archivedTodos')) || [];

document.getElementById('add-todo').addEventListener('click', () => {
    const text = document.getElementById('todo-text').value;
    const priority = document.getElementById('priority').value;

    if (text) {
        const newTodo = { text, priority, status: 'active' };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        document.getElementById('todo-text').value = '';
    }
});

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${todo.text} [${todo.priority}] <button onclick="archive(${index})">Archive</button>`;
        todoList.appendChild(li);
    });
}

function archive(index) {
    archivedTodos.push(todos[index]);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos));
    renderTodos();
}

document.getElementById('view-archive').addEventListener('click', () => {
    window.location.href = 'archive.html';
});

renderTodos();
