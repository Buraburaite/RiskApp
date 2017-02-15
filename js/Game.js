function Game(mapImgPath) {

  let currentPlayer, ready, readyChecker;
  const _god = $({});
  const _map = $('.map');
  const _world = World(_god, currentPlayer, _map, mapImgPath);

  const players = [];
  const waypoints = _world.waypoints;
  let turn;
  let latestArmyQuery;
  let checkIfReady = () => {
    if (ready) {
      clearInterval(readyChecker);
    }
  };



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


    turn = 0;
    // promptForPlayers();
    players.push(Player('Javi', 1, 'Targaeryn'));
    players.push(Player('Durkee', 2, 'Baratheon'));

    _addArmy(players[0], waypoints[0]);
    _addArmy(players[1], waypoints[3]);

    _god.trigger('startEvent'); //doesn't currently do anything
    _startTurn();
  }

  function _startTurn() {
    turn++;
    _god.trigger('startTurnEvent');

    // players.forEach((player) => {
    //   currentPlayer = player;
    //   ready = false;
    //   readyChecker = setInterval(checkIfReady, 80);
    //   while (!ready) {
    //     console.log(currentPlayer.name);
    //   }
    // });

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

  function _addArmy(player, waypoint) {
    Army(_god, _map, player, waypoint);
    updateWorld();
  }

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
    currentPlayer : currentPlayer,
    latestArmyQuery : latestArmyQuery,
    queryArmies : queryArmies,
    moveArmies: moveArmies,
    ready : ready,
    start : start,
    turn : turn,
    waypoints : waypoints
  };
}
