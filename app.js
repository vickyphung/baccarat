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
        return 10;
        }
    } 


//Boolean to check ace.
    if (isNaN(value)) { 
        let score=0;
        if(player==="player"){
            score=playerScore + 11;
        }
        else {
            score = dealerScore + 11;
        }
        if(value == "A") {
            hasAce = true;
            console.log("HAS AN ACE")
        }
        if (playerScore+11>16 && value == "A") {
            return 11;
        }
        if (playerScore<16 && hasAce === true) {
            return 1;
        }
        if (dealerScore+11>16 && value == "A") {
            return 11;
        }
        if (dealerScore<16 && hasAce === true) {
            return 1;
        }
    }
 return parseInt(value);
}


function checkBj(){
    if ((hasAce === true) && (playerScore === 21)){
        messageDisplay.textContent = "BLACKJACK"
    }
}
function startGame() {
//Deals a hidden card to the dealer.
    hidden = deck.pop();
    dealerScore += getValue(hidden, "dealer");
    console.log("Dealer Hidden Card " + hidden + "  Dealer Score  " + dealerScore)  

    //Deals a second card to the dealer hand.
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card, "dealer");
        // dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
    }
    console.log(dealerScore);
    dealerScoreDisplay.textContent = `DEALER: ?`

//Deals two cards to the player. Appends card images to div, which appends to the player hand. 
    for (let i = 1; i < 3; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        let div = document.createElement("div");
        cardImg.src = "./cards/" + card + ".png";
        div.append(cardImg)
        div.classList.add("pCards");
        document.getElementById("player-hand").appendChild(div);
        console.log("Player Card Dealt  " + card)
        playerScore += getValue(card, "player");
        console.log("Player Score Update  " + playerScore)
        playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    }
    if ((hasAce === true) && (playerScore === 21)){
        messageDisplay.textContent = "PLAYER BLACKJACK! NICE!"
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card);
        console.log(card)
        console.log(dealerScore)
        dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
        document.getElementById("dealer-hand").append(cardImg);
        }
}

//PLAYER HIT CARD.
function hit() {
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerScore += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);
        console.log("Player Cards")
        console.log(card)
    }
//If Player goes over 21 while hitting.
    if (playerScore > 21) {
        hideBtn();
        replaceBet();
        messageDisplay.textContent = "Oh No, Busted ㋛ You Lose.";
//If player busts, reveal dealer card and dealer score.
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
        bank -= bet;
        message = `You lost ${bet}.`
        console.log(`You busted. Lost ${bet}. Have $${bank} left.`)
        monies.textContent = `Bank: $${bank}`
        bet = 0;
        betTotal.textContent = `Bet: ${bet}`
        endBank ();
    }
    console.log("Player Hand Should Append, PlayerScore Update")
    console.log(playerScore);
    playScoreDisplay.textContent = `PLAYER: ${playerScore}`
}
//Stand function, essentially evaluates score and ends game.
function stay() {
    hideBtn();
    replaceBet();
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    while (dealerScore < 17) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            dealerScore += getValue(card);
            console.log(card)
            console.log(dealerScore)
            dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
            document.getElementById("dealer-hand").append(cardImg);
    }
    let message = "";
    if (playerScore > 21) {
        message = "Busted! :(";
        bank -= bet;
        message = `You lost ㋛.`
        console.log(`You busted. Lost ${bet}. Have $${bank} left.`)
    }
    if (dealerScore > 21) {
        message = `😃 Dealer Busts. You Win! YAY! 💰💰`;
        bank += bet;
        monies.textContent = `Bank: $${bank}`
        console.log(`You win ${bet}. Have $${bank}.`)
    }
    else if (playerScore == dealerScore) {
        message = "Tie!";
    }
    else if (playerScore > dealerScore) {
        message = `😃 You Win! YAY! 💰💰`;
        bank += bet;
        monies.textContent = `Bank: $${bank}`
        console.log(`You win ${bet}. Have $${bank}.`)
    }
    else if (playerScore < dealerScore) {
        message = "You Lose! ㋛";
        bank -= bet;
        monies.textContent = `Bank: $${bank}`
        console.log(`Lost ${bet}. Have $${bank} left.`)  
    }
    playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
    messageDisplay.textContent = message;
    console.log(message)
    monies.textContent = `Bank: $${bank}`
    bet = 0;
    betTotal.textContent = `Bet: ${bet}`
    endBank ();
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
function dealHands(){
    removeBet();
    removeCard();
    endBank ();
    playerScore = 0;
    dealerScore = 0;

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
    
        let div = document.createElement("div");

        cardImg.src = "./cards/" + card + ".png";
        div.append(cardImg)
        div.classList.add("playCards");
        document.getElementById("player-hand").appendChild(div);
        console.log("Player Card Dealt  " + card)
        playerScore += getValue(card);
        console.log("Player Score Update  " + playerScore)
        playScoreDisplay.textContent = `PLAYER: ${playerScore}`
    }

    let hiddenDealerCard = document.createElement("img");
    hiddenDealerCard.id = "hidden"
    hiddenDealerCard.src = "./cards/BACK.png"
    dealerScore += getValue(hidden);
    dealerHand.appendChild(hiddenDealerCard);
    console.log("Dealer Card Dealt  " + hidden)

    if ((hasAce === true) && (playerScore === 21)){
        console.log("BLACKJACK");
        bank += ((3/2)*bet);
        monies.textContent = `Bank: $${bank}`
        console.log(`WON ${bet}. NIOCE.`)
        messageDisplay.textContent = "YOU WIN! YOU GOT BLACKJACK!!"
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card);
        console.log(card)
        console.log(dealerScore)
        dealerScoreDisplay.textContent = `DEALER: ${dealerScore}`
        document.getElementById("dealer-hand").append(cardImg);
        return;
    }
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerScore += getValue(card);
        console.log(card)
        console.log("d score " + dealerScore)
        document.getElementById("dealer-hand").append(cardImg);
    }
    if ((hasAce === true) && (dealerScore === 21)){
        console.log("DEALER BLACKJACK");
        }
    dealerScoreDisplay.textContent = ` DEALER: ?`
}

