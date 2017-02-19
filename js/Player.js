function Player(playerName, playerHouse) {

  const name   = playerName;
  const number = newId();
  const house  = playerHouse;

  const thisPlayer = {
    name : name,
    number : number,
    house : house
  };

  return thisPlayer;
}

//Statics
Player.newId = () => { newId.count = newId.count + 1 || 1; return newId.count; };
