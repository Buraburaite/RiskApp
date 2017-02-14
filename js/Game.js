function Game(mapImgPath) {

  const player = [];
  const world = World(mapImgPath);
  const map = world.map;
  const waypoints = world.waypoints;
  const players = [];

  const god = $({});

  let turn;

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
    _logPhases();

    god.trigger('startEvent'); //doesn't currently do anything

    turn = 0;
    // promptForPlayers();
    players.push(Player('Javi', 1, 'Targaeryn'));

    _startTurn();
  }

  function _startTurn() {
    turn++;
    god.trigger('startTurnEvent');

    for (let i = 0; i < waypoints.length; i++) {
      _addArchen(player[0], waypoints[i]);
    }

    _movePhase(1);
  }

  function _movePhase(phaseNum) {
    god.trigger('movePhaseEvent');
    let input = prompt('Give instructions for: ');

    _combatPhase(phaseNum);
  }

  function _combatPhase(phaseNum) {
    god.trigger('combatPhaseEvent');

    if (phaseNum++ < 3) { _movePhase(phaseNum); }
    else                { _endTurn  (); }
  }

  function _endTurn() {
    god.trigger('endTurnEvent');

    // _startTurn();
  }

  function _end() {
    god.trigger('endEvent');

  }

  function _addArchen(player, waypoint) {
    let army = Army(god, player, waypoint);
    map.append(army.img);
    // input = input.split(',');
    // archen.moveTo(waypoint);
  }

  function _logPhases() {
    god.on('startEvent',     () => { console.log('The Game of Thrones has begun'); });
    god.on('startTurnEvent', () => { console.log('Turn ' + turn + 'has begun'); });
    god.on('moveEvent',      () => { console.log('Armies are on the move...'); });
    god.on('combattEvent',   () => { console.log('Tension is in the air...'); });
    god.on('endTurnEvent',   () => { console.log('Turn ' + turn + 'has ended'); });
    god.on('endEvent',       () => { console.log('The Game of Thrones has ended'); });
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
