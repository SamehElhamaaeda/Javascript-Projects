//Selecting Elements
let countSpan = document.querySelector(".count span");
let bulletsContainer = document.querySelector(".bullets .spans");
let quizQueastions = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit");
let resultsContainer = document.querySelector(".results");
let countDownElement = document.querySelector(".countdown");

//global variables
let currentQuestion = 0;
let rightAnswers = 0;
let countDownInterval;
//functions
function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let questionsCount = questionsObject.length;
      createBullets(questionsCount);
      addQuestionData(questionsObject[currentQuestion], questionsCount);
      clearInterval(countDownInterval);
      countDown(5, 10);
      submitButton.onclick = () => {
        let rigthAnswer = questionsObject[currentQuestion].right_answer;
        checkAnswer(rigthAnswer);
        currentQuestion++;
        quizQueastions.innerHTML = "";
        answersArea.innerHTML = "";
        if (currentQuestion == questionsCount) {
          clearInterval(countDownInterval);
          showResults();
        } else {
          addQuestionData(questionsObject[currentQuestion], questionsCount);
          handleBullets(currentQuestion, questionsCount);
          clearInterval(countDownInterval);
          countDown(5, 10);
        }
      };
    }
  };
  myRequest.open("GET", "html_questons.json", true);
  myRequest.send();
}
getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    let bullet = document.createElement("span");
    bulletsContainer.appendChild(bullet);
  }
  bulletsContainer.children[0].className = "on";
}
function addQuestionData(obj, count) {
  if (currentQuestion < count) {
    // create h3 element for the question
    let questionTitle = document.createElement("h3");
    // create the TextNode for holding the the question
    let textTitle = document.createTextNode(obj["title"]);
    //Append TextNode to the h3
    questionTitle.appendChild(textTitle);
    //Append The question to the quiz area
    quizQueastions.appendChild(questionTitle);
    //Loop on the 4 anwers of the question

    for (let i = 1; i <= 4; i++) {
      //create the answer div
      let mainsDiv = document.createElement("div");
      //add class to it
      mainsDiv.className = "answer";
      //create the Radio Input
      let radioInput = document.createElement("input");
      //Add type, name, id to the radio
      radioInput.type = "radio";
      radioInput.name = "question";
      radioInput.id = `anwer_${i}`;
      //Make first option checked
      if (i === 1) {
        radioInput.checked = true;
      }
      //Add the anwer to
      radioInput.dataset.answer = obj[`answer_${i}`];
      //create label element
      let theLabel = document.createElement("label");
      //Add For Attribute
      theLabel.htmlFor = `anwer_${i}`;
      //Create the labelText
      let labelText = document.createTextNode(obj[`answer_${i}`]);
      //Append the labelTextnode
      theLabel.appendChild(labelText);
      //Append the Radio Input to The answer Div
      mainsDiv.appendChild(radioInput);
      //Append The Label to The answer Div
      mainsDiv.appendChild(theLabel);
      //Append The Answer Div To The answersArea
      answersArea.appendChild(mainsDiv);
    }
  }
}
function checkAnswer(rAnswer) {
  let radios = document.getElementsByName("question");
  let choosenAnswer;
  for (i = 0; i < 4; i++) {
    if (radios[i].checked) {
      choosenAnswer = radios[i].dataset.answer;
    }
  }
  if (rAnswer === choosenAnswer) {
    rightAnswers++;
  }
}
function handleBullets(qNumber) {
  // for (let bullet of bulletsContainer.children) {
  //   if (bullet.className.includes("on")) {

  //   }
  // }
  bulletsContainer.children[qNumber].className = "on";
}
function showResults(qcount) {
  bulletsContainer.remove();
  quizQueastions.remove();
  answersArea.remove();
  submitButton.remove();
  countDownElement.remove();
  document.querySelector(".bullets").remove();
  let results;
  if (rightAnswers >= qcount / 2 && rightAnswers < qcount) {
    results = `<span class="good">Good</span> you have answered have ${rightAnswers} from ${qcount}`;
  } else if (rightAnswers === qcount) {
    results = `<span class="perfect">Perfect</span> you have answered ${rightAnswers} from ${qcount}`;
  } else {
    results = `<span class="bad">Bad</span> you have answered have ${rightAnswers} from ${qcount}`;
  }
  resultsContainer.innerHTML = results;
  resultsContainer.style.padding = "10px";
  resultsContainer.style.backgroundColor = "white";
  resultsContainer.style.marginTop = "10px";
}
function countDown(duration, qcount) {
  if (currentQuestion < qcount) {
    let minutes, seconds;
    countDownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      countDownElement.innerHTML = `<span class="minutes">${minutes}</span> :
          <span class="seconds">${seconds}</span>`;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        submitButton.click();

        console.log("Finish");
      }
    }, 1000);
  }
}
