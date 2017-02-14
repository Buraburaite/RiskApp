function Game(mapImgPath) {

  const player = [];
  const world = World(mapImgPath);
  const map = world.map;
  const players = [];

  let turn = 0;

  const god = $({});

  function _addArchen(player, x, y) {
    let army = Army(ee, player, x, y);
    map.append(army.img);
  }

  //Gather Player data, and create Player objects
  function promptForPlayers() {

    let name, names = [], house, houses = [];

    let input = prompt('How many players?');
    for (let i = 1; i < +input + 1; i++) {

      name = prompt('Name of Player ' + i + '?');

      while (names.includes(name)) {
        name = prompt('Name already taken, please enter a new name...');
      }

      house = prompt('What is the name of your house?');

      while (houses.includes(houses)) {
        house = prompt('Name already taken, please enter a new name...');
      }

      names.push(name);
      houses.push(house);

      players.push(Player(name, i, house));
    }
  }

  function start() {
    god.trigger('startEvent'); //doesn't currently do anything

    // promptForPlayers();

    god.trigger('newTurnEvent');
    _newTurn();
  }

  function _newTurn() {
    turn++;

    _addArchen(player[0], 0, 0);
    _addArchen(player[0], 50, 50);
    let input = prompt('Give instructions: ');


    god.trigger('moveEvent');
    input = input.split(',');
    archen.moveTo(input[0], input[1]);

  }

  return {
    world: world,
    players: player,
    start : start
  };
}
