let carouselInterval;
let currentSpeed = 3000; 

const items = document.querySelectorAll('.carousel-item');
let index = 0;

document.querySelectorAll('.star-rating').forEach(ratingBlock => {
   
    ratingBlock.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

          
            ratingBlock.querySelectorAll('.star').forEach(s => s.textContent = '☆');

           
            for (let i = 0; i < value; i++) {
                ratingBlock.querySelectorAll('.star')[i].textContent = '★';
            }
        });
    });
});

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
       
        const card = this.closest('.card');
       
        const description = card.querySelector('.movie-description');

       
        if (description.style.display === 'none' || description.style.display === '') {
            description.style.display = 'block'; 
            this.textContent = 'Read Less'; 
        } else {
            description.style.display = 'none'; 
            this.textContent = 'Read More'; 
        }
    });
});


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

function startGuessingGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let guess;
    let gameCanceled = false; 

    do {
        const userInput = prompt("Guess a number between 1 and 100:");

        
        if (userInput === null) {
            alert("Game canceled.");
            gameCanceled = true; 
            break; 
        }

    
        guess = parseInt(userInput, 10);
        attempts++;

      
        if (guess > randomNumber) {
            alert("Too high! Try again.");
        } else if (guess < randomNumber) {
            alert("Too low! Try again.");
        } else if (guess === randomNumber) {
            alert(`Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`);
            break; 
        } else {
            alert("Please enter a valid number.");
        }

    } while (guess !== randomNumber && !gameCanceled); 
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const movieTitle = event.dataTransfer.getData("text");

    const watchlist = document.getElementById("watchlist");

   
    if ([...watchlist.children].some(item => item.textContent === movieTitle)) {
        alert("This movie is already in your watchlist!");
        return;
    }

    const listItem = document.createElement("div");
    listItem.className = "watchlist-item";
    listItem.textContent = movieTitle;

 
    listItem.addEventListener("click", () => {
        watchlist.removeChild(listItem); 
    });

    watchlist.appendChild(listItem);
}


document.querySelectorAll(".movie").forEach(movie => {
    movie.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text", movie.getAttribute("data-title"));
    });
});
