function Army(emitter, mapElement, commandingPlayer, startWaypoint) {

  const player = commandingPlayer;
  let waypoint     = null;

  const _god       = emitter;
  const _mapEl     = mapElement;
  const _img       = new Image();
  let _actionsLeft = 2;

  let mons = [
    'Abomasnow',
    'Abra',
    'Absol',
    'Accelgor',
    'Aegislash- A',
    'Aegislash- D',
    'Aerodactyl',
    'AeroVeedramon',
    'Aggron',
    'Agnimon',
    'Agumon',
    'Aipom',
    'Airdramon',
    'Alakazam',
    'Aldamon',
    'Allomon',
    'Alomomola',
    'Alphamon',
    'Alraumon',
    'Altaria',
    'Amaura',
    'Ambipom',
    'Amoonguss',
    'Ampharos',
    'AncientBeetlemon',
    'AncientGarurumon',
    'AncientGreymon',
    'AncientKazemon',
    'AncientMegatheriumon',
    'AncientMermaimon',
    'AncientSphinxmon',
    'AncientTroiamon',
    'AncientVolcamon',
    'Andromon',
    'Angemon',
    'Angewomon',
    'Ankylomon',
    'Anorith',
    'Antiramon',
    'Anubimon',
    'Apemon',
    'Apocalymon',
    'Apollomon',
    'Aquilamon',
    'Arachnimon',
    'Arbok',
    'Arcanine',
    'Arceus',
    'Archelomon',
    'Archen',
    'Archeops',
    'Argomon'
  ];



  _img.src = '../IgnoreThis/Assets/Images/Mons/' + _.sample(mons) + '.png';
  _img.width = 100;
  _img.height = 60;
  _img.className = 'army';
  moveTo(startWaypoint);
  _mapEl.append(_img);


  function moveTo(newWaypoint) {
    if (waypoint) { waypoint.banner = 'neutral'; }
    newWaypoint.banner = player.house.toLowerCase();

    waypoint = newWaypoint;
    _img.style.left = waypoint.x;
    _img.style.bottom = waypoint.y;

  }

  function onMoveEvent(e, orders) {
    if (orders[player.name][waypoint] && _actionsLeft > 0) {
      _actionsLeft--;
    }
  }

  function onEndTurnEvent(e) { _actionsLeft = 2; }

  function onQueryArmies(e, query) {

    query[player.name].push(thisArmy);
    query[waypoint.name].push(thisArmy);
    query[player.name + ':' + waypoint.name].push(thisArmy);
    query[waypoint.name + ':' + player.name].push(thisArmy);
  }


  //Add events
  _god.on('moveEvent',    (e, orders) => { onMoveEvent   (orders); });
  _god.on('endTurnEvent', (e)         => { onEndTurnEvent();       });
  _god.on('queryArmies',  (e, query)  => { onQueryArmies (e, query);  });

  let thisArmy = {
    player : player,
    moveTo : moveTo,
    waypoint : waypoint
  };

  return thisArmy;
}
