function Army(emitter, player, startWaypoint) {

  const commander = player;

  const _god       = emitter;
  const _img       = new Image();
  let _waypoint    = null;
  let _actionsLeft = 2;


  _img.src = "../IgnoreThis/Assets/Images/Archen.png";
  _img.width = 100;
  _img.height = 60;
  _img.className = 'army';
  _moveTo(startWaypoint);


  function _moveTo(newWaypoint) {
    _waypoint = newWaypoint;
    _img.style.left = _waypoint.x() + 'px';
    _img.style.bottom = _waypoint.y() + 'px';

  }

  function onMoveEvent(orders) {
    if (orders[commander.name][_waypoint] && _actionsLeft > 0) {
      _actionsLeft--;
      console.log('Found me! ' + commander.name + '\'s army at ' + _waypoint.name);
    }
  }

  function onEndTurnEvent() { _actionsLeft = 2; }

  //Add events
  _god.on('moveEvent',    (orders) => { onMoveEvent   (orders); });
  _god.on('endTurnEvent', ()       => { onEndTurnEvent();       });

  return {
    commander : commander
  };
}
