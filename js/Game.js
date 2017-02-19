function Game() {

  const god = $({});
  const players = [];
  const mapEl = $('.map-container');
  const raven = Raven();
  const world = World();
  const waypoints = [];

  let turn = 0;
  let orders;

  function startGame() {

    turn++;
    orders = Orders();

    players.push(Player('Javi', 1, 'Targaryen'));
    players.push(Player('Durkee', 2, 'Baratheon'));

  }

  function placeArmies(player, dest, num = 1) {
    //Type checking and conversion
    if (typeof player === 'string') { player = players  .find((p)  => p.name  === player); }
    if (typeof dest   === 'string') { dest   = waypoints.find((wp) => wp.name === dest);   }

    //Place armies
    _.times(num, Army(player, destination));
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
    map : map,
    raven : raven,
    waypoints : waypoints
  };

  return thisGame;
}
