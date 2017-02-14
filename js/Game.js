function Game(mapImgPath) {

  const _players = [];
  const _world = World(mapImgPath);
  const _map = _world.map;
  const _waypoints = _world.waypoints;

  const _god = $({});

  let _turn;

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

    _god.trigger('startEvent'); //doesn't currently do anything

    _turn = 0;
    // promptForPlayers();
    _players.push(Player('Javi', 1, 'Targaeryn'));

    for (let i = 0; i < _waypoints.length; i++) {
      _addMon(_waypoints[i]);
    }

    _startTurn();
  }

  function _startTurn() {
    _turn++;
    _god.trigger('startTurnEvent');
    let orders = {};

    _movePhase(1);
  }

  function _movePhase(phaseNum) {
    _god.trigger('movePhaseEvent', {});

    _combatPhase(phaseNum);
  }

  function _combatPhase(phaseNum) {
    _god.trigger('combatPhaseEvent');

    if (phaseNum++ < 3) { _movePhase(phaseNum); }
    else                { _endTurn  (); }
  }

  function _endTurn() {
    _god.trigger('endTurnEvent');

    // _startTurn();
  }

  function _end() {
    _god.trigger('endEvent');

  }

  function _addMon(waypoint) { Army(_god, _map, _players[0], waypoint); }

  function getArmies(player, waypoint) {
    let armies = [];
    console.log(armies);
    _god.trigger('queryArmies', {
      'armies': armies,
      'player': player,
      'waypoint': waypoint
    });

    console.log(armies);
    return armies;
  }

  function _logPhases() {
    _god.on('startEvent',     (e) => { console.log('The Game of Thrones has begun'); });
    _god.on('startTurnEvent', (e) => { console.log('Turn ' + _turn + ' has begun'); });
    _god.on('moveEvent',      (e) => { console.log('Armies are on the move...'); });
    _god.on('combattEvent',   (e) => { console.log('Tension is in the air...'); });
    _god.on('endTurnEvent',   (e) => { console.log('Turn ' + _turn + ' has ended'); });
    _god.on('endEvent',       (e) => { console.log('The Game of Thrones has ended'); });
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

      _players.push(Player(name, i, house));
    }
  }

  function moveMon(originNum, targetNum) {
    player = _players[0];
    origin = _waypoints[originNum];
    let armies = getArmies(player, origin);
    armies.forEach((mon) => { mon.moveTo(_waypoints[targetNum]); });
    console.log(armies);
  }

  return {
    moveMon: moveMon,
    start : start
  };
}
