//Create Game object
let GAME = {};
Game('../IgnoreThis/Assets/Images/fry.jpg');

let testBtn = $('#test-btn');
testBtn.click(() => {
  GAME.ready = true;
});


$(document).ready(() => {
  GAME.startGame();
});
