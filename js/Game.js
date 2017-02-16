function Game(mapImgPath) {

  GAME = { //Public variables
    currentPlayer : null,
    god : $({}),
    latestArmyQuery : null,
    queryArmies : null,
    map : $('.map'),
    moveArmies: null,
    orders : null,
    phase : null,
    players : [],
    prevClick : null,
    startGame : null,
    startTurn : null,
    movePhase : null,
    combatPhase : null,
    endTurn : null,
    endGame : null,
    turn : null,
    updateWorld : null,
    waypoints : []
  };

  /*====
  It is only okay to create shortened references
  for these four parts of GAME, anywhere in the program
  (world is not part of GAME)
  ====*/
  const god = GAME.god;
  const map = GAME.map;
  const players = GAME.players;
  const world = World(mapImgPath);
  const waypoints = GAME.waypoints;


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
    GAME.phase = 'StartGame Phase';
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
    god.trigger('startTurn');
  }
  GAME.startTurn = startTurn;

  function movePhase(phaseNum) {
    GAME.phase = 'Move Phase ' + phaseNum;

    GAME.orders = Orders();
    GAME.currentPlayer = players[0];
    god.trigger('movePhase');
  }
  GAME.movePhase = movePhase;

  function combatPhase(phaseNum) {
    GAME.phase = 'Combat Phase ' + phaseNum;
    god.trigger('combatPhase');
  }
  GAME.combatPhase = combatPhase;

  function endTurn() {
    GAME.phase = 'End Phase';
    god.trigger('endTurn');
  }
  GAME.endTurn = endTurn;

  function endGame() {
    GAME.phase = 'EndGame Phase';
    god.trigger('endGame');
  }
  GAME.endGame = endGame;

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

  god.on('startGame',   (e) => { console.log('The Game of Thrones has begun'); });
  god.on('startTurn',   (e) => { GAME.turn++; console.log('Turn ' + GAME.turn + ' has begun'); });
  god.on('movePhase',   (e) => { console.log('Armies are on the move...'); });
  god.on('combatPhase', (e) => { console.log('Tension is in the air...'); });
  god.on('endTurn',     (e) => { console.log('Turn ' + GAME.turn + ' has ended'); });
  god.on('endGame',     (e) => { console.log('The Game of Thrones has ended'); });

  return GAME;
}
