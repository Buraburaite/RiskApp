function Orders(game) {

  const { players, waypoints } = game;

  const theseOrders = {};
  players.forEach((player) => {
    orders[player.name] = {};

    waypoints.forEach((waypoint) => {
      orders[player.name][waypoint.name] = null;

    });
  });


  return theseOrders;
}
