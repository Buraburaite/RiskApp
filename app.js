//Create Game object
let game = Game();

function loadSounds () {
  ion.sound({
    sounds: [{name: "ambience", loop: true}],

    path: "./lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 0.1
  });
}

//Elements for testing
let incrementBtn = $('#round-increment-btn').click((e) => {
  game.newRound();
});
let roundBtn = $('#round-btn').click((e) => {
  game.round = $('#round-input').val();
});

game.god.on('worldUpdate', (e, round) => {
  incrementBtn.html('Current Turn: ' + round);
});
$(document).ready(() => {
  game.startGame();
});
