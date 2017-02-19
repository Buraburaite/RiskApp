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

$(document).ready(() => {
  game.startGame();
});
