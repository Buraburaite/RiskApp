function Waypoint(percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;
  let residingPlayer = null;
  let banner = 'neutral';
  // let armies; eventually, we want a variable like to auto-refresh

  let nextPlayer = null;
  let donePlayers = 0;

  let armyCount = 0;
  const god = GAME.god;
  const mapEl = GAME.map;
  const players = GAME.players;
  const mapX  = () => mapEl.width();
  const mapY  = () => mapEl.height();

  const calcX = () => percentPosition[0] / 100 * mapX();
  const calcY = () => percentPosition[1] / 100 * mapY();

  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass(banner)
  .attr('id', name)
  .html(armyCount)
  .css('left',   calcX() + 'px')
  .css('bottom', calcY() + 'px');
  mapEl.append(domEl);

  function getArmies() { //not really good enough, could get out of sync
    return GAME.latestArmyQuery[name];
  }

  function onStartGame() {

    GAME.startTurn();
  }

  function onStartTurn() {

    GAME.movePhase();
  }

  function onMovePhase() {

    if (GAME.prevClick && GAME.prevClick !== thisWaypoint) {
      let query = GAME.queryArmies();
      let arrivingArmies = query[GAME.prevClick.name];

      console.log('Hello World!');
      arrivingArmies.forEach((army) => {
        army.moveTo(thisWaypoint);
      });

      nextPlayer = players[players.indexOf(GAME.currentPlayer) + 1];
      console.log("Your turn: " + nextPlayer.name);
      GAME.currentPlayer = nextPlayer;
      GAME.prevClick = null;
      donePlayers++;

      if (donePlayers === players.length) {
        // GAME.combatPhase(); //ready need to wire up that continue button (Friday I guess?)
        console.log("done!");
      }

    }
    else if (GAME.currentPlayer === residingPlayer || GAME.prevClick === thisWaypoint) {
      // logs if currentPlayer's location or reclick
      // if (GAME.prevClick === thisWaypoint) {
      //   console.log('reclick');
      // }
      // else {
      //   console.log('selected current player\'s waypoint');
      // }
      GAME.prevClick = thisWaypoint;
    }
  }

  function onCombatPhase() {

    GAME.endTurn();
  }

  function onEndTurn() {

    //check win condition
    GAME.endGame();

    //Otherwise
    GAME.startTurn();
  }

  function onEndGame() {
  }

  function onWorldUpdate(e, query) {
    armyCount = query[name].length;
    domEl.html(armyCount);
  }


  god.on('startGame',   (e) => { domEl.off('click'); domEl.click(onStartGame);   });
  god.on('startTurn',   (e) => { domEl.off('click'); domEl.click(onStartTurn);   });
  god.on('movePhase',   (e) => { domEl.off('click'); domEl.click(onMovePhase);   });
  god.on('combatPhase', (e) => { domEl.off('click'); domEl.click(onCombatPhase); });
  god.on('endTurn',     (e) => { domEl.off('click'); domEl.click(onEndTurn);     });
  god.on('endGame',     (e) => { domEl.off('click'); domEl.click(onEndGame);     });
  god.on('worldUpdate', (e, query) => { onWorldUpdate(e, query); });

  let thisWaypoint =  {
    percentageArr : percentageArr,
    domEl : domEl,
    getArmies : getArmies,
    type : type,
    name :name,

    get x() { return domEl.css('left');   },
    get y() { return domEl.css('bottom'); },

    get armyCount()         { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; domEl.html(armyCount); },

    get residingPlayer()          { return residingPlayer; },
    set residingPlayer(newPlayer) { residingPlayer = newPlayer; },

    get banner() { return banner;   },
    set banner(newBanner) {
      domEl.removeClass(banner);
      domEl.addClass(newBanner);
      banner = newBanner;
    },
  };

  return thisWaypoint;
}
