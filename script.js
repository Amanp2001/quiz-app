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

let currentQuestion=0;
let userAnswers=[];

quizform.addEventListener("click",function(e){
    e.preventDefault();
    
    const question=document.getElementById("question").value;
    const options=[
        document.getElementById("option1").value,
        document.getElementById("option2").value,
        document.getElementById("option3").value,
        document.getElementById("option4").value,
    ];
    const correctE1=document.querySelector('input[name="correct"]:checked');
    const correct=correctE1 ? parseInt(correctE1.value) -1: NaN;

    if(question && options.every(opt=>opt)&& !isNaN(correct)){
        quizzes.push({question,options,correct});
        localStorage.setItem("quizzes",JSON.stringify(quizzes));
        quizform.reset();
        savemsg.textContent="Question Saved!";
        startQuizBtn.disabled=false;
    }
    else{
        savemsg.textContent="please fill all fields and select correct option.";
    }
});

    startQuizBtn.addEventListener("click",function(e){
        e.preventDefault();
        quizform.style.display="none";
        quizSection.style.display="block";
        resultsSection.style.display="none";
        currentQuestion=0;
        userAnswers=[];
        showQuestion();
});

function showQuestion() {
  const q = quizzes[currentQuestion];
  quizContent.innerHTML = `<h3>Q${currentQuestion+1}: ${q.question}</h3>`;
  q.options.forEach((opt, i) => {
    quizContent.innerHTML += `
      <label>
        <input type="radio" name="user-answer" value="${i}"> ${opt}
      </label><br>`;
  });
  progress.textContent = `Question ${currentQuestion+1} of ${quizzes.length}`;
  nextBtn.style.display = 'inline-block';
}

// Next Button
nextBtn.onclick = function() {
  const userAns = document.querySelector('input[name="user-answer"]:checked');
  if (!userAns) {
    alert("Please select an answer.");
    return;
  }
  userAnswers.push(parseInt(userAns.value));
  currentQuestion++;
  if(currentQuestion < quizzes.length) {
    showQuestion();
  } else {
    showResults();
  }
}


function showResults() {
  quizSection.style.display = "none";
  resultsSection.style.display = "block";
  restartBtn.style.display = "inline-block";
  newQuizBtn.style.display = "inline-block";
  let score = 0;
  resultsContent.innerHTML = "";
  quizzes.forEach((q, i) => {
    const userAns = userAnswers[i];
    const correctAns = q.correct;
    const feedback = userAns === correctAns ? "Correct" : `Incorrect (Correct: ${q.options[correctAns]})`;
    if(userAns === correctAns) score++;
    resultsContent.innerHTML += `
      <p>
        Q${i+1}: ${q.question}<br>
        Your answer: ${q.options[userAns] || 'No answer'}<br>
        ${feedback}
      </p>`;
  });
  resultsContent.innerHTML = `<h3>Your Score: ${score}/${quizzes.length}</h3>` + resultsContent.innerHTML;
}


restartBtn.onclick = function() {
  resultsSection.style.display = "none";
  quizSection.style.display = "block";
  currentQuestion = 0;
  userAnswers = [];
  showQuestion();
}

newQuizBtn.onclick = function() {
  resultsSection.style.display = "none";
  quizForm.style.display = "block";
};


