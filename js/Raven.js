function Raven(game) {
  const inst = {
    states : []
  };

  function newState(round) {
    if (!states[round] && round > 0) {
      states.splice(round, 0, State(game, round));
    }
    else {
      console.log("Error: Raven.js:newState error");
    }
  }

  function findState(round) {
    return states[round];
  }

  function updateState(round) {

  }

  return inst;
}

function State(game, round) { //State object

  const inst = {
    round : round,
    roundOrders : null,
    prevState : null,
    startState : null,
    nextState : null
  };

  const { players, raven, waypoints } = game;

  let emptyState = {};
  waypoints.forEach((waypoint) => {
    emptyState[waypoint.id] = {
      armyCount : waypoint.armyCount,
      name : waypoint.name,
      residingPlayer : waypoint.residingPlayer,
      type : waypoint.type
    };
  });
  inst.startState = emptyState;

  if (round > 1) { //States are a doubly-linked list
    inst.prevState = raven.states[round - 1];
    inst.prevState.nextState = inst;
  }


  return inst;
}
