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

  function moveTo(newWaypoint) {
    waypoint = newWaypoint;
    img.style.left = waypoint.x() + 'px';
    img.style.bottom = waypoint.y() + 'px';

  }

  function onMoveEvent(orders) {
    if (orders[commander.name][waypoint] && actionsLeft > 0) {
      actionsLeft--;
      console.log('Found me! ' + commander.name + '\'s army at ' + waypoint.name);
    }
  }

  function onEndTurnEvent() { actionsLeft = 2; }

  //Add events
  god.on('moveEvent',    (orders) => { onMoveEvent   (orders); });
  god.on('endTurnEvent', ()       => { onEndTurnEvent();       });

  return {
    img : img,
    position : position,
    moveTo : moveTo,
    actionsLeft : actionsLeft
  };
}
