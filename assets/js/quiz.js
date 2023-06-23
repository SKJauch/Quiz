var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitBtn = document.querySelector("#submit-btn");

var winCounter = 0;
var loseCounter = 0;
var timer;
var timerCount;

var quizData = [
  {
    question: "Arrays in JavaScript must be enclosed in:",
    options: {
      a: 'Curly Braces',
      b: 'Parentheses',
      c: 'Quotations',
    },
    correctAnswer: 'c'
  },
  {
    question: "A boolean is:",
    options: {
      a: 'true/false',
      b: 'a number',
      c: 'an alien species',
    },
    correctAnswer: 'a'
  },
  {
    question: "To terminate a line of code in JavaScript, you must use:",
    options: {
      a: '?',
      b: ';',
      c: '*',
    },
    correctAnswer: 'b'
  },
];

function init() {
  getWins();
  getlosses();
}

var currentQuestionIndex = 0;

function startGame() {
	currentQuestionIndex = 0;
  timerCount = 10;
  startButton.disabled = true;
  startTimer();
}

function renderQuestion(questionIndex) {
	var questionData = quizData[questionIndex];
	var questionContainer = document.querySelector("#question-container");
	questionContainer.innerHTML = ""; // Clear previous question
  
	// Create question element
	var questionElement = document.createElement("h2");
	questionElement.textContent = questionData.question;
	questionContainer.appendChild(questionElement);
  
	// Create options elements
	var optionsContainer = document.createElement("div");
	optionsContainer.className = "options-container";
  
	for (var option in questionData.options) {
	  var optionElement = document.createElement("label");
	  var radioInput = document.createElement("input");
	  radioInput.type = "radio";
	  radioInput.name = "question" + questionIndex;
	  radioInput.value = option;
	  optionElement.appendChild(radioInput);
	  optionElement.appendChild(document.createTextNode(questionData.options[option]));
	  optionsContainer.appendChild(optionElement);
	}
  
	questionContainer.appendChild(optionsContainer); // Append options container to question container
  }
  

function checkQuiz() {
	var selectedOption = document.querySelector('input[name="question' + currentQuestionIndex + '"]:checked');
	if (selectedOption) {
	  var selectedAnswer = selectedOption.value;
	  if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
		// Correct answer
		console.log('Question ' + (currentQuestionIndex + 1) + ' - Correct!');
	  } else {
		// Incorrect answer
		console.log('Question ' + (currentQuestionIndex + 1) + ' - Incorrect!');
	  }
	  currentQuestionIndex++; // Move to the next question
  
	  if (currentQuestionIndex < quizData.length) {
		renderQuestion(currentQuestionIndex); // Render the next question
	  } else {
		endQuiz(); // No more questions, end the quiz
	  }
	} else {
	  // No answer selected
	  console.log('Question ' + (currentQuestionIndex + 1) + ' - No answer selected!');
	}
  }

  function endQuiz() {
	clearInterval(timer);
	// Display final results or perform any other actions
	startButton.disabled = false;
  }
  
  

function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

function getWins() {
  var storedWins = localStorage.getItem("winCount");
  if (storedWins === null) {
    winCounter = 0;
  } else {
    winCounter = parseInt(storedWins); // Parse the stored value as an integer
  }
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = parseInt(storedLosses); // Parse the stored value as an integer
  }
  lose.textContent = loseCounter;
}

function resetGame() {
  winCounter = 0;
  loseCounter = 0;
  setWins();
  setLosses();
}

startButton.addEventListener("click", startGame);

// Calls init() so that it fires when the page is opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetGame);
