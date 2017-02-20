function Player(playerName, playerHouse) {

  const name   = playerName;
  const number = Player.newId();
  const house  = playerHouse;

  const thisPlayer = {
    name : name,
    number : number,
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
