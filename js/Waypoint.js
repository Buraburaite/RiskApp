function Waypoint(game, percentageArr, waypointName = '...', waypointType = "landmark") {

  const percentPosition = percentageArr;
  const id = parseString(positionArr);
  const god = game.god;
  const mapEl = game.mapEl;
  const players = game.players;
  let type = waypointType;
  let name = waypointName;
  let residingPlayer = null;
  let armyCount = 0;
  // let armies; eventually, we want a variable like to auto-refresh


  //Create waypoint element, appending to map
  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass('neutral')
  .attr('id', name)
  .html(armyCount)
  .css('left',   percentPosition[0] + '%')
  .css('bottom', percentPosition[1] + '%');
  mapEl.append(domEl);

  //Create tooltip, appending to map
  let tooltip = $('<span/>')
  .addClass('myTooltip')
  .addClass('neutral')
  .attr('id', name + '-myTooltip')
  .html('<em>' + name + '</em><br>' + 'Banner: ' + banner)
  .css('left',   percentPosition[0] - 5 + '%')
  .css('bottom', percentPosition[1] + 8 + '%');
  mapEl.append(tooltip);

  function onWorldUpdate(e, query) {
    armyCount = query[name].length;
    domEl.html(armyCount);
  }

  god.on('worldUpdate', (e, query) => { onWorldUpdate(e, query); });

  let thisWaypoint =  {
    name :name,
    percentageArr : percentageArr,
    residingPlayer : residingPlayer,
    type : type,

    get armyCount() { return armyCount; },

    get id() { return id; },

    get x()  { return domEl.css('left');   },
    get y()  { return domEl.css('bottom'); },

    get banner() { return residingPlayer.house.toLowerCase() || 'neutral';  },
    set banner(newBanner) { //this code should be moved to world update, once Raven up and running
      domEl.removeClass(banner.toLowerCase());
      domEl.addClass(newBanner.toLowerCase());
      tooltip.removeClass(banner.toLowerCase());
      tooltip.addClass(newBanner.toLowerCase());
      tooltip.html('<em>' + name + '</em><br>' + 'Banner: ' + newBanner);
      banner = newBanner;
    },
  };

  return thisWaypoint;
}
