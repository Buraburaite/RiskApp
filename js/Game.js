function Game(mapImgPath) {

  GAME = { //Public variables
    currentPlayer : null,
    god : $({}),
    latestArmyQuery : null,
    queryArmies : null,
    map : $('.map'),
    moveArmies: null,
    phase : null,
    players : [],
    start : null,
    turn : null,
    updateWorld : null,
    waypoints : null
  };

  //Could do some destructuring here, but whatever

  const god = GAME.god;
  const map = GAME.map;
  const players = GAME.players;

  const world = World(mapImgPath);
  const waypoints = world.waypoints;
  GAME.waypoints = world.waypoints;

  // let checkIfReady = () => {
  //   if (ready) {
  //     clearInterval(readyChecker);
  //   }
  // };



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
    logPhases();


    turn = 0;
    // promptForPlayers();
    players.push(Player('Javi', 1, 'Targaeryn'));
    players.push(Player('Durkee', 2, 'Baratheon'));

    addArmy(players[0], waypoints[0]);
    addArmy(players[1], waypoints[3]);

    god.trigger('startEvent'); //doesn't currently do anything
    startTurn();
  }
  GAME.start = start;

  function startTurn() {
    turn++;
    god.trigger('startTurnEvent');

    // players.forEach((player) => {
    //   currentPlayer = player;
    //   ready = false;
    //   readyChecker = setInterval(checkIfReady, 80);
    //   while (!ready) {
    //     console.log(currentPlayer.name);
    //   }
    // });
    // currentPlayer = null;

    movePhase(1);
  }

  function movePhase(phaseNum) {
    god.trigger('movePhaseEvent', {});

    combatPhase(phaseNum);
  }

  function combatPhase(phaseNum) {
    god.trigger('combatPhaseEvent');

    if (phaseNum++ < 3) { movePhase(phaseNum); }
    else                { endTurn  (); }
  }

  function endTurn() {
    god.trigger('endTurnEvent');

    // startTurn();
  }

  function end() {
    god.trigger('endEvent');

  }

  function addArmy(player, waypoint) {
    Army(player, waypoint);
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
    god.trigger('queryArmies', query);
    latestArmyQuery = query;

    return query;
  }
  GAME.queryArmies = queryArmies;

  function moveArmies(originNum, targetNum) {
    player = players[0];
    origin = waypoints[originNum];
    let query = queryArmies(player, origin);
    query[waypoints[originNum].name].forEach((army) => { army.moveTo(waypoints[targetNum]); });
    updateWorld();
  }
  GAME.moveArmies = moveArmies;

  function updateWorld() { god.trigger('worldUpdate', queryArmies()); }
  GAME.updateWorld = updateWorld;

  function logPhases() {
    god.on('startEvent',     (e) => { console.log('The Game of Thrones has begun'); });
    god.on('startTurnEvent', (e) => { console.log('Turn ' + turn + ' has begun'); });
    god.on('moveEvent',      (e) => { console.log('Armies are on the move...'); });
    god.on('combattEvent',   (e) => { console.log('Tension is in the air...'); });
    god.on('endTurnEvent',   (e) => { console.log('Turn ' + turn + ' has ended'); });
    god.on('endEvent',       (e) => { console.log('The Game of Thrones has ended'); });
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

  return GAME;
}
