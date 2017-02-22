function Player(playerName, playerHouse) {

  const name   = playerName;
  const house  = playerHouse;
  const id = Player.newId();

  const thisPlayer = {
    id : id,
    name : name,
    house : house
  };

  return thisPlayer;
}

//Statics
Player.newId = (() => {
  let count = 0;

  return () => {
    count = count + 1;
    return count;
  };
})();
