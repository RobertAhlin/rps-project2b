let playerChoice = null;
let robotChoice = null;
let cheatCodeActivated = false;
let playerScore = 0;
let robotScore = 0;

// Update and display the player's score.
function updatePlayerScore() {
    document.getElementById('player-score').textContent = playerScore;
}

// Update and display the robot's score.
function updateRobotScore() {
    document.getElementById('robot-score').textContent = robotScore;
}

// Reset the scores and messages.
function resetScores() {
    playerScore = 0;
    robotScore = 0;
    updatePlayerScore();
    updateRobotScore();
    displayMessage('');
    displayChoices('', '');
}

// When player makes a choice.
function makePlayerChoice(choice) {
    playerChoice = choice;
    displayChoices(`You picked ${choice}`, "");
    displayMessage(""); // Clear the result message.
    playGame();
}

// Generate robot's choice.
function generateRobotChoice() {
    if (cheatCodeActivated) {
        // When cheat mode is on, robot always select a losing choice.
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

// Figure out who wins and show the result.
function setWinner(playerChoice, robotChoice) {
    if (cheatCodeActivated) {
        playerScore++;
        updatePlayerScore();
        if (playerScore >= 10) { // Check if reached ten point.
            return 'Congratulations! You succefully cheated your way to 10 points. You win! - Reset scores to play again.';
        } else {
            return ' - You win! (You cheater...)';
        }      
    } else if (playerChoice === robotChoice) {
        return " - It's a tie!";
    } else if (
        (playerChoice === 'rock' && robotChoice === 'scissors') ||
        (playerChoice === 'paper' && robotChoice === 'rock') ||
        (playerChoice === 'scissors' && robotChoice === 'paper')
    ) {
        playerScore++; // Increase player's score on win.
        updatePlayerScore(); // Update and display player's score.
        if (playerScore >= 10) { // Check if reached ten point.
            return 'Congratulations! You where first to 10 points. You win the game! - Reset scores to play again.';
        } else {
            return ` - You win!`;
        }
        
    } else {
        robotScore++; // Increase robot's score on win.
        updateRobotScore(); // Update and display robot's score.
        if (robotScore >= 10) { // Check if reached ten point.
            return 'Sorry, robot was first to 10 points. The robot wins the game. - Reset scores to play again..';
        } else {
            return '- Robot wins!';
        }
        
    }
}

// Show messages on the screen.
function displayMessage(message) {
    document.getElementById('result').textContent = message;
}

// Show cheat code activated.
function displayCheatMessage(cheatMessage) {
    document.getElementById('cheat-message').textContent = cheatMessage;
}

// Display player's and computer's choices.
function displayChoices(player, robot) {
    let message = `${player} ${robot}`;
    document.getElementById('choices').textContent = message;
}

// Play the game.
function playGame() {
    if (robotScore >= 10 || playerScore >= 10) { // Check if game over.
        displayChoices('Game over!', ' - Reset scores to play again.'); // Exit the function if game over.
    } else {
        // Delay showing robot choice for 1 second.
        setTimeout(() => {
            robotChoice = generateRobotChoice();
            displayChoices(`You played ${playerChoice}`, ` vs. Robot played ${robotChoice}`);
            let result = setWinner(playerChoice, robotChoice);
            displayMessage(result);
        }, 1000);
    }
}

// Activate cheat code.
document.getElementById('cheat-code').addEventListener('input', function (event) {
    if (event.target.value.toLowerCase() === 'godmode') {
        cheatCodeActivated = true;
        displayCheatMessage(' Activated!');
    } else {
        cheatCodeActivated = false;
        displayCheatMessage(''); // Clear cheat message.
    }
});

// Reset the cheat code.
function resetCheatCode() {
    cheatCodeActivated = false;
    document.getElementById('cheat-code').value = '';
    displayCheatMessage(' Cheat code reset.');

    // Delay hiding "cheat code reset" message for 3 seconds.
    setTimeout(() => {
        document.getElementById('cheat-message').textContent = '';
    }, 3000);
}

// Event listeners for player's choice buttons.
document.getElementById('rock').addEventListener('click', () => makePlayerChoice('rock'));
document.getElementById('paper').addEventListener('click', () => makePlayerChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => makePlayerChoice('scissors'));

// Swap image for button effect.
const image = document.getElementById('reset-scores');

image.addEventListener('mousedown', () => {
    // Change the image source on click down
    image.src = 'assets/images/btn-reset-scores-down.jpg';
});

image.addEventListener('mouseup', () => {
    // Change the image source back on mouse release
    image.src = 'assets/images/btn-reset-scores.jpg';
});

// For "Reset Cheat" button.
document.getElementById('reset-cheat').addEventListener('click', resetCheatCode);

// For "Reset Scores" button.
document.getElementById('reset-scores').addEventListener('click', resetScores);