function Game(name) {

  let player = [];
  let world = World();

  return {
    world: world,
    players: player
  };
}
