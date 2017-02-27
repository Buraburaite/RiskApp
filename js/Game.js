function Game() {

  //Private
  let round = 0; //Increment with newRound(), never change directly.

  //Public
  const inst = {
    god : $({}),
    mapEl : $('.map-container'),
    players : [],
    placeArmies : placeArmies,
    raven : null,
    startGame : startGame,
    waypoints : null,

    get round() { return round; },
  };


  function startGame() {

    //Set up waypoints and raven (our model)
    inst.waypoints = createWaypoints(inst);
    inst.raven = Raven(inst);

    //Start Turn 1
    newRound();

    inst.players.push(Player('Javi', 'Targaryen'));
    inst.players.push(Player('Durkee', 'Baratheon'));

  }

  function newRound() {
    round++;
    raven.newState(round);
    this.god.trigger('worldUpdate', round);
  }

  function placeArmies(player, dest, num = 1) {
    //Type checking and conversion
    if (typeof player === 'string') { player = inst.players  .find((p)  => p.name  === player); }
    if (typeof dest   === 'string') { dest   = inst.waypoints.find((wp) => wp.name === dest);   }

    //Place armies
    dest.residingPlayer = player;
    dest.armyCount += num;

    inst.god.trigger('worldUpdate');
  }

  function queryArmies() {
    let query = {};
    inst.players.forEach((p)  => {
      inst.waypoints.forEach((wp) => {
        query[p.name]  = [];
        query[wp.name] = [];
        query[p.name + ':' + wp.name] = [];
        query[wp.name + ':' + p.name] = [];
      });
    });
    inst.god.trigger('queryArmies', query);

    return query;
  }

  function marchArmies(origin, dest) {
    //Type checking and conversion, assuming either string name or Waypoint
    if (typeof player === 'string') { player = inst.players  .find((p)  => p.name  === player); }
    if (typeof dest   === 'string') { dest   = inst.waypoints.find((wp) => wp.name === dest);   }

    //Movement logic
  }


  return inst;
}
