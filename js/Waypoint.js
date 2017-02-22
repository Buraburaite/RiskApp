function Waypoint(game, positionArr, waypointName = '...', waypointType = "landmark") {

  //Public stuff
  let inst =  {
    armyCount      : 0,
    position       : positionArr, //positions are a whole number percentage, i.e. [50, 50] is the center
    residingPlayer : null,
    name           : waypointName,
    type           : waypointType,

    get banner() { return getBanner(); },

    get id() { return id; },

    get x()  { return waypointEl.css('left');   },
    get y()  { return waypointEl.css('bottom'); }

  };

  //Private stuff
  const { god, mapEl, raven, players } = game;
  const id = inst.position.toString();

  let getBanner = () => {
    return inst.residingPlayer ? inst.residingPlayer.house : 'Neutral';
  };
  // function getBanner() {
  //   return inst.residingPlayer ? inst.residingPlayer.house : 'Neutral';
  // }

  //Constructing for the inst
  //Create waypoint element, appending to map
  let waypointEl = $('<span/>')
  .addClass('waypoint')
  .addClass('neutral')
  .attr('id', inst.name)
  .html(inst.armyCount)
  .css('left',   inst.position[0] + '%')
  .css('bottom', inst.position[1] + '%');
  mapEl.append(waypointEl);

  //Create tooltip, appending to map
  let tooltip = $('<span/>')
  .addClass('myTooltip')
  .addClass('neutral')
  .attr('id', inst.name + '-myTooltip')
  .html('<em>' + inst.name + '</em><br>' + 'Neutral')
  .css('left',   inst.position[0] - 5 + '%')
  .css('bottom', inst.position[1] + 8 + '%');
  mapEl.append(tooltip);

  //Event stuff
  function onWorldUpdate(e) {
    let banner = getBanner();

    waypointEl
    .html(inst.armyCount)
    .removeClass()
    .addClass('waypoint ' + banner.toLowerCase());

    tooltip
    .html('<em>' + inst.name + '</em><br>' + 'Banner: ' + banner)
    .removeClass()
    .addClass('myTooltip ' + banner.toLowerCase());
  }

  god.on('worldUpdate', (e) => { onWorldUpdate(e); });

  return inst;
}
