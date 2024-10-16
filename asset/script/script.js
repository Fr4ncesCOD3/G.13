document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const completedTasksSpan = document.getElementById('completed-tasks');
    const remainingTasksSpan = document.getElementById('remaining-tasks');

    let tasks = [];

    const updateTaskStats = function() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const remainingTasks = tasks.length - completedTasks;
        completedTasksSpan.textContent = completedTasks;
        remainingTasksSpan.textContent = remainingTasks;
    };

    const addTask = function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { id: Date.now(), text: taskText, completed: false };
            tasks.push(task);
            renderTask(task);
            taskInput.value = '';
            updateTaskStats();
        }
    };

    const renderTask = function(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button class="delete-task">Elimina</button>
        `;
        li.querySelector('input').addEventListener('change', () => toggleTask(task.id, li));
        li.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.id, li));
        taskList.appendChild(li);
    };

    const toggleTask = function(id, li) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            if (task.completed) {
                li.dataset.timeout = setTimeout(() => {
                    li.style.opacity = '0';
                    li.style.height = '0';
                    li.style.margin = '0';
                    li.style.padding = '0';
                    li.dataset.deleteTimeout = setTimeout(() => {
                        deleteTask(id, li);
                    }, 500);
                }, 2000);
            } else {
                clearTimeout(Number(li.dataset.timeout));
                clearTimeout(Number(li.dataset.deleteTimeout));
                li.style.opacity = '';
                li.style.height = '';
                li.style.margin = '';
                li.style.padding = '';
            }
            updateTaskStats();
        }
    };

    const deleteTask = function(id, li) {
        tasks = tasks.filter(t => t.id !== id);
        li.remove();
        updateTaskStats();
    };

    const renderTasks = function() {
        taskList.innerHTML = '';
        tasks.forEach(renderTask);
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
    updateTaskStats();
});
