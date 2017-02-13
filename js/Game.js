function Game(mapImgPath) {

  const player = [];
  const world = World(mapImgPath);
  const map = world.map;

  let turn = 0;

  let ee = $({});

  function _addArmy(army, x, y) {
    map.append(army.img);
    army.moveTo(x,y);
  }

  function start() {
    _newTurn();
  }

  function _newTurn() {
    turn++;

    let archen = Army(ee, 0,0);
    _addArmy(archen);
    let input = prompt('Give instructions: ');
    if (input === 'ee') {
      ee.trigger('pizza');
    }

    input = input.split(',');
    archen.moveTo(input[0], input[1]);
  }

  return {
    world: world,
    players: player,
    start : start
  };
}
