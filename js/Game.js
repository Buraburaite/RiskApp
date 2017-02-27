function Game() {

  //Private
  let round = 0; //Increment with newRound(), never change directly.

  //Public
  const inst = {
    god : $({}),
    mapEl : $('.map-container'),
    newRound : newRound,
    players : [],
    placeArmies : placeArmies,
    raven : null,
    startGame : startGame,
    waypoints : null,

    get round() { return round; },
    set round(newRound) { round = newRound; this.god.trigger('worldUpdate', round); } //for testing purposes only
  };


  function startGame() {

    //Set up the raven (our model)
    inst.raven = Raven(inst);

    //Create our waypoints
    inst.waypoints = createWaypoints(inst);

    //Start Turn 1
    newRound();

    inst.players.push(Player('Javi', 'Targaryen'));
    inst.players.push(Player('Durkee', 'Baratheon'));

  }

  function newRound() {
    round++;
    inst.raven.newRound(round);
    inst.god.trigger('worldUpdate', round);
  }

  function placeArmies(player, dest, num = 1) {
    //Type checking and conversion
    if (typeof player === 'string') { player = inst.players  .find((p)  => p.name  === player); }
    if (typeof dest   === 'string') { dest   = inst.waypoints.find((wp) => wp.name === dest);   }

    //Place armies
    dest.residingPlayer = player;
    dest.armyCount += num;

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
