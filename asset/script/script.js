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
        li.querySelector('input').addEventListener('change', () => toggleTask(task.id));
        li.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.id));
        taskList.appendChild(li);
    };

    const toggleTask = function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            updateTaskStats();
        }
    };

    const deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
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
