function World(mapImgPath) {

  let myRegion = '../IgnoreThis/Assets/Images/Regions/Arryn- Beyond_the_Wall.png';

  const map = $('.map');
  const waypoints = [];
  // map.css('background-image', 'url(' + mapImgPath + ')');

  waypoints.push(Waypoint([0,0],   $('#Tengoku'), 'Landmark', 'Tengoku'));
  waypoints.push(Waypoint([10,10], $('#Eudaimonia'), 'Landmark', 'Eudaimonia'));
  waypoints.push(Waypoint([20,20], $('#Circumstancia'), 'Landmark', 'Circumstancia'));
  waypoints.push(Waypoint([30,30], $('#Oblivion'), 'Landmark', 'Oblivion'));
  waypoints.push(Waypoint([40,40], $('#Samsara'), 'Landmark', 'Samsara'));
  waypoints.push(Waypoint([50,50], $('#Nirvana'), 'Landmark', 'Nirvana'));



  return {
    map : map,
    waypoints : waypoints
  };
}
