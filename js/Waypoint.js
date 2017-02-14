function Waypoint(pos, waypointType, pointName = parseString(position)) {

  const position = pos;
  let type       = waypointType;
  let name       = pointName;

  return {
    position : position,
    type : type,
    name :name
  };
}
