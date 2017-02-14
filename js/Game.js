function Game(mapImgPath) {

  const player = [];
  const world = World(mapImgPath);
  const map = world.map;
  const players = [];

  const god = $({});

  /*====PHASES
  start - gather player info
  startTurn - Increment turn count, gather orders
  movePhase - up to 1 move action
  combatPhase - up to 1 combat action
  movePhase - up to 1 move action
  combatPhase - up to 1 combat action
  endTurn - reset Army.actionsLeft (think of it like night time)
  end - send victory/defeat message
  ====*/

  function start() {
    god.trigger('startEvent'); //doesn't currently do anything

    this.turn = 0;
    // promptForPlayers();

    _newTurn();
  }

  function _newTurn() {
    god.trigger('newTurnEvent');
    turn++;

    _addArchen(player[0], 0, 0);
    _addArchen(player[0], 50, 50);
    let input = prompt('Give instructions: ');


    god.trigger('moveEvent');

  }

  function _movePhase() {
    god.trigger('movePhaseEvent');

  }

  function _combatPhase() {
    god.trigger('combatPhaseEvent');

  }

  function _endTurn() {
    god.trigger('endTurnEvent');

  }

  function _end() {
    god.trigger('endEvent');

  }

  function _addArchen(player, waypoint) {
    let army = Army(god, player, waypoint);
    map.append(army.img);
    input = input.split(',');
    archen.moveTo(waypoint);
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

  return {
    world: world,
    players: player,
    start : start
  };
}
