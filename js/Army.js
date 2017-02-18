function Army(commandingPlayer, startWaypoint) {

  const player = commandingPlayer;
  let waypoint = null;

  const god       = GAME.god;
  const mapEl     = GAME.map;
  const img       = new Image();
  let actionsLeft = 2;

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



  img.src = '../IgnoreThis/Assets/Images/Mons/' + _.sample(mons) + '.png';
  img.width = 100;
  img.height = 60;
  img.className = 'army';
  moveTo(startWaypoint);
  mapEl.append(img);


  function moveTo(newWaypoint) {
    //If you were already stationed somewhere, clean up before leaving
    if (waypoint) {
      waypoint.banner = 'neutral';
    }

    waypoint = newWaypoint;
    waypoint.banner = player.house.toLowerCase();
    // img.style.left = waypoint.x;
    img.style.left = +waypoint.x.replace('px','') + 50 + 'px';
    img.style.bottom = waypoint.y;

    waypoint.residingPlayer = player; //temp solution

  }

  function onMovePhase(e) {
  }

  function onEndTurn(e) { actionsLeft = 2; }

  function onQueryArmies(e, query) {

    query[player.name].push(thisArmy);
    query[waypoint.name].push(thisArmy);
    query[player.name + ':' + waypoint.name].push(thisArmy);
    query[waypoint.name + ':' + player.name].push(thisArmy);
  }


  //Add events
  god.on('movePhase',   (e)         => { onMovePhase(e); });
  god.on('endTurn',     (e)         => { onEndTurn  (e); });
  god.on('queryArmies', (e, query)  => { onQueryArmies (e, query);  });

  let thisArmy = {
    player : player,
    moveTo : moveTo,
    waypoint : waypoint
  };

  return thisArmy;
}
