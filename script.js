const container = document.querySelector('.container');
const questionsBox = document.querySelector('.question');
const choicesBox= document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const welcome = document.querySelector('#welcome');
const time = document.querySelector('.time');
const exitBtn = document.querySelector('.exitBtn');


let currentQuestionIndex=0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;


const quiz = [
  //Array of obj containing question and answer (choices)
  {
    question: "Q:What is the height of Mt.Everest?",
    choices: ["8849 m", "8848 m", "8948 m", "8845 m"],
    answer: "8848 m",
  },
  {
    question: "Q:In 1768,Captain James cook set out to explore which ocean",
    choices: ["Pacific ocean", "Indian ocean", "Atlantic ocean", "Arctic ocean"],
    answer: "Pacific ocean",
  },
  {
    question: "Q:Which is actually electricity?",
    choices: ["Flow of electrons", "Exciting of electrons", "Oscilating of electrons", "All of above"],
    answer: "Flow of electrons",
  },
  {
    question: "Q:What do we call a newly hatched butterfly?",
    choices: ["Larva", "Butterfly", "Pupa", "Caterpillar"],
    answer: "Caterpillar",
  },
  {
    question: "Q:what is the speed of sound?",
    choices: ["350 k/h", "1500 k/h", "1200 k/h", "420 k/h"],
    answer: "1200 k/h",
  },
  {
    question: "Q:which did viking people use as money?",
    choices: ["Coins", "Fingers", "Jewelery", "Weapons"],
    answer: "Jewelery",
  },
  {
    question: "Q:What is the main component of the sun?",
    choices: ["Gas", "Fire", "Uranium", "Water"],
    answer: "Gas",
  },
  {
    question: "Q:Goulash is a type of beef soup in which country?",
    choices: ["Hungary", "Bhutan", "Spain", "Italy"],
    answer: "Hungary",
  },
  {
    question: "Q:which of the animal can run fastest?",
    choices: ["Horse", "Leopard", "Tiger", "Cheetah"],
    answer: "Cheetah",
  },
  {
    question: "Q:In which country is transylvania?",
    choices: ["Romania", "Serbia", "Nepal", "Poland"],
    answer: "Romania",
  },
  {
    question: "Q:Which is known as the patron saint of spain?",
    choices: ["St Peterson", "St James", "St Maxwel", "Sergio Ramos"],
    answer: "St James",
  },
  {
    question: "Q:which company is known for publishing the mario video game?",
    choices: ["XBOX", "Nintendo", "Playstation", "Nokia"],
    answer: "Nintendo",
  },
  {
    question: "Q:CU is the chemical symbol of",
    choices: ["Copper", "Gold", "Hydrogen", "Calcium"],
    answer: "Copper",
  },
  {
    question: "Q:How many time zone are there in the world",
    choices: ["24", "38", "102", "10"],
    answer: "24",
  },
  {
    question: "Q:Which was the first film by Disney to be produce in colour",
    choices: ["Finding Nemo", "Toy Story", "Cars", "Snow white & 7 dwarf"],
    answer: "Snow white & 7 dwarf",
  },
  {
    question: "Q:Which two month are named after Emperors of Roman Empire ",
    choices: ["July & August", "Magh & Fagun", "May & June", "August  & October"],
    answer: "July & August",
  },
];

const showQuestions = () =>{
    const questionDetails = quiz[currentQuestionIndex];
    // console.log(questionDetails);
    questionsBox.textContent = questionDetails.question;
    container.style.display = 'block';

    choicesBox.textContent = "";   //clears choiceBox, doesnt let answers to repeat
        for(let i=0;i<questionDetails.choices.length;i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
              //if user clicks on a selected button do nothing
              choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }
    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

const checkAnswer = () =>{
    //check if selected option matches with correct one and add points accordingly
    const selectedChoice = document.querySelector('.choice.selected');
    // console.log(selectedChoice);
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        // alert("Correct Answer!");
        // displayAlert("You're Goddam right")
        score++;
    }else{
        // alert(`Wrong Answer!`);
        // displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the correct answer`)
    }
    timeLeft = 15;
    currentQuestionIndex++;     //incrementing index by one each time user clicks on Next button
    if(currentQuestionIndex < quiz.length){
        // console.log("Current Question Index",currentQuestionIndex);
         showQuestions();
    }
    else{
        showScore();
        stopTimer();
    }
}

const showScore = ()=>{
    //show final score on screen
    container.style.display = 'none';
    // questionsBox.textContent = "";
    // choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}`;
    nextBtn.textContent = "Play again";
    exitBtn.style.display = "flex";
    quizOver = true;

    // nextBtn.addEventListener('click',()=>{
    //     currentQuestionIndex = 0;
    //     showQuestions();
    //     nextBtn.textContent = 'Next';
    //     scoreCard.textContent = "";
    // });

}

// const displayAlert = (msg) =>{
//     alert.style.display="block";
//     alert.innerHTML= msg ;
//     setTimeout(()=>{
//         alert.style.display ="none";
//     },1000)
// }

exitBtn.addEventListener('click',()=>{
    window.location.reload("html");    //Reload the page to reset everything and restart from scratch!
})

const startTimer = () =>{  
    //start timer when game starts
    clearInterval(timerId);     //clears all existing timer
    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm('Are you still playing');
            if(confirmUser){
                timeLeft = 15;
                score = 0;
                startQuiz();
            }
            else{
                welcome.style.display = "grid";
                container.style.display = "none";
                nextBtn.style.display = 'none';
                stopTimer();
                return;
            }
        }
    }
    timerId = setInterval(countDown,1000);  //every second it will run this function and decrement timeleft by a sec
}

const stopTimer =()=>{
    //stop timer when quiz is over or user clicks play again button
    clearInterval(timerId);
}

const shuffleQuestion = ()=>{
    for(let i=quiz.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

const startQuiz=()=>{
    //show questions and options on click of start btn
    timeLeft = 15;
    time.style.display = 'grid';
    shuffleQuestion();
}

startBtn.addEventListener('click',()=>{
    timeLeft = 15;
    welcome.style.display = 'none';
    container.style.display = 'block';
    nextBtn.style.display = 'flex';
    startQuiz();
    // showQuestions();  
});
// showQuestions();  

nextBtn.addEventListener('click',()=>{
    // function to start the game when clicked on Start Game Button
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent==='Next'){
        // alert("Please select an answer");
        // displayAlert("Please select an answer")
        return;
    }
    if(quizOver){
        nextBtn.textContent = 'Next';
        exitBtn.style.display = 'none';
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        // showQuestions();
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
});
