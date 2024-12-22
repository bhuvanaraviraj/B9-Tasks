// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restart');
  
    const cards = [
      'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'
    ];
  
    let flippedCards = [];
    let matchedPairs = 0;
  
    // Shuffle cards
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Create card elements
    function createBoard() {
      shuffle(cards);
      gameBoard.innerHTML = '';
      cards.forEach(cardValue => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="front"></div>
          <div class="back">${cardValue}</div>
        `;
        card.addEventListener('click', () => flipCard(card, cardValue));
        gameBoard.appendChild(card);
      });
    }
  
    // Flip card logic
    function flipCard(card, value) {
      if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
      }
  
      card.classList.add('flipped');
      flippedCards.push({ card, value });
  
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  
    // Check for match
    function checkMatch() {
      const [firstCard, secondCard] = flippedCards;
  
      if (firstCard.value === secondCard.value) {
        matchedPairs++;
        flippedCards = [];
  
        if (matchedPairs === cards.length / 2) {
          setTimeout(() => alert('You win!'), 500);
        }
      } else {
        setTimeout(() => {
          firstCard.card.classList.remove('flipped');
          secondCard.card.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  
    // Restart game
    restartButton.addEventListener('click', () => {
      flippedCards = [];
      matchedPairs = 0;
      createBoard();
    });
  
    // Initialize game
    createBoard();
  });
  