function Waypoint(pos, imgEl, waypointType, pointName = parseString(position)) {

  const position = pos;
  let imageEl    = imgEl;
  let type       = waypointType;
  let name       = pointName;

  imageEl.css('left',   x() + 'px');
  imageEl.css('bottom', y() + 'px');

  function x() { return position[0]; }
  function y() { return position[1]; }

  return {
    position : position,
    imageEl : imageEl,
    type : type,
    name :name,
    x : x,
    y : y
  };
}
