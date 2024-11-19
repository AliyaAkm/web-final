const questions = [
    {
      question:"Which movie won the Oscar for Best Picture in 2023?",
      answers:[
        {text:"\"Everything Everywhere All at Once\"",correct:true},
        {text:"\"Avatar: The Way of Water\"",correct:false},
        {text:"\"Top Gun: Maverick\"",correct:false},
        {text:"\"The Fabelmans\"",correct:false},
      ]
    },
    {
      question:"What is the name of the main character in the movie \"Interstellar\"?",
      answers:[
        {text:"Cooper",correct:true},
        {text:"Murphy",correct:false},
        {text:"Brand",correct:false},
        {text:"Tom",correct:false},
      ]
    },
    {
      question:"Which of these movies was made by Pixar?",
      answers:[
        {text:"\"Monsters, Inc.\"",correct:true},
        {text:"\"Shrek\"",correct:false},
        {text:"\"Ice Age\"",correct:false},
        {text:"\"How to Train Your Dragon\"",correct:false},
      ]
    },
    {
      question:"What is the name of the main character in \"The Matrix\"?",
      answers:[
        {text:"Neo",correct:true},
        {text:"Morpheus",correct:false},
        {text:"Trinity",correct:false},
        {text:"Smith",correct:false},
      ]
    },
    {
      question:"Who played the Joker in \"The Dark Knight\"?",
      answers:[
        {text:"Heath Ledger",correct:true},
        {text:"Jared Leto",correct:false},
        {text:"Joaquin Phoenix",correct:false},
        {text:"Jack Nicholson",correct:false},
      ]
    },
    {
      question:"In which movie was the phrase \"I'll be back\" spoken?",
      answers:[
        {text:"\"The Terminator\"",correct:true},
        {text:"\"Rambo\"",correct:false},
        {text:"\"Predator\"",correct:false},
        {text:"\"RoboCop\"",correct:false},
      ]
    },
    {
      question:"What is the name of the planet where the events of \"Avatar\" take place?",
      answers:[
        {text:"Pandora",correct:true},
        {text:"Tatooine",correct:false},
        {text:"Zenith",correct:false},
        {text:"Oberon",correct:false},
      ]
    },
    {
      question:"Which movie opened the Marvel Cinematic Universe (MCU)?",
      answers:[
        {text:"\"Iron Man\"",correct:true},
        {text:"\"The Incredible Hulk\"",correct:false},
        {text:"\"Captain America: The First Avenger\"",correct:false},
        {text:"\"Thor\"",correct:false},
      ]
    },
    {
      question:"Who directed the movie \"Inception\"?",
      answers:[
        {text:"Christopher Nolan",correct:true},
        {text:"Steven Spielberg",correct:false},
        {text:"James Cameron",correct:false},
        {text:"Ridley Scott",correct:false},
      ]
    },
    {
      question:"What is the name of the lion in the movie \"Madagascar\"?",
      answers:[
        {text:"Alex",correct:true},
        {text:"Marty",correct:false},
        {text:"Gloria",correct:false},
        {text:"Melman",correct:false},
      ]
    }
];

  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionsIndex = 0;
  let score = 0;
  
  function startQuiz(){
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
  }
  
  function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click",selectAnswer);
    });
  }
  
  function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }
    else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton(){
    currentQuestionsIndex++;
    if(currentQuestionsIndex < questions.length){
      showQuestions();
    }
    else{
      showScore();
    }
  }
  
  
  nextButton.addEventListener("click", ()=>{
    if(currentQuestionsIndex < questions.length){
      handleNextButton();
    }
    else{
      startQuiz();
    }
  })
  
  
  startQuiz();



VanillaTilt.init(document.querySelectorAll(".sci li a"), {
    max: 30,
    speed: 400,
    glare:true,
    "max-glare":1,
  });


tippy('.facebook',{
  content:"Facebook",
  placement:'bottom'
})

tippy('.twitter',{
  content:"Twitter",
  placement:'bottom'
})

tippy('.youtube',{
  content:"Youtube",
  placement:'bottom'
})

tippy('.instagram',{
  content:"Instagram",
  placement:'bottom'
})


const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

  const toggleSearch = (search, button) =>{
    const searchBar = document.getElementById(search),
      searchButton = document.getElementById(button)
  
    searchButton.addEventListener('click', () =>{
    
      searchBar.classList.toggle('show-search')
    })
  }
  toggleSearch('search-bar', 'search-button')


function openForm(){
  document.getElementById("myForm").style.display = "block";
}

function closeForm(){
  document.getElementById("myForm").style.display = "none";
}

