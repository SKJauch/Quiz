var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
// var saveBtn = document.querySelector("#save-btn");
var initialsInput = document.querySelector("#initials-text");
var initialsForm = document.querySelector("#score-form");
var initialsList = document.querySelector("#initials-list");
var initialsSpan = document.querySelector("#initials");
// var cardDiv = document.querySelector("#card");

// var initialForm = document.querySelector("#initial-form");
// var initialsList = document.querySelector("#initials-list");
// var initialsInput = document.querySelector("#initials-text");

var winCounter = 0;
var loseCounter = 0;
var timer;
var timerCount;

var quizData = [
  {
    question: "Arrays in JavaScript must be enclosed in:",
    options: {
      a: "Curly Braces",
      b: "Parentheses",
      c: "Quotations",
    },
    correctAnswer: "c",
  },
  {
    question: "A boolean is:",
    options: {
      a: "true/false",
      b: "a number",
      c: "an alien species",
    },
    correctAnswer: "a",
  },
  {
    question: "To terminate a line of code in JavaScript, you must use:",
    options: {
      a: "?",
      b: ";",
      c: "*",
    },
    correctAnswer: "b",
  },
];

function init() {
  getWins();
  getlosses();
}

var currentQuestionIndex = 0;

function resetFeedback() {
  feedbackElement.textContent = "";
}

function startGame() {
  isWin = false;
  timerCount = 30;
  startButton.disabled = true;
  startTimer();
  setNextQuestion();
}

function setNextQuestion() {
  resetFeedback();
  showQuestion(quizData[currentQuestionIndex]);
}

// Function to display a question
function showQuestion(question) {
  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";

  question.choices.forEach((choice) => {
    const choiceElement = document.createElement("li");
    choiceElement.textContent = choice;
    choiceElement.addEventListener("click", handleAnswerClick);
    choicesElement.appendChild(choiceElement);
  });
}

function handleAnswerClick(event) {
  const selectedChoice = event.target;
  const selectedAnswer = selectedChoice.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    // Correct answer
    feedbackElement.textContent = "Correct!";
  } else {
    // Incorrect answer
    feedbackElement.textContent = "Wrong!";
    timeLeft -= 10; // Subtract 10 seconds for an incorrect answer
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    // No more questions, end the quiz
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++;
  startButton.disabled = false;
  setWins();
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  loseCounter++;
  startButton.disabled = false;
  setLosses();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
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
    winCounter = parseInt(storedWins);
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

startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins();
  setLosses();
}


var initialsInput = document.querySelector("#initials-text");
var initialsList = document.querySelector("#initials-list");

// Render initials to the page
function renderInitials() {
  // Clear the initialsList element
  initialsList.innerHTML = "";

  // Render a new li for each initial
  for (var i = 0; i < initials.length; i++) {
    var initial = initials[i];

    var li = document.createElement("li");
    li.textContent = initial;

    initialsList.appendChild(li);
  }
}

// Add submit event to form
initialsInput.addEventListener("keyup", function(event) {
  event.preventDefault();

  // Check if Enter key is pressed
  if (event.keyCode === 13) {
    var enteredInitials = initialsInput.value.trim();

    // Return from function early if enteredInitials is blank
    if (enteredInitials === "") {
      return;
    }

    // Add new enteredInitials to initials array, clear the input
    initials.push(enteredInitials);
    initialsInput.value = "";

    // Render updated initials to the page
    renderInitials();
  }
});

// var initials = [];

// // The following function renders items in a todo list as <li> elements
// function renderInitials() {
//   // Clear todoList element and update todoCountSpan
//   initialsList.innerHTML = "";
//   initialsSpan.textContent = initials.length;

//   // Render a new li for each todo
//   for (var i = 0; i < initials.length; i++) {
//     var initials = initials[i];

//     var li = document.createElement("li");
//     li.textContent = initials;
//     li.setAttribute("data-index", i);

//     li.appendChild(button);
//     initialsList.appendChild(li);
//   }
// }


// function init() {
//   var storedInitials = JSON.parse(localStorage.getItem("initials"));

//   if (storedInitials !== null) {
//     initials = storedInitials;
//   }

//   // This is a helper function that will render todos to the DOM
//   renderInitials();
// }

// function storeInitials() {
//   // Stringify and set key in localStorage to todos array
//   localStorage.setItem("initials", JSON.stringify(initials));
// }

// // Add submit event to form
// initialsForm.addEventListener("submit", function(event) {
//   event.preventDefault();

//   var initialsText = initialsInput.value.trim();

//   // Return from function early if submitted todoText is blank
//   if (initialsText === "") {
//     return;
//   }

//   // Add new todoText to todos array, clear the input
//   initials.push(initialsText);
//   initialsInput.value = "";

//   // Store updated todos in localStorage, re-render the list
//   storeInitials();
//   renderInitials();
// });

// // Add click event to todoList element
// initialsList.addEventListener("click", function(event) {
//   var element = event.target;

//   // Checks if element is a button
//   if (element.matches("button") === true) {
//     // Get its data-index value and remove the todo element from the list
//     var index = element.parentElement.getAttribute("data-index");
//     initials.splice(index, 1);

//     // Store updated todos in localStorage, re-render the list
//     storeInitials();
//     renderInitials();
//   }
// });

// // Calls init to retrieve data and render it to the page on load
// init()

resetButton.addEventListener("click", resetGame);
