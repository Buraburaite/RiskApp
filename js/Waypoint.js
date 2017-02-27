function Waypoint(game, positionArr, waypointName = '...', waypointType = "landmark") {

  //Public
  const inst =  {
    position       : positionArr, //positions are a whole number percentage, i.e. [50, 50] is the center

    get armyCount() { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; update(); },

    get banner() { return getBanner(); },

    get id() { return id; },

    get name()        { return name; },
    set name(newName) { name = newName;  update();},

    get residingPlayer() { return residingPlayer; },
    set residingPlayer(newPlayer) { residingPlayer = newPlayer; update(); },

    get type()        { return type; },
    set type(newType) { type = newType;  update();},

    get x()  { return waypointEl.css('left');   },
    get y()  { return waypointEl.css('bottom'); }

  };

  //Private
  const { god, mapEl, raven, players } = game;
  const id = inst.position.toString();
  const position = positionArr;

  let armyCount = 0;
  let name = waypointName;
  let residingPlayer = null;
  let type = waypointType;

  let getBanner = () => {
    return inst.residingPlayer ? inst.residingPlayer.house : 'Neutral';
  };

  //Constructing for the inst
  //Create waypoint element, appending to map
  let waypointEl = $('<span/>')
  .addClass('waypoint neutal')
  .attr('id', name)
  .html(0)
  .css('left',   inst.position[0] + '%')
  .css('bottom', inst.position[1] + '%');
  mapEl.append(waypointEl);

  //Create tooltip, appending to map
  let tooltip = $('<span/>')
  .addClass('myTooltip neutal')
  .attr('id', name + '-myTooltip')
  .html('<em>' + name + '</em><br>' + 'Neutral')
  .css('left',   position[0] - 5 + '%')
  .css('bottom', position[1] + 8 + '%');
  mapEl.append(tooltip);

  function update() {
    let banner = residingPlayer ? residingPlayer.house : "Neutral";

    waypointEl
    .html(armyCount)
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

    update();
  }

  god.on('worldUpdate', (e, round) => { onWorldUpdate(e, round); });




  return inst;
}
