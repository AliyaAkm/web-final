document.getElementById('sortForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numbersInput = document.getElementById('numbers').value;
    const order = document.getElementById('order').value;
    const resultDiv = document.getElementById('result');

    const numbersArray = numbersInput.split(',').map(num => num.trim()).filter(num => !isNaN(num) && num !== '');

    if (numbersArray.length === 0) {
        resultDiv.innerHTML = '<p style="color:red;">Please enter valid numbers.</p>';
        return;
    }

    const numericArray = numbersArray.map(Number);

    if (order === 'ascending') {
        numericArray.sort((a, b) => a - b);
    } else {
        numericArray.sort((a, b) => b - a);
    }

    resultDiv.innerHTML = `<p>Sorted Numbers: ${numericArray.join(', ')}</p>`;
});

const changeColorBtn = document.getElementById('changeColorBtn');
const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ffcc99'];

changeColorBtn.addEventListener('click', function() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});

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


window.addEventListener('load', () => {
    const releaseItems = document.querySelectorAll('.release-list li');
    releaseItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible'); 
        }, index * 200); 
    });
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'translateX(0)';
  });
  