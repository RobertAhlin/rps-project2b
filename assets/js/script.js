// Initialize variables for game state
let playerChoice = null;
let robotChoice = null;
let cheatCodeActivated = false;
let playerScore = 0;
let robotScore = 0;
let waitingForRobot = false; // Add a variable to track if the robot is making a choice

/**
 * Update and display the player's score.
 */
function updatePlayerScore() {
    document.getElementById('player-score').textContent = playerScore;
}

/**
 * Update and display the robot's score.
 */
function updateRobotScore() {
    document.getElementById('robot-score').textContent = robotScore;
}

/**
 * Reset the scores and messages.
 */
function resetScores() {
    playerScore = 0;
    robotScore = 0;
    updatePlayerScore();
    updateRobotScore();
    displayMessage('');
    displayChoices('', '');
    waitingForRobot = false; // Reset the waiting state
}

/**
 * Set the player's choice.
 * @param {string} choice - The player's choice ('rock', 'paper', or 'scissors').
 */
function makePlayerChoice(choice) {
    if (!waitingForRobot) { // Check if the robot is not currently making a choice
        playerChoice = choice;
        displayChoices(`You picked ${choice}`, "");
        displayMessage(""); // Clear the result message.
        playGame();
    }
}

/**
 * Generate the robot's choice based on cheat code or random selection.
 * @returns {string} - The robot's choice ('rock', 'paper', or 'scissors').
 */
function generateRobotChoice() {
    if (cheatCodeActivated) {
        // When cheat mode is on, robot always selects a losing choice.
        switch (playerChoice) {
            case 'rock':
                return 'scissors';
            case 'paper':
                return 'rock';
            case 'scissors':
                return 'paper';
            default:
                return ''; // Handle invalid playerChoice here if needed
        }
    } else {
        let choices = ['rock', 'paper', 'scissors'];
        let randomChoice = Math.floor(Math.random() * choices.length);
        return choices[randomChoice];
    }
}

/**
 * Determine the winner and display the result.
 * @param {string} playerChoice - The player's choice ('rock', 'paper', or 'scissors').
 * @param {string} robotChoice - The robot's choice ('rock', 'paper', or 'scissors').
 * @returns {string} - The result message.
 */
function setWinner(playerChoice, robotChoice) {
    let result = '';
    if (cheatCodeActivated) {
        playerScore++;
        updatePlayerScore();
        result = playerScore >= 10 ? 'Congratulations! You successfully cheated your way to 10 points. You win! - Reset scores to play again.' : ' - You win! (You cheater...)';
    } else if (playerChoice === robotChoice) {
        result = " - It's a tie!";
    } else {
        switch (playerChoice) {
            case 'rock':
                result = robotChoice === 'scissors' ? ' - You win!' : '- Robot wins!';
                break;
            case 'paper':
                result = robotChoice === 'rock' ? ' - You win!' : '- Robot wins!';
                break;
            case 'scissors':
                result = robotChoice === 'paper' ? ' - You win!' : '- Robot wins!';
                break;
        }
        if (result === ' - You win!') {
            playerScore++;
            updatePlayerScore();
            if (playerScore >= 10) {
                result = 'Congratulations! You were first to 10 points. You win the game! - Reset scores to play again.';
            }
        } else if (result === '- Robot wins!') {
            robotScore++;
            updateRobotScore();
            if (robotScore >= 10) {
                result = 'Sorry, robot was first to 10 points. The robot wins the game. - Reset scores to play again.';
            }
        }
    }
    return result;
}

/**
 * Display a message on the screen.
 * @param {string} message - The message to display.
 */
function displayMessage(message) {
    document.getElementById('result').textContent = message;
}

/**
 * Display a cheat code activation message.
 * @param {string} cheatMessage - The cheat code activation message.
 */
function displayCheatMessage(cheatMessage) {
    document.getElementById('cheat-message').textContent = cheatMessage;
}

/**
 * Display player's and computer's choices.
 * @param {string} player - The player's choice message.
 * @param {string} robot - The robot's choice message.
 */
function displayChoices(player, robot) {
    let message = `${player} ${robot}`;
    document.getElementById('choices').textContent = message;
}

/**
 * Play the game and determine the winner.
 */
function playGame() {
    if (robotScore >= 10 || playerScore >= 10 || waitingForRobot) { // Check if game over or waiting for the robot
        displayChoices('Game over!', ' - Reset scores to play again.'); // Exit the function if game over.
    } else {
        waitingForRobot = true; // Set the waiting state to true
        // Delay showing robot choice for 1 second.
        setTimeout(() => {
            robotChoice = generateRobotChoice();
            displayChoices(`You played ${playerChoice}`, ` vs. Robot played ${robotChoice}`);
            let result = setWinner(playerChoice, robotChoice);
            displayMessage(result);
            waitingForRobot = false; // Reset the waiting state after the robot makes a choice
        }, 1000);
    }
}

/**
 * Handle the activation of the cheat code.
 * @param {Event} event - The input event object.
 */
document.getElementById('cheat-code').addEventListener('input', function (event) {
    if (event.target.value.toLowerCase() === 'godmode') {
        cheatCodeActivated = true;
        displayCheatMessage(' Activated!');
    } else {
        cheatCodeActivated = false;
        displayCheatMessage(''); // Clear cheat message.
    }
});

/**
 * Reset the cheat code and clear the activation message.
 * And also show message if no code is active.
 */
function resetCheatCode() {
    if (cheatCodeActivated === false) {
        displayCheatMessage('My dear fellow, you nutcase, there is nary a code active!');
    } else {
        cheatCodeActivated = false;
        document.getElementById('cheat-code').value = '';
        displayCheatMessage(' Cheat code reset.');
    }

    // Delay hiding "cheat code reset" message for 5 seconds.
    setTimeout(() => {
        document.getElementById('cheat-message').textContent = '';
    }, 5000);
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

// Event listener for resetting the cheat code.
document.getElementById('reset-cheat').addEventListener('click', resetCheatCode);

// Event listener for resetting the scores.
document.getElementById('reset-scores').addEventListener('click', resetScores);