function Army(emitter, player, startWaypoint) {

  const god       = emitter;
  const commander = player;
  const img       = new Image();
  img.src = "../IgnoreThis/Assets/Images/Archen.png";
  img.width = 100;
  img.height = 60;
  img.className = 'army';
  img.style.left = startX + 'px';
  img.style.bottom = startY + 'px';

  let waypoint = startWaypoint;
  let actionsLeft = 2;

  function moveTo(waypoint) {
    this.waypoint = waypoint;
    img.style.left = x + 'px';
    img.style.bottom = y + 'px';

  }

  function onMoveEvent(orders) {
    if (orders[commander.name][waypoint] && actionsLeft > 0) {
      this.actionsLeft--;
      console.log('Found me! ' + this.commander.name + '\'s army at ' + this.waypoint.name);
    }
  }

  function onEndTurnEvent() { this.actionsLeft = 2; }

  //Add events
  emitter.on('moveEvent',    (orders) => { onMoveEvent   (orders); });
  emitter.on('endTurnEvent', ()       => { onEndTurnEvent();       });

  return {
    img : img,
    position : position,
    moveTo : moveTo,
    actionsLeft : actionsLeft
  };
}
