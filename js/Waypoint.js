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
    domEl.click(() => {

      god.trigger('start');
    });
  }

  function onStart() {
    domEl.click(() => {
      let orders = {};

      god.trigger('move', orders);
    });
  }

  function onMove() {
    domEl.click(() => {
      if (currentPlayer.name === residingPlayer.name) {
        console.log('yes, it\'s your turn');
      }
    });
  }

  function onCombat() {
    domEl.click(() => {

      god.trigger('end');
    });
  }

  function onEnd() {
    domEl.click(() => {

      god.trigger('endGame');
    });
  }

  function onEndGame() {
    domEl.click(() => {});
  }

  function onWorldUpdate(e, query) {
    armyCount = query[name].length;
    domEl.html(armyCount);
  }


  god.on('startGame',   (e) => { domEl.off('click'); onStartGame(); });
  god.on('start',       (e) => { domEl.off('click'); onStart();     });
  god.on('move',        (e) => { domEl.off('click'); onMove();      });
  god.on('combat',      (e) => { domEl.off('click'); onCombat();    });
  god.on('end',         (e) => { domEl.off('click'); onEnd();       });
  god.on('endGame',     (e) => { domEl.off('click'); onEndGame();   });
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
