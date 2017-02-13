function Game(mapImgPath) {

  const player = [];
  const world = World(mapImgPath);
  const map = world.map;

  let turn = 0;

  let EventEmitter = new EventEmitter();

  function addArmy(army, x, y) {
    map.append(army.img);
    army.moveTo(x,y);
  }

  function start() {
    _newTurn();
  }

  function _newTurn() {
    turn++;

    let archen = Army(0,0);
    addArmy(archen);
    let input = prompt('Give instructions: ');

    input = input.split(',');
    archen.moveTo(input[0], input[1]);
  }

  return {
    world: world,
    players: player,
    addArmy : addArmy,
    start : start
  };
}
