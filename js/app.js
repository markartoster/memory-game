const cardList = $('.card');
const cardListLength = cardList.length;

let arrayOfPictures = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf',
'fa fa-bicycle', 'fa fa-bomb','fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube',
'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

let psuedoRandomSort = () => {
  arrayOfPictures.sort(() => 0.5 - Math.random());
}

//Time variables
let sec = 0;
let min = 0;
let timeCounter = 0;
let counter;

//UI elements
const gameTimeUI = document.querySelector("#time");

//Manages timeflow and displays it on ui
startTimeCounting = () => {
  counter = setInterval(() => {
    gameTimeUI.innerHTML = "Time: " + min +" mins "+ sec + " secs";
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

  for(let pictureId = 0; pictureId < cardListLength; pictureId++){
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
let correctGuess = 7;

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
$(".card").click((event) => {

  if(numberOfMoves > 16 & numberOfMoves <= 20) {
    $("#star3").removeClass();
    $("#star3").addClass("fa fa-star-o");
  }
  else if(numberOfMoves > 20 & numberOfMoves <= 28) {
    $("#star2").removeClass();
    $("#star2").addClass("fa fa-star-o");
  }
  else if(numberOfMoves >= 28) {
    $("#star3").removeClass();
    $("#star3").addClass("fa fa-star-o");
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

        //Refresh Game variables after correct Choice
        number = 0;
        firstCard = "";
        secondCard = "";
        numberOfMoves++;
        console.log(numberOfMoves);
        //Update UI
        $(".moves").html(numberOfMoves);
        correctGuess++;
        if(correctGuess === 8) {
          $("#win-screen").removeClass("hidden");
          document.getElementById("play-time").innerHTML = timeCounter;

          //Reset time
          sec = 0;
          min = 0;

          //Show Win-screen and set number of stars
          $("#win-screen").addClass("win-screen");
          $("#content").addClass("content");
          console.log(numberOfMoves);
          $("#moves").html("Moves: " + numberOfMoves);

          if(numberOfMoves > 16 & numberOfMoves <= 20) {
            $("#star6").removeClass();
            $("#star6").addClass("fa fa-star-o");
          }
          else if(numberOfMoves > 20 & numberOfMoves <= 28) {
            $("#star6").removeClass();
            $("#star5").removeClass();
            $("#star6").addClass("fa fa-star-o");
            $("#star5").addClass("fa fa-star-o");
          }
          else if(numberOfMoves >= 28) {
            $("#star6").removeClass();
            $("#star5").removeClass();
            $("#star4").removeClass();
            $("#star6").addClass("fa fa-star-o");
            $("#star5").addClass("fa fa-star-o");
            $("#star4").addClass("fa fa-star-o");
          }
        }
    }
      else {
        if(!(firstCard.isEqualNode(secondCard))) {
        $(firstId).addClass("wrong");
        $(secondId).addClass("wrong");

        //Flip cards to hidden state
        setTimeout(turn , 500);

        //Reset Game variables after wrong guess
        number = 0;
        firstCard = "";
        secondCard = "";
        numberOfMoves++;

        //Update UI
        $(".moves").html(numberOfMoves);
        }
      }
    }
  }
});

$(".restart").click(() => {
    //Refresh Game variables
    numberOfMoves = 0;
    number = 0;
    correctGuess = 0;
    firstCard = "";
    secondCard = "";
    console.log("hello?");
    $(".moves").html(numberOfMoves);
    $(".card").removeClass("open show");
    $(".card").removeClass("match");

    psuedoRandomSort();

    for(let cardId = 0; cardId < cardListLength; cardId++) {
    $("#"+cardId).children().removeClass();
    $("#"+cardId).children().addClass("hiddenPicture"+cardId);
    }

    for(let pictureId = 0; pictureId < cardListLength; pictureId++){
      $(".hiddenPicture"+pictureId).addClass(arrayOfPictures[pictureId]);
      $(".hiddenPicture"+pictureId).next().addClass("hiddenPicture"+(pictureId+1));
      $(".hiddenPicture"+pictureId).removeClass("hiddenPicture"+pictureId);
    }

    //Refresh Rating
    $("#star1").removeClass();
    $("#star2").removeClass();
    $("#star3").removeClass();
    $("#star1").addClass("fa fa-star");
    $("#star2").addClass("fa fa-star");
    $("#star3").addClass("fa fa-star");

    //Close Win Screen Window
    $("#win-screen").removeClass("win-screen");
    $("#content").removeClass("content");
    $("#win-screen").addClass("hidden");

    //Reset Time
    sec = 0;
    min = 0;
    $(".card").removeClass("wrong");
});

$("#play").click(() => {
    //Refresh Game variables
    numberOfMoves = 0;
    number = 0;
    correctGuess = 0;
    firstCard = "";
    secondCard = "";
    console.log("hello?");
    $(".moves").html(numberOfMoves);
    $(".card").removeClass("open show");
    $(".card").removeClass("match");

    psuedoRandomSort();

    for(let cardId = 0; cardId < cardListLength; cardId++) {
    $("#"+cardId).children().removeClass();
    $("#"+cardId).children().addClass("hiddenPicture"+cardId);
    }

    for(let pictureId = 0; pictureId < cardListLength; pictureId++){
      $(".hiddenPicture"+pictureId).addClass(arrayOfPictures[pictureId]);
      $(".hiddenPicture"+pictureId).next().addClass("hiddenPicture"+(pictureId+1));
      $(".hiddenPicture"+pictureId).removeClass("hiddenPicture"+pictureId);
    }

    //Refresh Rating
    $("#star1").removeClass();
    $("#star2").removeClass();
    $("#star3").removeClass();
    $("#star1").addClass("fa fa-star");
    $("#star2").addClass("fa fa-star");
    $("#star3").addClass("fa fa-star");

    //Close Win Screen Window
    $("#win-screen").removeClass("win-screen");
    $("#content").removeClass("content");
    $("#win-screen").addClass("hidden");

    //Reset Time
    sec = 0;
    min = 0;
    $(".card").removeClass("wrong");
});

startTimeCounting();
setIdToDeckCards();
setPicturesToCards();
