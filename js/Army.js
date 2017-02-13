function Army(startX, startY) {

  const img = new Image();
  img.src = "../IgnoreThis/Assets/Images/Archen.png";
  img.width = 100;
  img.height = 60;
  img.className = 'army';
  img.style.left = startX + 'px';
  img.style.bottom = startY + 'px';

  let position = [0,0];

  function moveTo(x, y) {
    position = [x,y];
    img.style.left = x + 'px';
    img.style.bottom = y + 'px';

  }

  return {
    img : img,
    position : position,
    moveTo : moveTo
  };
}
