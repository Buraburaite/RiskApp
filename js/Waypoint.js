function Waypoint(emitter, mapElement, percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;
  let armyCount = 0;

  const _mapEl = mapElement;
  const _mapX  = () => _mapEl.width();
  const _mapY  = () => _mapEl.height();

  const x = () => percentPosition[0] / 100 * _mapX();
  const y = () => percentPosition[1] / 100 * _mapY();


  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass('targaeryn')
  .attr('id', name)
  .html(armyCount)
  .css('left',   x() + 'px')
  .css('bottom', y() + 'px');
  _mapEl.append(domEl);

  domEl.click(() => {
    console.log(mapY());
  });


  return {
    percentageArr : percentageArr,
    domEl : domEl,
    type : type,
    name :name,
    x : x,
    y : y
  };
}
