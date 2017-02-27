function Raven(game) {
  const inst = {
    findRound : findRound,
    newRound : newRound,
    rounds : [null],
    updateRound : updateRound
  };

  function newRound(round) {
    if (!inst.rounds[round] && round > 0) {
      inst.rounds.splice(round, 0, Round(game, round));
    }
    else {
      console.log("Error: Raven.js:newState error");
    }
  }

  function findRound(round) {
    return inst.rounds[round];
  }

  function updateRound(round) {

  }

  return inst;
}

function Round(game, round) { //Round object

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
    inst.prevState = raven.rounds[round - 1];
    inst.prevState.nextState = inst;
  }


  return inst;
}
