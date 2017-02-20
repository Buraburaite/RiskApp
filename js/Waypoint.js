function Waypoint(game, positionArr, waypointName = '...', waypointType = "landmark") {

  const position = positionArr; //positions are a whole number percentage, i.e. [50, 50] is the center
  const id = position.toString();
  const { god, mapEl, raven, players } = game;
  let name = waypointName;
  let type = waypointType;
  let residingPlayer = null;
  let armyCount = 0;
  let getBanner = () => residingPlayer.house.toLowerCase() || 'neutral';
  // let armies; eventually, we want a variable like to auto-refresh


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

  function onWorldUpdate(e) {
    let banner = getBanner();

    waypointEl
    .html(armyCount)
    .removeClass()
    .addClass('waypoint ' + banner);

    tooltip
    .html('<em>' + name + '</em><br>' + 'Banner: ' + banner)
    .removeClass()
    .addClass('myTooltip ' + banner);
  }

  god.on('worldUpdate', (e) => { onWorldUpdate(e); });

  let thisWaypoint =  {
    name :name,
    position : position,
    residingPlayer : residingPlayer,
    type : type,

    get armyCount() { return armyCount; },

    get id() { return id; },

    get x()  { return waypointEl.css('left');   },
    get y()  { return waypointEl.css('bottom'); },

    get banner() { return getBanner(); }

  };

  return thisWaypoint;
}
