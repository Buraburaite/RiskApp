function Waypoint(game, positionArr, waypointName = '...', waypointType = "landmark", neighborArr = []) {

  //Public variables
  const inst =  {
    /*====
    positions are a whole number percentage, i.e. [50, 50] is the center of the map
    ====*/
    get position() { return positionArr; },

    //Adjacent waypoints (i.e. where you can go to from this waypoint?)
    //Setting neighbors is a consequence of how createWaypoints.js works. It
    //will be removed eventually, as it is not meant to be mutable.
    get neighbors() { return neighbors; },
    set neighbors(newNeighbors) { neighbors = newNeighbors; },

    /*====
    Banner is not a variable so much as the result of a function that returns
    the house of the residingPlayer, and if there is none, then it will return
    'Neutral' instead.
    ====*/
    get banner() { return getBanner(); },

    // id of the waypoint
    get id() { return id; },

    // the x and y position of the waypoint's mapEl (not any of the tooltips)
    // It's a percentage, i.e. 'left: 60%' in the css returns 60% here.
    get x()  { return waypointEl.css('left');   },
    get y()  { return waypointEl.css('bottom'); },

    //==Mutables (i.e. part of the state that the Raven object records)========/

    //The number of armies stationed at the waypoint
    get armyCount() { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; updateSyling(); },

    // the name of the waypoint (this is considered mutable)
    get name()        { return name; },
    set name(newName) { name = newName;  updateSyling();},

    // the player who controls the waypoint (null if none)
    get residingPlayer() { return residingPlayer; },
    set residingPlayer(newPlayer) { residingPlayer = newPlayer; updateSyling(); },

    get type()        { return type; },
    set type(newType) { type = newType;  updateSyling();},

    //==Mutables=======================================================MUTABLES/
  };

  //Private variables
  const { god, mapEl, raven, players } = game;
  const id = inst.position.toString();
  const position = positionArr;
  let neighbors = neighborArr;

  let armyCount = 1;
  let name = waypointName;
  let residingPlayer = null;
  let type = waypointType;

  //Create waypoint element, appending to map
  let waypointEl = $('<span/>')
  .attr('id', name)
  .css('left',   inst.position[0] + '%')
  .css('bottom', inst.position[1] + '%');
  mapEl.append(waypointEl);

  //Create tooltip, appending to map
  let tooltip = $('<span/>')
  .attr('id', name + '-myTooltip')
  .css('left',   position[0] - 5 + '%')
  .css('bottom', position[1] + 8 + '%');
  mapEl.append(tooltip);

  // update the styles to match the instance's variables
  updateSyling();

  // Returns the house of the residingPlayer, unless null, then returns 'Neutral'
  function getBanner() {
    return inst.residingPlayer ? inst.residingPlayer.house : 'Neutral';
  }

  // Updates the styles of the waypoint and tooltip elements to match inst's variables
  function updateSyling() {
    let banner = residingPlayer ? residingPlayer.house : "Neutral";

    waypointEl
    .html(residingPlayer ? armyCount.toString() : '')
    .removeClass()
    .addClass('waypoint ' + banner.toLowerCase());

    tooltip
    .html('<em>' + name + '</em><br>' + 'Banner: ' + banner)
    .removeClass()
    .addClass('myTooltip ' + banner.toLowerCase());
  }

  //Event handling
  function onWorldUpdate(e, round) {
    let state = raven.rounds[round].startState[inst.id];

    name           = state.name;
    armyCount      = state.armyCount;
    residingPlayer = state.residingPlayer;
    type           = state.type;

    updateSyling();
  }

  //Event wiring
  god.on('worldUpdate', (e, round) => { onWorldUpdate(e, round); });

  return inst;
}
