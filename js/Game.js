function Game(mapImgPath) {

  const player = [];
  const world = World(mapImgPath);
  const map = world.map;


  function addArmy(x, y) {
    let army = Army();
  }

  return {
    world: world,
    players: player,
    addArmy : addArmy
  };
}
