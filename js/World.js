function World(mapImgPath) {

  let myRegion = '../IgnoreThis/Assets/Images/Regions/Arryn- Beyond_the_Wall.png';

  const map = $('.map');
  const waypoints = [];
  // map.css('background-image', 'url(' + mapImgPath + ')');

  waypoints.push(Waypoint([250,400], $('#Tengoku'), 'Landmark', 'Tengoku'));
  waypoints.push(Waypoint([400,325], $('#Eudaimonia'), 'Landmark', 'Eudaimonia'));
  waypoints.push(Waypoint([400,175], $('#Circumstancia'), 'Landmark', 'Circumstancia'));
  waypoints.push(Waypoint([250,100], $('#Oblivion'), 'Landmark', 'Oblivion'));
  waypoints.push(Waypoint([100,175], $('#Samsara'), 'Landmark', 'Samsara'));
  waypoints.push(Waypoint([100,325], $('#Nirvana'), 'Landmark', 'Nirvana'));



  return {
    map : map,
    waypoints : waypoints
  };
}
