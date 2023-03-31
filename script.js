const cards = [
        "A",
        "A",
        "B",
        "B",
        "C",
        "C",
        "D",
        "D",
        "E",
        "E",
        "F",
        "F",
        "G",
        "G",
        "H",
        "H",
      ];

      let player1Score = 0;
      let player2Score = 0;
      let currentPlayer = 1;
      let flippedCards = [];
      let matchedCards = [];

      const gameBoard = document.querySelector("#game-board");
      const scoreBoard = document.querySelector("#score-board");
      const message = document.querySelector(".message");

      function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
      }

      function createCardElement(cardValue) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.value = cardValue;
        return cardElement;
      }

      function handleCardClick(event) {
        const clickedCard = event.target;

        if (
          clickedCard.classList.contains("matched") ||
          clickedCard.classList.contains("flipped")
        ) {
          return;
        }

        flippedCards.push(clickedCard);
        clickedCard.classList.add("flipped");

        if (flippedCards.length === 2) {
          const card1Value = flippedCards[0].dataset.value;
          const card2Value = flippedCards[1].dataset.value;

          if (card1Value === card2Value) {
            flippedCards.forEach((card) => {
              card.classList.add("matched");
              matchedCards.push(card);
            });

            flippedCards = [];

            if (currentPlayer === 1) {
              player1Score++;
            } else {
              player2Score++;
            }
          } else {
            message.textContent = "Wrong!";
            setTimeout(() => {
              flippedCards.forEach((card) => {
                card.classList.remove("flipped");
              });
              flippedCards = [];
              message.textContent = "";

              if (currentPlayer === 1) {
                currentPlayer = 2;
              } else {
                currentPlayer
Wysłano
currentPlayer = 1;
          }
        }, 1000);
      }

      updateScoreBoard();
      checkForEndOfGame();
    } else if (currentPlayer === 2) {
      setTimeout(computerPlayerTurn, 1000);
    }
  }

  function computerPlayerTurn() {
    const unmatchedCards = Array.from(
      gameBoard.querySelectorAll(".card:not(.matched)")
    );
    const randomIndex = Math.floor(Math.random() * unmatchedCards.length);
    const cardToFlip = unmatchedCards[randomIndex];

    cardToFlip.classList.add("flipped");

    flippedCards.push(cardToFlip);

    setTimeout(() => {
      const cardValue = cardToFlip.dataset.value;
      const matchingCard = flippedCards.find(
        (card) => card.dataset.value === cardValue
      );

      if (matchingCard) {
        cardToFlip.classList.add("matched");
        matchingCard.classList.add("matched");
        matchedCards.push(cardToFlip, matchingCard);

        flippedCards = [];

        player2Score++;
      } else {
        cardToFlip.classList.remove("flipped");

        flippedCards = [];

        currentPlayer = 1;
      }

      updateScoreBoard();
      checkForEndOfGame();
    }, 1000);
  }

  function updateScoreBoard() {
    scoreBoard.textContent = Player 1: ${player1Score} | Player 2: ${player2Score};
  }

  function checkForEndOfGame() {
    if (matchedCards.length === cards.length) {
      if (player1Score > player2Score) {
        message.textContent = "Player 1 wins!";
      } else if (player2Score > player1Score) {
        message.textContent = "Player 2 wins!";
      } else {
        message.textContent = "It's a tie!";
      }
    }
  }

  function initGame() {
    shuffleCards();

    for (let i = 0; i < cards.length; i++) {
      const cardElement = createCardElement(cards[i]);
      cardElement.addEventListener("click", handleCardClick);
      gameBoard.appendChild(cardElement);
    }

    updateScoreBoard();
  }

  initGame();

    
