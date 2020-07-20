//John said we can make the quiz about anything
var questions = [
    {
        title: "What is the name of the space ship in Star Wars?",
        choices: ["Millinium Falcon", "Gandolf", "The Hindenburg", "Nebula"],
        answer: "Millinium Falcon"
    },
    {
        title: "This voice actor voiced both Darth Vader and Mufasa from the Lion King, what is his name?",
        choices: ["Dennis Haysbert", "Keith David", "James Earl Jones", "James Avery"],
        answer: "James Earl Jones"
    },
    {
        title: "What is the famous line that Darth Vader says to Luke in the Emipre Strikes Back",
        choices: ["Luke I am your father", "Yes I killed your father", "No I am your father", "Do you want me to be your father"],
        answer: "No I am your father"
    },
    {
        title: "Which actor was in Star Wars, Harry Potter, and Willow",
        choices: ["Mark Hamil", "Harrison Ford", "Domhnall Gleeson", "Warwick Davis"],
        answer: "Warwick Davis"
    },
    {
        title: "What was Luke and Leia's Mom's name",
        choices: ["Palpatine", "Shmi", "Rei", "Padme"],
        answer: "Padme"
    },
    {
        title: "Which sith lord killed Qui Gon Jinn in Star Wars The Phantom Menace",
        choices: ["Darth Vader", "Darth Sidious", "Darth Maul", "Darth Tyranus"],
        answer: "Darth Maul"

    },
    {
        title: "Who created the Star Wars saga",
        choices: ["George Lucas", "George Foreman", "George Takei", "George Miller"],
        answer: "George Lucas"
    },
    {
        title: "Which famous Puppeteer is the voice of Yoda",
        choices: ["Jim Henson", "Jerry Nelson", "Caroll Spinney", "Frank Oz"],
        answer: "Frank Oz"
    },
    {
        title: "True or False Star Wars Collectible coins can be used as real money",
        choices: ["True", "False"],
        answer: "True"
    },
    {
        title: "George Lucas made a bet with this famous director before releasing Star Wars A New Hope in 1977",
        choices: ["Francis Ford Coppola", "Steven Spielberg", "Woody Allen", "Clint Eastwood"],
        answer: "Steven Spielberg"
    },

];
// Declared variables
var score = 0;
var questionIndex = 0;

// Start working code 
// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 10 seconds per question:
var secondsLeft = 100;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
   
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highscore.html");
        }
    });

}