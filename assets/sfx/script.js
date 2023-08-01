// Initial variables
var score = 0;
var currentQuestionIndex = 0;
var timer;

// DOM element variables
var startButton = document.getElementById("start");
var questionTitle = document.getElementById("question-title");
var choicesContainer = document.getElementById("choices");
var timeElement = document.getElementById("time");
var endScreen = document.getElementById("end-screen");
var finalScoreElement = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var feedbackElement = document.getElementById("feedback");

//  objects for questions
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "cosnole.log"],
    correctAnswer: "console.log",
  },
  {
    question:
      "String values must be enclosed within ___ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "parenthesis",
    correctAnswer: "quotes",
  },
  {
    question: "Arrays in JavaScript can be used to store",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
];

//  initialize the quiz using function
function initializeQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  showElement(questionTitle);
  hideElement(endScreen);
  hideElement(feedbackElement);

  // Event listeners for buttons
  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveScore);
}

// Function to start the quiz
function startQuiz() {
  startTimer();
  showNextQuestion();
  hideElement(document.getElementById("start-screen"));
  showElement(document.getElementById("questions"));
}

// Set interval, timer function to start
function startTimer() {
  var time = 60;
  timeElement.textContent = time;

  timer = setInterval(function () {
    time--;
    timeElement.textContent = time;

    if (time === 0) {
      endQuiz();
    }
  }, 1000);
}

//   End the quiz function
function endQuiz() {
  clearInterval(timer);
  hideElement(document.getElementById("questions"));
  showElement(endScreen);
  finalScoreElement.textContent = score;
}

// Display the next question function
function showNextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  var question = questions[currentQuestionIndex];
  questionTitle.textContent = question.question;
  choicesContainer.innerHTML = "";

  // Iterate choices and create buttons
  for (var i = 0; i < question.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = question.choices[i];

    // Create  data attribute to store choices
    choiceButton.setAttribute("data-choice", question.choices[i]);

    // Event listener to check the answer
    choiceButton.addEventListener("click", function () {
      var selectedAnswer = this.getAttribute("data-choice");
      checkAnswer(selectedAnswer, question.correctAnswer);
    });

    choicesContainer.appendChild(choiceButton);
  }

  currentQuestionIndex++;
}

// Function to check the answer
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    showFeedback("Correct!", "success");
  } else {
    timeElement.textContent = parseInt(timeElement.textContent) - 10;
    showFeedback("Wrong!", "error");
  }

  showNextQuestion();
}

// Function to show feedback about the answer
function showFeedback(feedbackText, className) {
  feedbackElement.textContent = feedbackText;
  feedbackElement.setAttribute("class", "feedback " + className);
  showElement(feedbackElement);

  setTimeout(function () {
    hideElement(feedbackElement);
  }, 1500);
}

// Function to save the score
function saveScore() {
  var initials = initialsInput.value.trim();

  // Check if initials are empty
  if (initials === "") {
    alert("Please enter your initials.");
    return;
  }

  console.log("Initials:", initials);
  console.log("Score:", score);

  // Clear input and hide the end screen
  initialsInput.value = "";
  hideElement(endScreen);

  // Re-initialize the quiz
  initializeQuiz();
}

// Helper functions to hide/show elements
function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}

// Initialize the quiz
initializeQuiz();
