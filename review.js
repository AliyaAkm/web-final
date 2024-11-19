
//рейтинг
// Получаем все блоки с рейтингом на странице
document.querySelectorAll('.star-rating').forEach(ratingBlock => {
    // В каждом блоке обрабатываем клики по звездочкам
    ratingBlock.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            // Сбрасываем цвет всех звездочек
            ratingBlock.querySelectorAll('.star').forEach(s => s.textContent = '☆');

            // Закрашиваем выбранные звезды
            for (let i = 0; i < value; i++) {
                ratingBlock.querySelectorAll('.star')[i].textContent = '★';
            }
        });
    });
});

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        // Получаем родительскую карточку
        const card = this.closest('.card');
        // Находим описание фильма внутри этой карточки
        const description = card.querySelector('.movie-description');

        // Переключаем видимость описания
        if (description.style.display === 'none' || description.style.display === '') {
            description.style.display = 'block'; // Показываем описание
            this.textContent = 'Read Less'; // Меняем текст кнопки
        } else {
            description.style.display = 'none'; // Скрываем описание
            this.textContent = 'Read More'; // Меняем текст кнопки
        }
    });
});


// to do list
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    const taskList = document.getElementById('taskList');
    if(taskList.children.length >= 5){
        alert("You can only add 5 task");
        return;
    }

    if (taskText === '') {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `<span onclick="toggleTask(this)" style="cursor: pointer;">${taskText}</span>
                        <button onclick="removeTask(this)" class="btn btn-danger btn-sm">Delete</button>`;

    document.getElementById('taskList').appendChild(li);
    taskInput.value = '';
}

function removeTask(button) {
    const task = button.parentElement;
    document.getElementById('taskList').removeChild(task);
}

function toggleTask(taskElement) {
    taskElement.classList.toggle('completed');
}

// game
function startGuessingGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let guess;
    let gameCanceled = false; // Переменная для отслеживания отмены игры

    do {
        const userInput = prompt("Guess a number between 1 and 100:");

        // Проверка на "Отмена"
        if (userInput === null) {
            alert("Game canceled.");
            gameCanceled = true; // Устанавливаем флаг отмены
            break; // Прерываем цикл
        }

        // Преобразуем введенные данные в число
        guess = parseInt(userInput, 10);
        attempts++;

        // Проверка введенного числа
        if (guess > randomNumber) {
            alert("Too high! Try again.");
        } else if (guess < randomNumber) {
            alert("Too low! Try again.");
        } else if (guess === randomNumber) {
            alert(`Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`);
            break; // Выходим из цикла, так как угадали число
        } else {
            alert("Please enter a valid number.");
        }

    } while (guess !== randomNumber && !gameCanceled); // Выходим из цикла, если число угадано или игра отменена
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const movieTitle = event.dataTransfer.getData("text");

    const watchlist = document.getElementById("watchlist");

    // Check for duplicates
    if ([...watchlist.children].some(item => item.textContent === movieTitle)) {
        alert("This movie is already in your watchlist!");
        return;
    }

    // Create a new watchlist item
    const listItem = document.createElement("div");
    listItem.className = "watchlist-item";
    listItem.textContent = movieTitle;

    // Add click event to remove the movie
    listItem.addEventListener("click", () => {
        watchlist.removeChild(listItem); // Remove the item on click
    });

    watchlist.appendChild(listItem);
}

// Enable drag functionality for each movie
document.querySelectorAll(".movie").forEach(movie => {
    movie.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text", movie.getAttribute("data-title"));
    });
});
