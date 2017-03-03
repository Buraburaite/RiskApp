/*====
Raven is a temporary stand-in for a database. It saves the state of the game
at the start of every round in its rounds array. It also exposes all the valid
functions for interacting with its records.
====*/
function Raven(game) {
  // Public variables
  const inst = {
    findRound : findRound,
    newRound : newRound,
    rounds : [null], // starts with a null, for Round 0
  };

  // Create new rounds with this, so that it can be added in order
  function newRound(round) {
    if (!inst.rounds[round] && round > 0) {
      inst.rounds.splice(round, 0, RoundRecord(game, round));
    }
    else {
      console.log("Error: Raven.js:newState error");
    }
  }

  // Returns the RoundRecord for round round
  function findRound(round) {
    return inst.rounds[round];
  }

  return inst;
}

/*====
RoundRecords simulate documents in a database. They contain the round it refers
to, connections to the next and previous records (called states). RoundRecord's
state is startState, that is, all the mutable information about the game at the
start of that round. Currently, that includes includes only four variables, all
of which are in Waypoint. These are the Waypoint's name, the number of armies
stationed there, what player owns that Waypoint (null if neutral), and what
kind of waypoint is it. Changing name and type are not currently implemented,
but are part of the core game this app is going to reproduce.
====*/
function RoundRecord(game, round) {

  const inst = {
    round : round,
    // roundOrders : null, // unimplemented
    prevState : null,
    startState : null,
    nextState : null
  };

  const { players, raven, waypoints } = game;

  // Record Waypoint data
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
