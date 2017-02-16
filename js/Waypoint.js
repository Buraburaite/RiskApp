function Waypoint(percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;
  let residingPlayer = null;
  let banner = 'neutral';

  let armyCount = 0;
  const god = GAME.god;
  const mapEl = GAME.map;
  const mapX  = () => mapEl.width();
  const mapY  = () => mapEl.height();

  const calcX = () => percentPosition[0] / 100 * mapX();
  const calcY = () => percentPosition[1] / 100 * mapY();

  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass(banner)
  .attr('id', name)
  .html(armyCount)
  .css('left',   calcX() + 'px')
  .css('bottom', calcY() + 'px');
  mapEl.append(domEl);

  domEl.click(() => {
    if (currentPlayer.name === residingPlayer.name) {
      console.log('yes, it\'s your turn');
    }
  });

  function onWorldUpdate(e, query) {
    armyCount = query[name].length;
    domEl.html(armyCount);
  }

  god.on('worldUpdate', (e, query) => { onWorldUpdate(e, query); });

  return {
    percentageArr : percentageArr,
    domEl : domEl,
    type : type,
    name :name,

    get x() { return domEl.css('left');   },
    get y() { return domEl.css('bottom'); },

    get armyCount()         { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; domEl.html(armyCount); },

    get banner() { return banner;   },
    set banner(newBanner) {
      domEl.removeClass(banner);
      domEl.addClass(newBanner);
      banner = newBanner;
    },
  };
}
