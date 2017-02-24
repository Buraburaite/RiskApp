function Player(playerName, playerHouse) {

  //Public
  const inst = {
    id : null,
    name : null,
    house : null
  };

  inst.name  = playerName;
  inst.house = playerHouse;
  inst.id    = Player.newId();


  return inst;
}

//Statics
Player.newId = (() => {
  let count = 0;

  return () => {
    count = count + 1;
    return count;
  };
})();
