function Game() {

  const god = $({});
  const mapEl = $('.map-container');
  const raven = Raven();
  const players = [];
  const waypoints = [];

  let turn = 0;
  let orders;

  function startGame() {

    turn++;
    this.world = World(thisGame);
    orders = Orders(thisGame);

    players.push(Player('Javi', 'Targaryen'));
    players.push(Player('Durkee', 'Baratheon'));

  }

  function placeArmies(player, dest, num = 1) {
    //Type checking and conversion
    if (typeof player === 'string') { player = players  .find((p)  => p.name  === player); }
    if (typeof dest   === 'string') { dest   = waypoints.find((wp) => wp.name === dest);   }

    //Place armies
    dest.residingPlayer = player;
    dest.armyCount += num;

    god.trigger('worldUpdate');
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

    return query;
  }

  function marchArmies(origin, dest) {
    //Type checking and conversion, assuming either string name or Waypoint
    if (typeof player === 'string') { player = players  .find((p)  => p.name  === player); }
    if (typeof dest   === 'string') { dest   = waypoints.find((wp) => wp.name === dest);   }

    //Movement logic
  }


  const thisGame = {
    god : god,
    mapEl : mapEl,
    players : players,
    placeArmies : placeArmies,
    raven : raven,
    startGame : startGame,
    waypoints : waypoints
  };

  return thisGame;
}
