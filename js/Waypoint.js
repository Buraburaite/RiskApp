function Waypoint(pos, imgEl, waypointType, pointName = parseString(position)) {

  const position = pos;
  let imageEl    = imgEl;
  let type       = waypointType;
  let name       = pointName;

  const x = () => position[0];
  const y = () => position[1];

  imageEl.css('left',   x() + 'px');
  imageEl.css('bottom', y() + 'px');


  return {
    position : position,
    imageEl : imageEl,
    type : type,
    name :name,
    x : x,
    y : y
  };
}
