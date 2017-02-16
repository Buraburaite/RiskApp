function Waypoint(percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;
  let residingPlayer = null;
  let banner = 'neutral';

  let armyCount = 0;
  const god = GAME.god;
  const mapEl = GAME.map;
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

  function getArmies() {
    return GAME.latestArmyQuery[name];
  }

  function onStartGame() {

    GAME.startTurn();
  }

  function onStartTurn() {

    GAME.movePhase();
  }

  function onMovePhase() {
    if (GAME.currentPlayer.name === residingPlayer.name) {
      console.log('yes, it\'s your turn');
    }

    GAME.combatPhase();
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

  return {
    percentageArr : percentageArr,
    domEl : domEl,
    getArmies : getArmies,
    type : type,
    name :name,

    get x() { return domEl.css('left');   },
    get y() { return domEl.css('bottom'); },

    get armyCount()         { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; domEl.html(armyCount); },

    get banner() { return banner;   },
    set banner(newBanner) {
      domEl.removeClass(banner);
      domEl.addClass(newBanner);
      banner = newBanner;
    },
  };
}
