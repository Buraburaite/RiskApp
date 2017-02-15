function Waypoint(emitter, currentPlayer, mapElement, percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;
  let residingPlayer = null;
  let _banner = 'neutral';

  let _armyCount = 0;
  const _god = emitter;
  const _mapEl = mapElement;
  const _mapX  = () => _mapEl.width();
  const _mapY  = () => _mapEl.height();

  const _calcX = () => percentPosition[0] / 100 * _mapX();
  const _calcY = () => percentPosition[1] / 100 * _mapY();

  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass(_banner)
  .attr('id', name)
  .html(_armyCount)
  .css('left',   _calcX() + 'px')
  .css('bottom', _calcY() + 'px');
  _mapEl.append(domEl);

  domEl.click(() => {
    if (currentPlayer.name === 'residingPlayer') {
      console.log('yes, it\'s your turn');
    }
  });

  function onWorldUpdate(e, query) {
    _armyCount = query[name].length;
    domEl.html(_armyCount);
  }

  _god.on('worldUpdate', (e, query) => { onWorldUpdate(e, query); });

  return {
    percentageArr : percentageArr,
    domEl : domEl,
    type : type,
    name :name,

    get x() { return domEl.css('left');   },
    get y() { return domEl.css('bottom'); },

    get armyCount()         { return _armyCount; },
    set armyCount(newCount) { _armyCount = newCount; domEl.html(_armyCount); },

    get banner() { return _banner;   },
    set banner(newBanner) {
      domEl.removeClass(_banner);
      domEl.addClass(newBanner);
      _banner = newBanner;
    },
  };
}
