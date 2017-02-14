function Army(emitter, player, startX, startY) {

  const img = new Image();
  img.src = "../IgnoreThis/Assets/Images/Archen.png";
  img.width = 100;
  img.height = 60;
  img.className = 'army';
  img.style.left = startX + 'px';
  img.style.bottom = startY + 'px';

  let position = [startX, startY];
  let actionsLeft = 2;

  function moveTo(x, y) {
    position = [x,y];
    img.style.left = x + 'px';
    img.style.bottom = y + 'px';

  }

  function onNewTurnEvent() {
    actionsLeft = 2;
  }

  function onMoveEvent(orders) {
    if (orders[player.name][waypoint] && actionsLeft > 0) {
      console.log('Found me! ' + player.name + '\'s army at ' + waypoint.name);
      actionsLeft--;
    }
  }

  //Add events
  emitter.on('newTurnEvent', ()       => { onNewTurnEvent(); });
  emitter.on('moveEvent',    (orders) => { onMoveEvent   (orders); });

  return {
    img : img,
    position : position,
    moveTo : moveTo,
    actionsLeft : actionsLeft
  };
}
