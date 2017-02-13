function Army() {

  let img = new Image();
  img.src = "../IgnoreThis/Assets/Images/Archen.png";
  img.width = 100;
  img.height = 60;
  img.className = 'army';

  let position = [0,0];

  function moveTo(x, y) {
    position = [x,y];
    img.style.left = x;
    img.style.right = y;

  }

  return {
    position : position,
    moveTo : moveTo
  };
}
