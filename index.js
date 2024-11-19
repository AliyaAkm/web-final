// date
function updateTime() {
    const now = new Date();
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true};
    const formattedDate = now.toLocaleDateString("en-US", options);
    document.getElementById('date-time').textContent = formattedDate;
}

setInterval(updateTime, 1000);

// приветствие
const greetingGenerator = {
    currentTime: new Date(),

    getHours: function () {
        return this.currentTime.getHours();
    },

    getGreeting: function () {
        const hours = this.getHours();
        let greeting;

        switch (true) {
            case (hours < 12):
                greeting = "Good morning!"; // Утро (00:00 - 11:59)
                break;
            case (hours < 18):
                greeting = "Good afternoon!"; // День (12:00 - 17:59)
                break;
            default:
                greeting = "Good evening!"; // Вечер (18:00 - 23:59)
                break;
        }

        return greeting;
    }
};
document.getElementById('greeting').innerText = greetingGenerator.getGreeting();

// с задержкой меняется фон/плавно
//тема
const themeToggleBtn = document.getElementById('theme-toggle');
const main = document.getElementsByClassName('main-content')[0];
const body = document.body;

// Add an event listener for the button
themeToggleBtn.addEventListener('click', function () {
    // Check the current theme
    setTimeout(function (){
        if (body.classList.contains('day-theme')) {
            // Switch to night theme
            body.classList.remove('day-theme');
            body.classList.add('night-theme');
            main.classList.remove('day-theme');
            main.classList.add('night-theme');
            themeToggleBtn.textContent = 'Switch to Night Theme'; // Change button text
        } else {
            body.classList.remove('night-theme');
            body.classList.add('day-theme');
            main.classList.remove('night-theme');
            main.classList.add('day-theme');
            themeToggleBtn.textContent = 'Switch to Day Theme'; // Change button text
        }
    },1000)
});

//API
const apiKey = '2d5c7316';
const getMovieBtn = document.getElementById('getMovieBtn');
const movieTitleInput = document.getElementById('movieTitle');
const movieInfo = document.getElementById('movieInfo');

// Функция для получения данных о фильме
async function getMovie() {
    const movieTitle = movieTitleInput.value.trim();

    if (movieTitle === '') {
        movieInfo.textContent = 'Введите название фильма.';
        return;
    }

    // Строка URL должна быть в кавычках
    const url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.Response !== "False") {
            displayMovie(data);
        } else {
            movieInfo.textContent = `Фильм не найден: ${data.Error}`;
        }
    } catch (error) {
        movieInfo.textContent = 'Ошибка сети или API: ' + error.message;
    }
}

// Функция для отображения данных о фильме
function displayMovie(data) {
    // HTML должен быть строкой, заключённой в кавычки
    movieInfo.innerHTML = `
        <h3>${data.Title} (${data.Year})</h3>
        <p>Genre: ${data.Genre}</p>
        <p>Rating IMDb: ${data.imdbRating}</p>
        <p>Director: ${data.Director}</p>
        <p>Plot: ${data.Plot}</p>
        <img src="${data.Poster !== 'N/A' ? data.Poster : 'placeholder.jpg'}" alt="Постер фильма">
    `;
}

// Обработчик события на кнопку
getMovieBtn.addEventListener('click', getMovie);

/* keydown*/
document.addEventListener('keydown', (event) => {
    const key = event.key;

    switch (key) {
        case '1':
            window.location.href = 'index.html';
            break;
        case '2':
            window.location.href = 'review.html';
            break;
        case '3':
            window.location.href = 'releases.html';
            break;
        case '4':
            window.location.href = 'contact.html';
            break;
        default:
            break;
    }
});

// Define the sound functions
function playAvatarSound() {
    var avatarSound = new Audio('sound/avatar.mp3');
    avatarSound.play();
}

function playGoneWithTheWindSound() {
    var windSound = new Audio('sound/Gone with the wind.mp3');
    windSound.play();
}

function playLittleWomenSound() {
    var womenSound = new Audio('sound/little women.mp3');
    womenSound.play();
}

function playTitanicSound() {
    var titanicSound = new Audio('sound/titanic.mp3');
    titanicSound.play();
}

function playSpiderManSound() {
    var spiderManSound = new Audio('sound/New spider-man.mp3');
    spiderManSound.play();
}


// Intersection Observer 
const actorCards = document.querySelectorAll('.actor-card');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
        }
    });
}, { threshold: 0.5 });

actorCards.forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
});


// АКТЕРЫ РАНГ
// Top Actors/Directors Data
const actorData = [
    { name: "Leonardo DiCaprio", movies: 30, boxOffice: 8.5 },
    { name: "Emma Stone", movies: 25, boxOffice: 4.0 },
    { name: "Robert Downey Jr.", movies: 50, boxOffice: 12.0 },
    { name: "Jennifer Aniston", movies: 35, boxOffice: 6.5 }
];

// Initialize Highcharts
Highcharts.chart('actors-chart-container', {
    chart: {
        type: 'column',
        backgroundColor: '#ffffff', // White background for the chart
        borderRadius: 10,
        style: {
            fontFamily: "'Times New Roman', Times, serif" // Match website's font
        }
    },
    title: {
        text: 'Top Actors by Movies and Box Office',
        style: {
            color: '#000000', // Black title for better contrast
            fontSize: '20px',
            fontWeight: 'bold'
        }
    },
    xAxis: {
        categories: actorData.map(actor => actor.name),
        labels: {
            style: {
                color: '#333333', // Dark gray labels for readability
                fontSize: '14px'
            }
        },
        lineColor: '#333333', // Dark gray axis line
        title: {
            text: 'Actors/Directors',
            style: {
                color: '#333333',
                fontSize: '16px'
            }
        }
    },
    yAxis: {
        gridLineColor: '#dddddd', // Light gray grid lines
        title: {
            text: 'Count (Movies) / Revenue (Billions $)',
            style: {
                color: '#333333',
                fontSize: '16px'
            }
        },
        labels: {
            style: {
                color: '#333333', // Dark gray labels
                fontSize: '14px'
            }
        }
    },
    legend: {
        itemStyle: {
            color: '#333333', // Dark gray legend text
            fontSize: '14px'
        },
        itemHoverStyle: {
            color: '#000000' // Black legend item on hover
        }
    },
    tooltip: {
        backgroundColor: '#ffffff', // White tooltip background
        borderColor: '#333333', // Dark gray border
        style: {
            color: '#000000' // Black text in tooltip
        },
        shared: true,
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.y}<br>'
    },
    series: [
        {
            name: 'Movies',
            data: actorData.map(actor => actor.movies),
            color: '#1e90ff', // Blue for movies
            borderRadius: 5
        },
        {
            name: 'Box Office Revenue (Billion $)',
            data: actorData.map(actor => actor.boxOffice),
            color: '#28a745', // Green for revenue
            borderRadius: 5
        }
    ],
    plotOptions: {
        column: {
            dataLabels: {
                enabled: true,
                style: {
                    color: '#000000', // Black labels for contrast
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textOutline: 'none' // No text outline for clean look
                }
            },
            borderWidth: 0
        }
    }
});
