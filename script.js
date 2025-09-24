let quizzes=JSON.parse(localStorage.getItem("quizzes")) || [];
const quizform=document.getElementById("quiz-form");
const savemsg=document.getElementById("save-msg");
const startQuizBtn=document.getElementById("take-quiz")
const quizsection=document.getElementById("section");
const quizcontent=document.getElementById("quiz-content");
const nextBtn=document.getElementById("next-btn");
const progress=document.getElementById("progress");
const resultsSection=document.getElementById("results-section");
const resultsContent=document.getElementById("results-content");
const restartBtn=document.getElementById("restart-btn");
const newQuizBtn=document.getElementById("new-quiz-btn");



