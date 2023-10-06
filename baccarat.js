
// const playerHand = document.getElementById("player-hand")
// const dealerHand = document.getElementById("dealer-hand")
// const playScoreDisplay = document.getElementById("player-score")
// const dealerScoreDisplay = document.getElementById("dealer-score")

// let playerScore = 0;
// let dealerScore = 0;
// let deck;

const suits = ["C", "H", "S", "D"];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0];

function getDeck() {
  let deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suits: suits[i] };
      deck.push(card);
    }
  }

  return deck;
}

// function shuffle(deck) {
//   for (let i = 0; i < 1; i++) {
//     let location1 = Math.floor(Math.random() * deck.length);
//     let location2 = Math.floor(Math.random() * deck.length);
//     let tmp = deck[location1];

//     deck[location1] = deck[location2];
//     deck[location2] = tmp;
//   }
// }

function shuffle(deck) {
  for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * deck.length);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
  }
  console.log("shuffled deck");
  // console.log(deck);
}

let numShoes = 1;

// function startGame() {
for (let j = 0; j < numShoes; j++) {

  let deck = getDeck();

  let eightdeck = deck.concat(
    deck.concat(
      deck.concat(deck.concat(deck.concat(deck.concat(deck.concat(deck)))))
    )
  );

  shuffle(eightdeck);

  let handNum = 1;
  while (eightdeck.length > 6) {
  //while (eightdeck.length > 415) {
    let playerhand = new Array();
    let bankerhand = new Array();

    playerhand.push(eightdeck.pop());
    bankerhand.push(eightdeck.pop());
    playerhand.push(eightdeck.pop());
    bankerhand.push(eightdeck.pop());

    let playerTotal = playerhand[0].Value + playerhand[1].Value;
    let bankerTotal = bankerhand[0].Value + bankerhand[1].Value;

    if (playerTotal > 9) {
      playerTotal -= 10;
    }

    if (bankerTotal > 9) {
      bankerTotal -= 10;
    }

    if (playerTotal >= 8 || bankerTotal >= 8) {
    } else if (playerTotal > 5 && playerTotal < 8) {
      if (bankerTotal <= 5) {
        console.log("Banker Draws!");
        bankerhand.push(eightdeck.pop());
        bankerTotal += bankerhand[2].Value;
        if (bankerTotal > 9) {
          bankerTotal -= 10;
        }
      }
    } else {
      console.log("Player Draws!");
      playerhand.push(eightdeck.pop());
      playerTotal += playerhand[2].Value;
      if (playerTotal > 9) {
        playerTotal -= 10;
      }
      if (bankerTotal <= 5) {
        console.log("Banker Draws!");
        bankerhand.push(eightdeck.pop());
        bankerTotal += bankerhand[2].Value;
        if (bankerTotal > 9) {
          bankerTotal -= 10;
        }
      } else if (bankerTotal == 4) {
        if (
          playerhand[2].Value == 2 ||
          playerhand[2].Value == 3 ||
          playerhand[2].Value == 4 ||
          playerhand[2].Value == 5 ||
          playerhand[2].Value == 6 ||
          playerhand[2].Value == 7
        ) {
          console.log("Banker Draws!");
          bankerhand.push(eightdeck.pop());
          bankerTotal += bankerhand[2].Value;
          if (bankerTotal > 9) {
            bankerTotal -= 10;
          }
        }
      } else if (bankerTotal == 5) {
        if (
          playerhand[2].Value == 4 ||
          playerhand[2].Value == 5 ||
          playerhand[2].Value == 6 ||
          playerhand[2].Value == 7
        ) {
          console.log("Banker Draws!");
          bankerhand.push(eightdeck.pop());
          bankerTotal += bankerhand[2].Value;
          if (bankerTotal > 9) {
            bankerTotal -= 10;
          }
        }
      } else if (bankerTotal == 6) {
        if (playerhand[2].Value == 6 || playerhand[2].Value == 7) {
          console.log("Banker Draws!");
          bankerhand.push(eightdeck.pop());
          bankerTotal += bankerhand[2].Value;
          if (bankerTotal > 9) {
            bankerTotal -= 10;
          }
        }
      }
    }

    console.log("Hand " + handNum + ":");
    console.log("----------------Player--------------");
    console.log(playerhand);
    console.log(playerTotal);
    console.log("----------------Banker--------------");
    console.log(bankerhand);
    console.log(bankerTotal);

    if (playerTotal > bankerTotal) {
      // if(playerhand.length == 3 && playerTotal == 8){
      //   console.log("PANDA!");
      //   pandaCounter.push(handNum);
      // }
      // else
      console.log("Player Wins!");
    } else if (playerTotal == bankerTotal) {
      console.log("Tie!");
      // tieCounter.push(handNum);
    }
    // if(bankerhand.length == 3 && bankerTotal == 7){
    //   console.log("DRAGON!");
    //   dragonCounter.push(handNum);
    // }
    // else
    else console.log("Banker Wins!");

    handNum++;



  }
  // console.log("Dragons in Shoe: ");
  // console.log(dragonCounter);
  // console.log("Pandas in Shoe: ");
  // console.log(pandaCounter);
  // console.log("Ties in Shoe: ");
  // console.log(tieCounter);
  // if(dragonCounter[0] > 0){
  //   dragonShoeWin++
  // }
  // else
  //   dragonShoeLoss++
}
// }