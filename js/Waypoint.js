function Waypoint(game, positionArr, waypointName = '...', waypointType = "landmark", neighborArr = []) {

  //Public
  const inst =  {
    get position() { return positionArr; }, // positions are a whole number percentage, i.e. [50, 50] is the center

    get neighbors() { return neighbors; },
    set neighbors(newNeighbors) { neighbors = newNeighbors; },

    get armyCount() { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; updateSyling(); },

    get banner() { return getBanner(); },

    get id() { return id; },

    get name()        { return name; },
    set name(newName) { name = newName;  updateSyling();},

    get residingPlayer() { return residingPlayer; },
    set residingPlayer(newPlayer) { residingPlayer = newPlayer; updateSyling(); },

    get type()        { return type; },
    set type(newType) { type = newType;  updateSyling();},

    get x()  { return waypointEl.css('left');   },
    get y()  { return waypointEl.css('bottom'); }

  };

  //Private
  const { god, mapEl, raven, players } = game;
  const id = inst.position.toString();
  const position = positionArr;
  let neighbors = neighborArr;

  let armyCount = 1;
  let name = waypointName;
  let residingPlayer = null;
  let type = waypointType;

  let getBanner = () => {
    return inst.residingPlayer ? inst.residingPlayer.house : 'Neutral';
  };

  //Constructing for the inst
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

  //Event stuff
  function onWorldUpdate(e, round) {
    let state = raven.rounds[round].startState[inst.id];

    name           = state.name;
    armyCount      = state.armyCount;
    residingPlayer = state.residingPlayer;
    type           = state.type;

    updateSyling();
  }

  god.on('worldUpdate', (e, round) => { onWorldUpdate(e, round); });




  return inst;
}
