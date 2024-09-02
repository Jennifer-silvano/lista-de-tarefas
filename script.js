document.addEventListener('DOMContentLoaded', () => {
    const currentDate = document.getElementById('currentDate');
    const newTaskBtn = document.getElementById('newTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const closeModalBtn = document.querySelector('.close');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskRecommendations = document.getElementById('taskRecommendations');
    const allBtn = document.getElementById('allBtn');
    const morningBtn = document.getElementById('morningBtn');
    const afternoonBtn = document.getElementById('afternoonBtn');
    const eveningBtn = document.getElementById('eveningBtn');

    // Exemplo de tarefas armazenadas
    let tasks = [];

    // Define a data de hoje
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    currentDate.textContent = formattedDate;

    // Exemplo de recomendações de tarefas
    const recommendations = [
        "Revisar notas de estudo",
        "Organizar documentos",
        "Fazer exercício físico",
        "Planejar refeições da semana"
    ];

    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        li.addEventListener('click', () => {
            document.getElementById('taskName').value = rec;
        });
        taskRecommendations.appendChild(li);
    });

    // Abrir modal
    newTaskBtn.addEventListener('click', () => {
        taskModal.style.display = "block";
    });

    // Fechar modal
    closeModalBtn.addEventListener('click', () => {
        taskModal.style.display = "none";
    });

    // Salvar nova tarefa
    saveTaskBtn.addEventListener('click', () => {
        const taskName = document.getElementById('taskName').value.trim();
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        if (taskName) {
            const task = { name: taskName, date: taskDate, time: taskTime };
            tasks.push(task);
            renderTasks();
            taskModal.style.display = "none";
        } else {
            alert("Por favor, preencha o nome da tarefa.");
        }
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
        }
    });

    function renderTasks(filterFunc = () => true) {
        taskList.innerHTML = ''; // Limpa a lista de tarefas
        tasks.filter(filterFunc).forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task-info">
                    <div class="task-check"></div>
                    <span>${task.name}</span>
                </div>
                <button class="remove-btn"><img src="https://cdn-icons-png.flaticon.com/512/3581/3581646.png" alt="Excluir"></button>
                <div class="task-details">Data: ${task.date} Hora: ${task.time}</div>
            `;
            
            const taskCheck = li.querySelector('.task-check');
            taskCheck.addEventListener('click', () => {
                taskCheck.classList.toggle('completed');
            });

            const removeBtn = li.querySelector('.remove-btn');
            removeBtn.addEventListener('click', () => {
                taskList.removeChild(li);
                tasks = tasks.filter(t => t !== task); // Remove a tarefa da lista
            });

            li.addEventListener('click', () => {
                li.classList.toggle('expanded');
            });

            taskList.appendChild(li);
        });
    }

    function filterAll() {
        renderTasks();
    }

    function filterMorning() {
        renderTasks(task => {
            const hour = parseInt(task.time.split(':')[0], 10);
            return hour >= 6 && hour < 12;
        });
    }

    function filterAfternoon() {
        renderTasks(task => {
            const hour = parseInt(task.time.split(':')[0], 10);
            return hour >= 12 && hour < 18;
        });
    }

    function filterEvening() {
        renderTasks(task => {
            const hour = parseInt(task.time.split(':')[0], 10);
            return hour >= 18 && hour <= 23;
        });
    }

    allBtn.addEventListener('click', () => {
        filterAll();
        setActiveButton(allBtn);
    });

    morningBtn.addEventListener('click', () => {
        filterMorning();
        setActiveButton(morningBtn);
    });

    afternoonBtn.addEventListener('click', () => {
        filterAfternoon();
        setActiveButton(afternoonBtn);
    });

    eveningBtn.addEventListener('click', () => {
        filterEvening();
        setActiveButton(eveningBtn);
    });

    function setActiveButton(button) {
        [allBtn, morningBtn, afternoonBtn, eveningBtn].forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    // Inicialmente mostrar todas as tarefas
    filterAll();
});
