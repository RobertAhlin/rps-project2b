let cheatCodeActivated = false;
let playerScore = 0;
let robotScore = 0;

// Function to update and display the player's score
function updatePlayerScore() {
    document.getElementById('player-score').textContent = playerScore;
}

// Function to update and display the robot's score
function updateRobotScore() {
    document.getElementById('robot-score').textContent = robotScore;
}

// Function when player makes a choice
function makePlayerChoice(choice) {
    playerChoice = choice;
    displayChoices(`You picked ${choice}`, "");
    displayMessage(""); // Clear the result message
}

// Event listeners for player's choice images
document.getElementById('rock').addEventListener('click', () => makePlayerChoice('rock'));
document.getElementById('paper').addEventListener('click', () => makePlayerChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => makePlayerChoice('scissors'));

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
        playerScore++; // Increase player's score on win
        updatePlayerScore(); // Update and display player's score
        return ` - You win!`;
    } else {
        robotScore++; // Increase robot's score on win
        updateRobotScore(); // Update and display robot's score
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