let playerContainers = document.getElementsByClassName('hoverEffects');
Array.prototype.forEach.call(playerContainers, icon => {

  let anim = bodymovin.loadAnimation({
    container: icon,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "https://cdn.shopify.com/s/files/1/0133/6872/1472/files/line-animation.json?v=1668733124"
  });
  anim.setSpeed(2);

  let direction = 1;
  icon.addEventListener('mouseenter', (e) => {
    anim.setDirection(direction);
    anim.play();
  });

  icon.addEventListener('mouseleave', (e) => {
    anim.setDirection(-direction);
    anim.play();
  });

});