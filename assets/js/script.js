// Variables to keep track of the game
let playerChoice = null;
let robotChoice = null;
let cheatCodeActivated = false;

// Function when player makes a choice
function makePlayerChoice(choice) {
    playerChoice = choice;
    displayChoices(`You picked ${choice}`, "");
    displayMessage("");
}

// Function to generate robot's choice
function generateRobotChoice() {
    if (cheatCodeActivated) {
        // When cheat mode is on, robot always chooses a losing choice
        if (playerChoice === 'rock') {
            return 'scissors';
        } else if (playerChoice === 'paper') {
            return 'rock';
        } else if (playerChoice === 'scissors') {
            return 'paper';
        }
    } else {
        let choices = ['rock', 'paper', 'scissors'];
        let randomChoice = Math.floor(Math.random() * choices.length);
        return choices[randomChoice];
    }
}

// Function to figure out who wins and show the result
function setWinner(playerChoice, robotChoice) {
    if (cheatCodeActivated) {
        return ' - You win! (You cheater...!)';
    } else if (playerChoice === robotChoice) {
        return " - It's a tie!";
    } else if (
        (playerChoice === 'rock' && robotChoice === 'scissors') ||
        (playerChoice === 'paper' && robotChoice === 'rock') ||
        (playerChoice === 'scissors' && robotChoice === 'paper')
    ) {
        return ' - You win!';
    } else {
        return '- Robot wins!';
    }
}

// Function to show messages on the screen
function displayMessage(message) {
    document.getElementById('result').textContent = message;
}

// Function to show cheat code activated
function displayCheatMessage(cheatMessage) {
    document.getElementById('cheat-message').textContent = cheatMessage;
}


// Function to display player's and computer's choices
function displayChoices(player, robot) {
    let message = `${player} ${robot}`;
    document.getElementById('choices').textContent = message;
}

// When player clicks a button
document.getElementById('rock').addEventListener('click', () => makePlayerChoice('rock'));
document.getElementById('paper').addEventListener('click', () => makePlayerChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => makePlayerChoice('scissors'));

// When player clicks "Play"
document.getElementById('play').addEventListener('click', function () {
    if (playerChoice === null) {
        displayMessage('Pick a move first!');
        return;
    }

    robotChoice = generateRobotChoice();
    displayChoices(`You played ${playerChoice}`, ` vs. Robot played ${robotChoice}`);

    let result = setWinner(playerChoice, robotChoice);
    displayMessage(result);
});

// When player types a cheat code
document.getElementById('cheatCode').addEventListener('input', function (event) {
    if (event.target.value.toLowerCase() === 'godmode') {
        cheatCodeActivated = true;
        displayCheatMessage(' Activated!');
    }
});

// Function to reset the cheat code
function resetCheatCode() {
    cheatCodeActivated = false;
    document.getElementById('cheatCode').value = '';
    displayCheatMessage(' Cheat code reset.');
};

// Event listener for the "Reset Cheat" button
document.getElementById('resetCheat').addEventListener('click', resetCheatCode);
