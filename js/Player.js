function Player(playerName, playerHouse) {

  const name   = playerName;
  const house  = playerHouse;
  // const number = Player.newId();

  const thisPlayer = {
    name : name,
    // number : number,
    house : house
  };

  return thisPlayer;
}

//Statics
Player.newId = () => { newId.count = newId.count + 1 || 1; return newId.count; };
