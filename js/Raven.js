function Raven(game) {
  const inst = {
    states : [State(game, 0)]
  };

  function newState() {

  }

  function findState(round) {

  }

  function updateState(round) {

  }

  return inst;
}

function State(game, round) { //Round object

  const inst = {
    round : round,
    roundOrders : null,
    prevState : null,
    startState : null,
    nextState : null
  };

  const { players, waypoints } = game;
  const emptyState = {};
  waypoints.forEach((waypoint) => {
    emptyState[waypoint.id] = {
      armyCount : waypoint.armyCount,
      name : waypoint.name,
      residingPlayer : waypoint.residingPlayer,
      type : waypoint.type
    };
  });




  return inst;
}
