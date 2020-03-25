//card flip function//
class MixOrMatch {
    constructor(totalTime, cards) {
      this.cardsArray = cards;
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById("time-remaining");
      this.ticker = document.getElementById("flips");
    }
  
    startGame() {
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
      this.cardToCheck = null;
      this.matchedCards = [];
      this.busy = true;
      setTimeout(() => { 
        this.shuffleCards(this.cardsArray);
        this.countdown = this.startCountdown();
        this.busy = false;
      }, 500);
      this.hideCards();
      this.timer.innerText = this.timeRemaining;
      this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
      return setInterval(() => {
        this.timeRemaining--;
        this.timer.innerText = this.timeRemaining;
        if (this.timeRemaining === 0) this.gameOver();
      }, 1000);
    }
    gameOver() {
      clearInterval(this.countdown);
      document.getElementById("game-over-text").classList.add("visible");
    }
    victory() {
      clearInterval(this.countdown);
      document.getElementById("victory-text").classList.add("visible");
    }
    hideCards() {
      this.cardsArray.forEach(cards => {
        cards.classList.remove("visible");
        cards.classList.remove("matched");
      });
    }
    flipCard(cards) {
      if (this.canFlipCard(cards)) {
        this.totalClicks++;
        this.ticker.innerText = this.totalClicks;
        cards.classList.add("visible");
  
        if (this.cardToCheck) {
          this.checkForCardMatch(cards);
        } else {
          this.cardToCheck = cards;
        }
      }
    }
    checkForCardMatch(cards) {
      if (this.getCardType(cards) === this.getCardType(this.cardToCheck))
        this.cardMatch(cards, this.cardToCheck);
      else this.cardMismatch(cards, this.cardToCheck);
  
      this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add("matched");
      card2.classList.add("matched");
      if (this.matchedCards.length === this.cardsArray.length) this.victory();
    }
    cardMismatch(card1, card2) {
      this.busy = true;
      setTimeout(() => {
        card1.classList.remove("visible");
        card2.classList.remove("visible");
        this.busy = false;
      }, 1000);
    }
    shuffleCards(cardsArray) {
      // Fisher-Yates Shuffle Algorithm.
      for (let i = cardsArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        cardsArray[randIndex].style.order = i;
        cardsArray[i].style.order = randIndex;
      }
    }
    getCardType(cards) {
      return cards.getElementsByClassName("card-value")[0].src;
    }
    canFlipCard(cards) {
      return (
        !this.busy &&
        !this.matchedCards.includes(cards) &&
        cards !== this.cardToCheck
      );
    }
  }
  
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
  
  function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("cards"));
    let game = new MixOrMatch(100, cards);
  
    overlays.forEach(overlay => {
      overlay.addEventListener("click", () => {
        overlay.classList.remove("visible");
        game.startGame();
      });
    });
  
    cards.forEach(card => {
      card.addEventListener("click", () => {
        game.flipCard(card);
      });
    });
  }