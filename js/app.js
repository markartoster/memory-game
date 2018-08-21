const cardList = $('.card');
const cardListLength = cardList.length;

console.log(cardListLength);

let arrayOfPictures = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf',
'fa fa-bicycle', 'fa fa-bomb','fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube',
'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

let psuedoRandomSort = arrayOfPictures.sort(() => 0.5 - Math.random());


//Time variables
let sec = 0;
let min = 0;
let timeCounter = 0;
let counter;

//UI elements
const gameTimeUI = document.querySelector("#time");
console.log(gameTimeUI);

//Manages timeflow and displays it on ui
startTimeCounting = () => {
  counter = setInterval(() => {
    gameTimeUI.innerHTML = "Time: " + min +" mins "+ sec + " secs";
    console.log(gameTimeUI);
    timeCounter = "Time: " + min +" mins "+ sec + " secs";
    sec++;
      if(sec === 60) {
        min++;
        sec = 0;
      }
  },1000);

}

/*
  Gives ids to cards with "cursor" class usage:
  card cursor0 <-- actual card
  card cursor1 <-- next card, while prev cursor gets deleted
  repeat the process
*/
setIdToDeckCards = () => {
 if( cardListLength != 0) {
   for(let cardId = 0; cardId < cardListLength; cardId++) {
     $(".card.cursor"+cardId).attr("id", cardId);
     $(".card.cursor"+cardId).next().addClass("cursor"+(cardId+1));
     $(".card.cursor"+cardId).removeClass("cursor"+cardId);
   }
 }
}

setPicturesToCards = () => {
  let pictureId;
  for(pictureId = 0; pictureId < cardListLength; pictureId++){
    $(".hiddenPicture"+pictureId).addClass(arrayOfPictures[pictureId]);
    $(".hiddenPicture"+pictureId).next().addClass("hiddenPicture"+(pictureId+1));
    $(".hiddenPicture"+pictureId).removeClass("hiddenPicture"+pictureId);
  }
}

//Game Variables
let number = 0;
let firstCard = "";
let secondCard = "";
let numberOfMoves = 0;
let correctGuess = 0;

//Refresh Cards
turn = () => {
  $(firstId).removeClass("open show");
  $(secondId).removeClass("open show");
  $(firstId).removeClass("wrong");
  $(secondId).removeClass("wrong");
}
/*
  On card click
*/
$(".card").click(function(event) {

  if(numberOfMoves < 18) {
    $("#star3").removeClass();
    $("#star3").addClass("fa fa-star-o");
  }
  else if(numberOfMoves < 24) {
    $("#star2").removeClass();
    $("#star2").addClass("fa fa-star-o");
  }
  else {
    $("#star1").removeClass();
    $("#star1").addClass("fa fa-star-o");
  }
  if (number < 2) {
    number++;
    if(number === 1) {
      firstCard = event.target.childNodes[1];
      firstId = document.getElementById(event.target.id);
      $(firstId).addClass("open show");
    }
    else {
      secondCard = event.target.childNodes[1];
      secondId = document.getElementById(event.target.id);
      $(secondId).addClass("open show");
    }

    if(number === 2) {
      if(firstCard.isEqualNode(secondCard)) {
        $(firstId).addClass("match");
        $(secondId).addClass("match");
        $(firstId).removeClass("open show");
        $(secondId).removeClass("open show");
        number = 0;
        firstCard = "";
        secondCard = "";
        numberOfMoves++;
        $(".moves").html(numberOfMoves);
        correctGuess++;
    }
      else {
        if(!(firstCard.isEqualNode(secondCard))) {
        $(firstId).addClass("wrong");
        $(secondId).addClass("wrong");
        setTimeout(turn , 500);
        number = 0;
        firstCard = "";
        secondCard = "";
        numberOfMoves++;
        $(".moves").html(numberOfMoves);
        }
      }
    }
  }
});
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


startTimeCounting();
setIdToDeckCards();
setPicturesToCards();
