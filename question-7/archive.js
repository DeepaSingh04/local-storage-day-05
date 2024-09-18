let archivedTodos = JSON.parse(localStorage.getItem('archivedTodos')) || [];

document.getElementById('filter-priority').addEventListener('change', filterArchivedTodos);

function renderArchivedTodos(filteredTodos) {
    const archiveList = document.getElementById('archive-list');
    archiveList.innerHTML = '';

    (filteredTodos || archivedTodos).forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${todo.text} [${todo.priority}] <button onclick="restore(${index})">Restore</button> <button onclick="deleteArchived(${index})">Delete</button>`;
        archiveList.appendChild(li);
    });
}

function restore(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(archivedTodos[index]);
    archivedTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos));
    renderArchivedTodos();
}

function deleteArchived(index) {
    archivedTodos.splice(index, 1);
    localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos));
    renderArchivedTodos();
}

function filterArchivedTodos() {
    const filterValue = document.getElementById('filter-priority').value;
    if (filterValue === 'all') {
        renderArchivedTodos();
    } else {
        const filteredTodos = archivedTodos.filter(todo => todo.priority === filterValue);
        renderArchivedTodos(filteredTodos);
    }
}

document.getElementById('back').addEventListener('click', () => {
    window.location.href = 'index.html';
});

renderArchivedTodos();
