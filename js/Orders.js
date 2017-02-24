function Orders(game) {

  //Public
  const inst = {};

  //Private
  const { players, waypoints } = game;

  players.forEach((player) => {
    orders[player.name] = {};

    waypoints.forEach((waypoint) => {
      orders[player.name][waypoint.name] = null;

    });
  });

  return inst;
}