function surrender(){
    bet = bet/2;
    bank = bank - bet;
    monies.textContent = `Bank: $${bank}`
    removeCard();
    messageDisplay.textContent = "You surrendered. You got half your bet back."
}


////bet $, & limits
//end game at bank=0, cxards=0
//(ACE VALUE......... ) when ace is player first card, problem!
//let dealer  hasAce
//let player hasAce
//create array
//append card obj to array

//Deals two cards - how do I access each card as its own element
    // playerCardOne
    // playerCardTwo
    // dealerCardOne
    // dealerCardTwo

// Split
    //if value of playerCardOne = playerCard Two, option to split
    // create //array
    // value = value
    // remove first firstChild
    // creaate a hidden div, 
    // otherhand . push (playerhand.pop())


//Insurance
    //if dealerCardTwo is "A" = offer insurance and surrender options
        //insurance = bet/2....
    //if dealer has ace **SHOWING** (aka dealers second card) = insurance option show, buy insurance->
    // insurance cost half the bet, if dealer has an ace,
    //pay out 2:1

//Double Down 
    //if value of dealerCardOne + dealerCardTwo = 10 || 11
    // Double down option, w/ hit and stand
    //DDHIT, DDSTAND, can hit only ONCE.

//push value to array
//let cards = [];
// inside deal and hit
//push value to array.
//cards.push(value)
//when dealing a single card
// if the new card exists in the current hand
// then give option to split
// !!! - new variable?
// currentHand array
//playhand2
//at split, get value, ctreate div for second hand


// when dealing a single card
// if the new card exists in the current hand
// then give option to split

// which appends to the player hand. 
//     for (let i = 1; i < 3; i++) {
//         let cardImg = document.createElement("img");
//         let card = deck.pop();

//         let div = document.createElement("div");
//         cardImg.src = "./cards/" + card + ".png";
//         div.append(cardImg)
//         div.classList.add("pCards");
//         // yourAceCount += checkAce(card);
//         document.getElementById("player-hand").appendChild(div);
//         console.log("Player Card Dealt  " + card)
//         playerScore += getValue(card);
//         console.log("Player Score Update  " + playerScore)
//         playScoreDisplay.textContent = `PLAYER: ${playerScore}`
//     }

// !!! - new variable?
// currentHand array

// <!-- Areas for the player's split hands. -->

// <div id="player1" class="playingField" style="display:none;">
//   <div class="textBox name">Player</div>
//   <div id="player1Score"  class="textBox">&nbsp;</div>
//   <div id="player1Bet"    class="textBox dollars">&nbsp;</div>
//   <div id="player1Result" class="textBox result">&nbsp;</div>
//   <div id="player1Cards"  class="cardArea"></div>
// </div>