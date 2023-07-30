var startButton = document.getElementById("start");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var timerElement = document.getElementById("timer");
var initialsElement = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var resultElement = document.getElementById("result");
var finalScoreElement = document.getElementById("final-score");

var currentQuestionIndex = 0;
var timeLeft = 0;
var timerInterval;
var score = 0;
