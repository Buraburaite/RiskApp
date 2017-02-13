function World() {

  const canvas = $('#canvas');
  const context = canvas.getContext('2d');

  function drawWorld() {
    
    base_image = new Image();
    base_image.src = 'img/base.png';
    base_image.onload = function(){
      context.drawImage(base_image, 100, 100);
    }


    return {
      canvas :  canvas
      context : context
    }
  }
