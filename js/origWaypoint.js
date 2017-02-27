function Waypoint(game, positionArr, waypointName = '...', waypointType = "landmark") {

  //Private stuff
  const position = positionArr; //positions are a whole number percentage, i.e. [50, 50] is the center
  const id = position.toString();
  const { god, mapEl, raven, players } = game;
  let name = waypointName;
  let type = waypointType;
  let residingPlayer = null;
  let armyCount = 0;

  function getBanner() {
    return residingPlayer ? residingPlayer.house : 'Neutral';
  }

  //Constructing for the instance
  //Create waypoint element, appending to map
  let waypointEl = $('<span/>')
  .addClass('waypoint')
  .addClass('neutral')
  .attr('id', name)
  .html(armyCount)
  .css('left',   position[0] + '%')
  .css('bottom', position[1] + '%');
  mapEl.append(waypointEl);

  //Create tooltip, appending to map
  let tooltip = $('<span/>')
  .addClass('myTooltip')
  .addClass('neutral')
  .attr('id', name + '-myTooltip')
  .html('<em>' + name + '</em><br>' + 'Neutral')
  .css('left',   position[0] - 5 + '%')
  .css('bottom', position[1] + 8 + '%');
  mapEl.append(tooltip);

  //Event stuff
  function onWorldUpdate(e) {
    let banner = getBanner();

    waypointEl
    .html(armyCount)
    .removeClass()
    .addClass('waypoint ' + banner.toLowerCase());

    tooltip
    .html('<em>' + name + '</em><br>' + 'Banner: ' + banner)
    .removeClass()
    .addClass('myTooltip ' + banner.toLowerCase());
  }

  god.on('worldUpdate', (e) => { onWorldUpdate(e); });

  //Public stuff
  let thisWaypoint =  {
    position : position,

    get armyCount()         { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; },

    get id() { return id; },

    get name()         { return name; },
    set name(newName)  { name = newName; },

    get residingPlayer()          { return residingPlayer; },
    set residingPlayer(newPlayer) { residingPlayer = newPlayer; },

    get type()         { return type; },
    set type(newType)  { type = newType; },

    get x()  { return waypointEl.css('left');   },
    get y()  { return waypointEl.css('bottom'); },

    get banner() { return getBanner(); }

  };

  return thisWaypoint;
}
