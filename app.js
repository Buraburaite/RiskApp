//Create Game object
let GAME = {};
Game();

function loadSounds () {
  ion.sound({
    sounds: [{name: "ambience"}, {name: 'tap'}],

    path: "./js/sounds/",
    preload: true,
    volume: 0.1
  });
}


$(document).ready(() => {
  GAME.startGame();
  loadSounds();
  ion.sound.play('ambience');
});
