let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

let mouse = {
  x : undefined,
  y : undefined
}

window.addEventListener('resize',function(event){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})
window.addEventListener('mousemove',function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})
window.addEventListener('click',function(event){
  click();
})
function Circle(x,y,dx,dy,radius,opacity){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.opacity = opacity;
  this.color = '#fffffff';

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity //opacity
    ctx.fill();
  }

  this.update=function(){
    if (this.x + this.radius > innerWidth) {
      this.x = 0 - this.radius
    }
    if (this.y+this.radius > innerHeight || this.y+this.radius < 0 ) {
      this.y = 0 - this.radius
    }
    if (this.y+this.radius < 0 ) {
      this.y = innerHeight + this.radius
    }
    if (this.x-this.radius < 0 ) {
      this.x = innerWidth - this.radius
    }

    else{ // Sinon si le diamètre du cercle est supérieur à 2
      this.color = '#83A8C3';
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

let circleArray =[];

function init(){
  for (var i = 0; i < 900; i++) {
    let radius = Math.random()*3;

    let x = Math.random() * (innerWidth - radius * 2) +radius;
    let y = Math.random() * (innerHeight- radius * 2) +radius;
    let dx = Math.random()*-0.5;
    let dy = Math.random()*4;
    let opacity = Math.random();
    circleArray.push(new Circle(x,y,dx,dy,radius,opacity));
  }

}
let circleArray2 =[]
function click(){
  for (var i = 0; i < 50; i++) {
    let radius = Math.random()*3;
    let x = mouse.x+Math.random()*10;
    let y = mouse.y+Math.random()*10;
    let dx = Math.random()*-2
    let dy = Math.random()*4
    let opacity = Math.random();
    circleArray2.push(new Circle(x,y,dx,dy,radius,opacity))
  }
}



function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  for (var i = 0; i < circleArray2.length; i++) {
    circleArray2[i].update();
  }
}
animate();
init();
