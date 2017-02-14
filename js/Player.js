function Player(playerName, playerNum, playerHouse) {

  const name   = playerName;
  const number = playerNum;
  const house  = playerHouse;
  const armies = []; //Do I actually need this?

  return {
    name : name,
    number : number,
    house : house
  };
}
