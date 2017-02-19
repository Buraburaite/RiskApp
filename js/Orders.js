function Orders(game) {

  const player = game.players;
  const waypoints = game.waypoints;

  const theseOrders = {};
  players.forEach((player) => {
    orders[player.name] = {};

    waypoints.forEach((waypoint) => {
      orders[player.name][waypoint.name] = null;

    });
  });


  return theseOrders;
}
