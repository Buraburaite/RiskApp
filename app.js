//Create Game object
let gameOfThrones  = Game('../IgnoreThis/Assets/Images/fry.jpg');

let testBtn = $('#test-btn');
testBtn.click(() => {
  gameOfThrones.ready = true;
});


$(document).ready(() => {
  gameOfThrones.start();
});
