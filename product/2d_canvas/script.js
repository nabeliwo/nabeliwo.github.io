window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

function canvasApp() {
  var theCanvas = document.getElementById('canvasOne');
  var gravityBtn = document.getElementById('gravityBtn');

  if (!theCanvas || !theCanvas.getContext) {
    return;
  }

  var context = theCanvas.getContext('2d');
  var numBalls = 0;
  var maxSize = 12;
  var minSize = 3;
  var maxSpeed = maxSize + 5;
  var balls = [];
  var tempBall;
  var tempX;
  var tempY;
  var tempSpeed;
  var tempAngle;
  var tempRadius;
  var tempRadians;
  var tempvelocityx;
  var tempvelocityy;
  var tempColor;
  var gravityFlag = false;
  var gravity = 0;
  var elasticity = 1;
  var friction = 0;

  theCanvas.addEventListener('click', function(e) {
    tempRadius = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    tempColor = 'rgb(' + getColor() + ',' + getColor() + ',' + getColor() + ')';

    tempX = e.offsetX;
    tempY = e.offsetY;
    tempSpeed = maxSpeed - tempRadius;
    tempAngle = Math.floor(Math.random() * 360);
    tempRadians = tempAngle * Math.PI / 180;
    tempvelocityx = Math.cos(tempRadians) * tempSpeed;
    tempvelocityy = Math.sin(tempRadians) * tempSpeed;

    tempBall = {
      x: tempX,
      y: tempY,
      nextX: tempX,
      nextY: tempY,
      radius: tempRadius,
      speed: tempSpeed,
      angle: tempAngle,
      velocityx: tempvelocityx,
      velocityy: tempvelocityy,
      mass: tempRadius * 8,
      color: tempColor,
      count: 10
    };

    balls.push(tempBall);
  }, false);

  function getColor() {
    return Math.floor(Math.random() * (255 + 1));
  }

  function hitTestCircle(ball1, ball2) {
    var retval = false;
    var dx = ball1.nextX - ball2.nextX;
    var dy = ball1.nextY - ball2.nextY;
    var distance = dx * dx + dy * dy;

    if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)) {
      retval = true;
    }

    return retval;
  }

  function drawScreen() {
    context.fillStyle = '#EEE';
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);

    context.strokeStyle = '#000';
    context.strokeRect(1, 1, theCanvas.width - 2, theCanvas.height - 2);

    update();
    testWalls();
    collide();
    render();

    requestAnimationFrame(drawScreen);
  }

  drawScreen();

  function update() {
    var ball;

    for (var i = 0, l = balls.length; i < l; i++) {
      ball = balls[i];

      ball.velocityy += gravity;

      ball.nextX = (ball.x + ball.velocityx);
      ball.nextY = (ball.y + ball.velocityy);
    }
  }

  function testWalls() {
    var ball;

    for (var i = 0; i < balls.length; i++) {
      ball = balls[i];

      if (ball.nextX + ball.radius > theCanvas.width) {
        ball.velocityx = ball.velocityx * -1;
        ball.nextX = theCanvas.width - ball.radius;
      } else if (ball.nextX - ball.radius < 0) {
        ball.velocityx = ball.velocityx * -1;
        ball.nextX = ball.radius;
      } else if (ball.nextY + ball.radius > theCanvas.height) {
        ball.velocityy = ball.velocityy * -1 * elasticity;
        ball.nextY = theCanvas.height - ball.radius;
      } else if (ball.nextY - ball.radius < 0) {
        ball.velocityy = ball.velocityy * -1;
        ball.nextY = ball.radius;
      } else if (ball.nextY + ball.radius === theCanvas.height) {
        ball.velocityx = ball.velocityx - (ball.velocityx * friction);
      }
    }
  }

  function collide() {
    var ball;
    var testBall;
    var l = balls.length;

    for (var i = 0; i < l; i++) {
      ball = balls[i];

      for (var j = i + 1; j < l; j++) {
        testBall = balls[j];

        if (hitTestCircle(ball, testBall)) {
          collideBalls(ball, testBall);
        }
      }
    }
  }

  function collideBalls(ball1, ball2) {
    var dx = ball1.nextX - ball2.nextX;
    var dy = ball1.nextY - ball2.nextY;
    var collisionAngle = Math.atan2(dy, dx);
    var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx + ball1.velocityy * ball1.velocityy);
    var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx + ball2.velocityy * ball2.velocityy);
    var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
    var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);
    var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
    var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
    var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
    var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
    var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
    var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);
    var final_velocityy_1 = velocityy_1;
    var final_velocityy_2 = velocityy_2;

    ball1.velocityx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_1;
    ball1.velocityy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_1;
    ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_2;
    ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_2;

    ball1.nextX = (ball1.nextX += ball1.velocityx);
    ball1.nextY = (ball1.nextY += ball1.velocityy);
    ball2.nextX = (ball2.nextX += ball2.velocityx);
    ball2.nextY = (ball2.nextY += ball2.velocityy);
  }

  function render() {
    var ball;

    for (var i = 0, l = balls.length; i < l; i++) {
      ball = balls[i];

      ball.x = ball.nextX;
      ball.y = ball.nextY;

      context.fillStyle = ball.color;
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
      context.fill();
    }
  }

  gravityBtn.addEventListener('click', function(e) {
    var target = e.target;

    if (!gravityFlag) {
      gravity = .1;
      elasticity = .5;
      friction = .01;

      target.textContent = target.textContent.replace(/on/, 'off');
    } else {
      gravity = 0;
      elasticity = 1;
      friction = 0;

      target.textContent = target.textContent.replace(/off/, 'on');
    }

    gravityFlag = !gravityFlag;
  }, false);
}
