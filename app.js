//Create Game object
let game  = Game('../IgnoreThis/Assets/Images/fry.jpg');
let world = game.world;


let testBtn = $('#testBtn');
testBtn.click(() => {
  game.addArmy(493, 315);
});
