function createWaypoints(game) {

  const waypoints = [];

  function addWaypoint(xPercentage, yPercentage, name, type) {
    waypoints.push(Waypoint(game, [xPercentage, yPercentage], name, type));
  }

  //Hard-coded waypoints
  addWaypoint(12, 44, 'Lannisport');
  addWaypoint(19, 77, 'Winterfell');
  addWaypoint(25, 43, 'King\'s Landing');
  addWaypoint(29, 19, 'Sunspear');
  addWaypoint(36, 28, 'Tyrosh');
  addWaypoint(37, 15, 'Lys');
  addWaypoint(37, 58, 'Braavos');
  addWaypoint(38, 41, 'Pentos');
  addWaypoint(41, 29, 'Myr');
  addWaypoint(43, 46, 'Norvos');
  addWaypoint(48, 40, 'Qohor');
  addWaypoint(49, 18, 'Volantis');
  addWaypoint(57,  4, 'Valyria');
  addWaypoint(72, 27, 'Mereen');
  addWaypoint(85, 45, 'Vaes Dothrak');
  addWaypoint(88, 10, 'Qarth');

  return waypoints;
}
