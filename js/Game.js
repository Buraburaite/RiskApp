function Game(mapImgPath) {

  const _god = $({});
  const _map = $('.map');
  const _world = World(_god, _map, mapImgPath);

  const players = [];
  const waypoints = _world.waypoints;
  let turn;
  let latestArmyQuery;



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


    _turn = 0;
    // promptForPlayers();
    players.push(Player('Javi', 1, 'Targaeryn'));

    for (let i = 0; i < waypoints.length; i++) {
      _addArmyAt(waypoints[i]);
    }

    _god.trigger('startEvent'); //doesn't currently do anything
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

  function _addArmyAt(waypoint) { Army(_god, _map, players[0], waypoint); }

  function queryArmies() {
    let query = {};
    players.forEach((p)  => {
      waypoints.forEach((wp) => {
        query[p.name]  = [];
        query[wp.name] = [];
        query[p.name + ':' + wp.name] = [];
        query[wp.name + ':' + p.name] = [];
      });
    });
    _god.trigger('queryArmies', query);
    latestArmyQuery = query;

    return query;
  }

  function moveArmies(originNum, targetNum) {
    player = players[0];
    origin = waypoints[originNum];
    let query = queryArmies(player, origin);
    query[waypoints[originNum].name].forEach((army) => { army.moveTo(waypoints[targetNum]); });
    updateWorld();
  }

  function updateWorld() { _god.trigger('worldUpdate', queryArmies()); }

  function _logPhases() {
    _god.on('startEvent',     (e) => { console.log('The Game of Thrones has begun'); });
    _god.on('startTurnEvent', (e) => { console.log('Turn ' + turn + ' has begun'); });
    _god.on('moveEvent',      (e) => { console.log('Armies are on the move...'); });
    _god.on('combattEvent',   (e) => { console.log('Tension is in the air...'); });
    _god.on('endTurnEvent',   (e) => { console.log('Turn ' + turn + ' has ended'); });
    _god.on('endEvent',       (e) => { console.log('The Game of Thrones has ended'); });
  }

  //Gather Player data, and create Player objects
  function promptForPlayers() {

    let names = ['armies'], houses = ['armies']; //'armies' is a reserved name
    let waypointNames = waypoints.map((wp) => wp.name);

    let input = prompt('How many players?');
    for (let i = 1; i < +input + 1; i++) {

      input = prompt('Name of Player ' + i + '?');
      while (names.includes(input) || waypointNames.includes(input)) {
        name = prompt('Name already taken, please enter a new name...');
      }
      names.push(input);

      input = prompt('What is the name of your house?');
      while (houses.includes(input) || waypointNames.includes(input)) {
        house = prompt('Name already taken, please enter a new name...');
      }
      houses.push(input);

      players.push(Player(name, i, house));
    }
  }

  return {
    latestArmyQuery : latestArmyQuery,
    queryArmies : queryArmies,
    moveArmies: moveArmies,
    start : start,
    turn : turn,
    waypoints : waypoints
  };
}
