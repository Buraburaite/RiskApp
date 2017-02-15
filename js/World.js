function World(emitter, mapElement, mapBackgroundPath) {

  const waypoints = [];
  
  const _god = emitter;
  const _map = mapElement;

  // waypoints.push(Waypoint([250,400], $('#Tengoku'), 'Landmark', 'Tengoku'));
  // waypoints.push(Waypoint([400,325], $('#Eudaimonia'), 'Landmark', 'Eudaimonia'));
  // waypoints.push(Waypoint([400,175], $('#Circumstancia'), 'Landmark', 'Circumstancia'));
  // waypoints.push(Waypoint([250,100], $('#Oblivion'), 'Landmark', 'Oblivion'));
  // waypoints.push(Waypoint([100,175], $('#Samsara'), 'Landmark', 'Samsara'));
  // waypoints.push(Waypoint([100,325], $('#Nirvana'), 'Landmark', 'Nirvana'));

  addWaypoint(50, 80, 'Landmark', 'Tengoku');
  addWaypoint(80, 65, 'Landmark', 'Eudaimonia');
  addWaypoint(80, 35, 'Landmark', 'Circumstancia');
  addWaypoint(50, 20, 'Landmark', 'Oblivion');
  addWaypoint(20, 35, 'Landmark', 'Samsara');
  addWaypoint(20, 65, 'Landmark', 'Nirvana');

  function addWaypoint(xPercentage, yPercentage, type, name) {
    waypoints.push(Waypoint(_god, _map, [xPercentage,yPercentage], type, name));
  }

  function updateWorld() {
    let query = {};
    _god.trigger('queryArmies', query);
    waypoints.forEach((wp) => { waypoint.armyCount = query[wp.name]; });
  }


  return {
    waypoints : waypoints
  };
}
