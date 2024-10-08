// Save to local storage, and have a default value of 0
let score = JSON.parse(localStorage.getItem('score')) 
        || {
            wins: 0,
            losses: 0,
            tied: 0
        };
        updateScoreElement();

// Execute the playGame function with an interval of 2 seconds
let isPlaying = false;
let intervalID;

function autoPlay(){
    if(!isPlaying){
        intervalID = setInterval(function(){
            playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1300)
        isPlaying = true;
    } else {
        clearInterval(intervalID);
        isPlaying = false;
    }
}

document.querySelector('.rock-btn')
    .addEventListener('click', () => {
        playGame('Rock');
    });

document.querySelector('.paper-btn')
    .addEventListener('click', () => {
        playGame('Paper');
    })

document.querySelector('.scissor-btn')
    .addEventListener('click', () => {
        playGame('Scissors');
    })

document.querySelector('.reset-btn')
    .addEventListener('click', () => {
        score.wins = 0;
        score.losses= 0;
        score.tied = 0;

        localStorage.removeItem('score');
        updateScoreElement();
    })

document.querySelector('.auto-play-btn')
    .addEventListener('click', () => {
        autoPlay();
    })

// Added keyboard presses
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        playGame('Rock');
    } else if (event.key === 'p'){
        playGame('Paper');
    } else if (event.key === 's'){
        playGame('Scissors');
    } else if (event.key === 'a'){
        autoPlay();
    } else if (event.key === 'd'){
        score.wins = 0;
        score.losses= 0;
        score.tied = 0;

        localStorage.removeItem('score');
        updateScoreElement();
    }
})

// Main Function to Call the Game
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = ''

    if (playerMove === 'Scissors') {
        if (computerChoice === 'Rock') {
        result = 'You Lost!'
        } else if (computerChoice === 'Paper') {
            result = 'You Won!';
        } else {
            result = 'You Tied';
        }
    } else if (playerMove === 'Paper') {
        if (computerChoice === 'Rock') {
            result = 'You Won!'
        } else if (computerChoice === 'Paper') {
            result = 'You Tied';
        } else {
            result = 'You Lost!';
        }
    } else if (playerMove === 'Rock') {
        if (computerChoice === 'Rock') {
            result = 'You Tied'
        } else if (computerChoice === 'Paper') {
            result = 'You Lost!';
        } else {
            result = 'You Won!';
        }
    }

    if (result === 'You Won!') {
        score.wins += 1;
    } else if (result === 'You Lost!') {
        score.losses += 1;
    } else if (result === 'You Tied') {
        score.tied += 1;
    }


    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-move').innerHTML = `<div class="first-col">
        Your Move: <img src="./assets/icons/${playerMove}-emoji.png" alt="">
    </div>
    
    <div class="second-col">
        <img src="./assets/icons/${computerMove}-emoji.png" alt=""> :Computer Move
    </div>`;
}



// Function to Pick the Computer Move
function pickComputerMove() {
    const randNumber = Math.random();

    if (randNumber >= 0 && randNumber <= 1 / 3) {
        computerChoice = 'Rock';
    } else if (randNumber > 1 / 3 && randNumber <= 2/3) {
        computerChoice = 'Paper';
    } else {
        computerChoice = 'Scissors';
    }

    return computerChoice;
}

        
function updateScoreElement() {
    document.querySelector('.js-gamestats').innerHTML = `Wins: ${score.wins}, Losses ${score.losses}, Ties: ${score.tied}`;
}
