let score = JSON.parse(localStorage.getItem('score')) 
        || {
            wins: 0,
            losses: 0,
            tied: 0
        };
        updateScoreElement();

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
        