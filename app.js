//Creates Game object
let game = Game();

// Sounds through ion sound (currently not enabled)
function loadSounds () {
  ion.sound({
    sounds: [{name: "ambience", loop: true}],

    path: "./lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 0.1
  });
}

// Besides the game.startGame command, all of this code is for development only
let incrementBtn = $('#round-increment-btn').click((e) => {
  game.newRound();
});
let roundBtn = $('#round-btn').click((e) => {
  game.round = $('#round-input').val();
});

game.god.on('worldUpdate', (e, round) => {
  incrementBtn.html('Current Turn: ' + round);
});


function drawLine(svg) {
  let wayLines = svg.group({stroke: 'green'});
  svg.line(wayLines, 450, 120, 550, 20, {strokeWidth: 50});
}

$(document).ready(() => {
  game.startGame();

  $('#mySVGLine').svg({ onLoad: drawLine });

});
