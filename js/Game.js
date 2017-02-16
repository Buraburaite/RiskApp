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
    startGame : null,
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

  function startGame() {
    GAME.phase = 'StartGame Phase'
    god.trigger('startGame');


    GAME.turn = 0;
    // promptForPlayers();
    players.push(Player('Javi', 1, 'Targaeryn'));
    players.push(Player('Durkee', 2, 'Baratheon'));

    addArmy(players[0], waypoints[0]);
    addArmy(players[1], waypoints[3]);

    startTurn();
  }
  GAME.startGame = startGame;

  function startTurn() {
    GAME.phase = 'Start Phase';
    god.trigger('start');

    // players.forEach((player) => {
    //   currentPlayer = player;
    //   ready = false;
    //   readyChecker = setInterval(checkIfReady, 80);
    //   while (!ready) {
    //     console.log(currentPlayer.name);
    //   }
    // });
    // currentPlayer = null;
  }

  function movePhase(phaseNum) {
    GAME.phase = 'Move Phase ' + phaseNum;
    god.trigger('move', {});
  }

  function combatPhase(phaseNum) {
    GAME.phase = 'Combat Phase ' + phaseNum;
    god.trigger('combat');
  }

  function endTurn() {
    GAME.phase = 'End Phase';
    god.trigger('end');
  }

  function endGame() {
    GAME.phase = 'EndGame Phase';
    god.trigger('endGame');
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
    GAME.latestArmyQuery = query;

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

  god.on('startGame', (e) => { console.log('The Game of Thrones has begun'); });
  god.on('start',     (e) => { GAME.turn++; console.log('Turn ' + GAME.turn + ' has begun'); });
  god.on('move',      (e) => { console.log('Armies are on the move...'); });
  god.on('combat',    (e) => { console.log('Tension is in the air...'); });
  god.on('end',       (e) => { console.log('Turn ' + GAME.turn + ' has ended'); });
  god.on('endGame',   (e) => { console.log('The Game of Thrones has ended'); });

  return GAME;
}
