const shuffleBtn = document.getElementById("shuffle")
const hitBtn = document.getElementById("hit")
const stayBtn = document.getElementById("stay")
const dealBtn = document.getElementById("dealCards")
const playerHand = document.getElementById("player-hand")
const dealerHand = document.getElementById("dealer-hand")
const playScoreDisplay = document.getElementById("player-score")
const dealerScoreDisplay = document.getElementById("dealer-score")
const messageDisplay = document.getElementById("msgbox");
const betTen = document.getElementById("ten")
const betTwenty = document.getElementById("twenty")
const betFifty = document.getElementById("fifty")
const betHundred = document.getElementById("hundred")
const monies = document.getElementById("bank-roll")
const betTotal = document.getElementById("totalBet")
const moneyButtons = document.getElementById("betButtons")


 let pThird = 0;
let playerScore = 0;
let dealerScore = 0;
let bet = 0;

let bank = 1000;

let hidden;
let deck;
let hasAce = false;
// let dealerhasAce = false;
// let playerhasAce = false;
//after true 10+card

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]); 
        }
    }
    console.log("created deck");
    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log("shuffled deck");
    console.log(deck);
}

function getValue(card, player) {
    let data = card.split("-"); 
    let value = data[0];
//Assigns face cards at value 10.
    if (isNaN(value)) { 
        if(value == "J" || value == "Q" || value === "K"){
        return 0;
        }
    } 
    if (isNaN(value)) { 
        if(value == "A") {
            return 1;
        } 
    }
 return parseInt(value);
}

function getScore(){
    if (playerScore > 9) {
        playerScore -= 10;
        playScoreDisplay.textContent = `PLAYER: ${playerScore}`
      }

      else if (dealerScore > 9) {
        dealerScore -= 10;
        dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
      }
}

function playerCard (){
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerScore += getValue(card);
        document.getElementById("player-hand").append(cardImg);
        playScoreDisplay.textContent = `PLAYER: ${playerScore}`
        getScore();
        console.log("Player Card " + card)
        console.log("-Player-")
        console.log(playerScore)
        pThird = getValue(card)
        // console.log("P Third " + pThird)
    }
}

function dealerCard(){
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card, "dealer");
        document.getElementById("dealer-hand").append(cardImg);
        dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
        getScore();
        console.log("Banker Card " + card)
        console.log("-Banker-")
        console.log(dealerScore)
    }
}


function playerThirdCard (){
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerScore += getValue(card);
        document.getElementById("player-hand").append(cardImg);
        playScoreDisplay.textContent = `PLAYER: ${playerScore}`
        getScore();
        console.log("Player Card " + card)
        pThird = getValue(card)
        console.log("P Third " + pThird)
    }
}



function thirdCards(){
    if (playerScore >= 8 || dealerScore >= 8) {
    } else if (playerScore > 5 && playerScore < 8) {
      if (dealerScore <= 5) {
        console.log("Banker Draws!");
        dealerCard();
        if (dealerScore > 9) {
          dealerScore -= 10;
        }
      }
    } else {
        console.log("Player Draws!");
        playerCard();
      if (playerScore > 9) {
        playerScore -= 10;
      }
      if (dealerScore <= 5) {
        console.log("Banker Draws!");
        dealerCard();
        if (dealerScore > 9) {
          dealerScore -= 10;
        }
      } else if (dealerScore == 4) {
        if (
          pThird == 2 ||
          pThird == 3 ||
          pThird == 4 ||
          pThird == 5 ||
          pThird == 6 ||
          pThird == 7
        ) {
          console.log("Banker Draws!");
          dealerCard();
          
          if (dealerScore > 9) {
            dealerScore -= 10;
          }
        }
      } else if (dealerScore == 5) {
        if (
          pThird == 4 ||
          pThird == 5 ||
          pThird == 6 ||
          pThird == 7
        ) {
          console.log("Banker Draws!");
          dealerCard();
          if (dealerScore() > 9) {
            dealerScore() -= 10;
          }
        }
      } else if (dealerScore == 6) {
        if (pThird == 6 || pThird == 7) {
          console.log("Banker Draws!");
          dealerCard();
          if (dealerScore > 9) {
            dealerScore -= 10;
          }
        }
      }
    }

    
    console.log("---Player---");
    // console.log(playerhand);
    console.log(playerScore);
    console.log("---Banker---");
    console.log(dealerScore);

    if (playerScore > dealerScore) {

      console.log("Player Wins!");
    } else if (playerScore == dealerScore) {
      console.log("Tie!");

    }

    else console.log("Banker Wins!");

  }






function startGame() {

    playerCard();
    dealerCard();
    playerCard();
    dealerCard();  
    thirdCards();
    console.log("PLAYER THIRD CARD = " + pThird)  

    // getScore();
  
}







































function endBank (){
    if (bank<1){
        removeCard();
        hideBtn();
        removeBet();
        messageDisplay.textContent = "No More Money :( Shuffle to restart."
    }
}

function addTen(){
    bet += 10;
    console.log("You added $10 to you bet.")
    console.log(bet)
    betTotal.textContent = `Bet: ${bet}`
}
function addTwenty(){
    bet += 20;
    console.log("You added $20 to you bet.")
    console.log(bet)
    betTotal.textContent = `Bet: ${bet}`
}
function addFifty(){
    bet += 50;
    console.log("You added $50 to you bet.")
    betTotal.textContent = `Bet: ${bet}`
}
function addHundred(){
    bet += 100;
    console.log("You added $100 to you bet.")
    betTotal.textContent = `Bet: ${bet}`
}

monies.textContent = `Bank: $${bank}`
betTotal.textContent = `Bet: ${bet}`

function removeCard(){
    playScoreDisplay.textContent = " ";
    dealerScoreDisplay.textContent = " ";
    messageDisplay.textContent = "";
    showBtn();
    while(playerHand.firstChild){
        playerHand.removeChild(playerHand.firstChild)
    }
    while(dealerHand.firstChild){
        dealerHand.removeChild(dealerHand.firstChild)
    }
}

function removeBet(){
    moneyButtons.classList.add("hideButton");
}
function replaceBet(){
    moneyButtons.classList.remove("hideButton");
}
function hideBtn(){
    stayBtn.classList.add("hide")
    hitBtn.classList.add("hide")
}
function showBtn(){
    stayBtn.classList.remove("hide")
    hitBtn.classList.remove("hide")
}



