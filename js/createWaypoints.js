function createWaypoints(game) {

  const waypoints = [];

  function createWaypoint(xPercentage, yPercentage, name, type, neighbors) {
    waypoints.push(Waypoint(game, [xPercentage, yPercentage], name, type, neighbors));
  }

  //Waypoint connections
  const connections = {
    'Winterfell'     : ['Braavos', 'King\'s Landing', 'Lannisport'],
    'Lannisport'     : ['Sunspear', 'King\'s Landing'],
    'King\'s Landing': ['Braavos', 'Pentos', 'Tyrosh', 'Sunspear'],
    'Sunspear'       : ['Tyrosh', 'Lys'],
    'Lys'            : ['Valyria', 'Volantis', 'Myr', 'Tyrosh'],
    'Tyrosh'         : ['Pentos', 'Myr'],
    'Myr'            : ['Volantis', 'Qohor', 'Norvos', 'Pentos'],
    'Pentos'         : ['Braavos', 'Qohor', 'Norvos'],
    'Norvos'         : ['Braavos', 'Qohor'],
    'Qohor'          : ['Volantis', 'Mereen'],
    'Braavos'        : [],
    'Volantis'       : ['Valyria', 'Mereen'],
    'Mereen'         : ['Valyria', 'Qarth', 'Vaes Dothrak'],
    'Vaes Dothrak'   : [],
    'Qarth'          : ['Valyria'],
    'Valyria'        : []
  };

  //Hard-coded waypoints
  createWaypoint(12, 44, 'Lannisport', 'Fortification', connections.Lannisport);
  createWaypoint(19, 77, 'Winterfell', 'Fortification', connections.Winterfell);
  createWaypoint(25, 43, 'King\'s Landing', 'Fortification', connections['King\'s Landing']);
  createWaypoint(29, 19, 'Sunspear', 'Fortification', connections.Sunspear);
  createWaypoint(36, 28, 'Tyrosh', 'Fortification', connections.Tyrosh);
  createWaypoint(37, 15, 'Lys', 'Fortification', connections.Lys);
  createWaypoint(37, 58, 'Braavos', 'Fortification', connections.Braavos);
  createWaypoint(38, 41, 'Pentos', 'Fortification', connections.Pentos);
  createWaypoint(41, 29, 'Myr', 'Fortification', connections.Myr);
  createWaypoint(43, 46, 'Norvos', 'Fortification', connections.Norvos);
  createWaypoint(48, 40, 'Qohor', 'Fortification', connections.Qohor);
  createWaypoint(49, 18, 'Volantis', 'Fortification', connections.Volantis);
  createWaypoint(57,  4, 'Valyria', 'Fortification', connections.Valyria);
  createWaypoint(72, 27, 'Mereen', 'Fortification', connections.Mereen);
  createWaypoint(85, 45, 'Vaes Dothrak', 'Fortification', connections['Vaes Dothrak']);
  createWaypoint(88, 10, 'Qarth', 'Fortification', connections.Qarth);


  // Turn connections from strings into the appropriate Waypoint objects
  const toWaypoint = (stringName) => waypoints.find((wp) => stringName  === wp.name);
  function neighborStringsToWaypoints(waypoint) {
    waypoint.neighbors = waypoint.neighbors.map((wp) => toWaypoint(wp));
  }

  waypoints.forEach((wp) => neighborStringsToWaypoints(wp));

  // A knows about B, but we gotta let B know about A
  waypoints.forEach((A) => {
    A.neighbors.forEach((B) => {
      if (!B.neighbors.includes(A)){
        B.neighbors.push(A);
      }
    });
  });

  return waypoints;
}
