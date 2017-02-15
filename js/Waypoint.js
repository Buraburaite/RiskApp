function Waypoint(emitter, mapElement, percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;

  let _armyCount = 0;
  const _god = emitter;
  const _mapEl = mapElement;
  const _mapX  = () => _mapEl.width();
  const _mapY  = () => _mapEl.height();

  const _calcX = () => percentPosition[0] / 100 * _mapX();
  const _calcY = () => percentPosition[1] / 100 * _mapY();

  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass('targaeryn')
  .attr('id', name)
  .html(_armyCount)
  .css('left',   _calcX() + 'px')
  .css('bottom', _calcY() + 'px');
  _mapEl.append(domEl);

  domEl.click(() => {
    console.log(mapY());
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
    set armyCount(newCount) { _armyCount = newCount; domEl.html(_armyCount); }
  };
}
