/**
* Created by gattra on 12/22/2015.
*/
var STATE =
{
  STANDING : 0,
  JUMPING : 1,
  FLYING : 2,
  FALLING : 3,
  DIVING : 4,
  INJURED : 5
};

var Player = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'dude');
  this.game.physics.arcade.enable(this);
  this.game.add.existing(this);
  this.frame = 0;
  this.animations.add('right', [11,12,13,14,15,16,17,18,19,20,21], 20, true);
  this.animations.add('left', [61,62,63,64,65,66,67,68,69,70,71], 20, true);
  this.animations.add('blink', [105,0], 10, false);
  this.body.gravity.y = 500;
  this.body.bounce.y = 0.2;
  this.body.collideWorldBounds = true;
  this.game.camera.follow(this);
  this.jumpCount = 0;
  this.state = STATE.STANDING;
  this.lifeCount = 100;
  this.scale.setTo(.7,.7);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.l = function() {
  this.animations.play('left');
  this.body.velocity.x = -250;
};

Player.prototype.r = function () {
  this.animations.play('right');
  this.body.velocity.x = 250
};

Player.prototype.jump = function () {
  this.jumpCount += 1;
  this.body.velocity.y = -380;

  /*
   if (keys.down.isDown) {
      this.body.velocity.y = -600;
      this.state = STATE.DIVING;
   } else if (keys.up.isDown) {
      this.jumpCount += 1;
      this.body.velocity.y = -220;
   }
   */
};

Player.prototype.fly = function () {
  this.body.velocity.y = -100;
};

Player.prototype.st = function () {
  this.animations.stop();
  this.frame = 0;
  this.body.velocity.x = 0;
};

Player.prototype.collide = function (obj) {
  this.game.physics.arcade.collide(this, obj, collidePlayer);
};

Player.prototype.overlap = function(obj) {
  this.game.physics.arcade.overlap(this, obj, collidePlayer);
};

Player.prototype.update = function () {
  if((this.body.onFloor() || this.body.touching.down)) {
      this.state = STATE.STANDING;
  }
  return this.state;
};

Player.prototype.handleInput = function (keys) {

  if (this.state === STATE.INJURED) {
      return;
  }

  else {
      //the actions below (but before the switch statement) happen regardless of the player's state
      if (keys.left.isDown) {
          this.l()
      } else if (keys.right.isDown) {
          this.r()
      } else {
          this.st()
      }
      if (CircleDodge.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
          this.fly();
          this.state = STATE.FLYING
      }

      switch (this.state) {
          case STATE.STANDING:
              if (keys.up.isDown) {
                  this.jumpCount = 0;
                  this.jump();
                  this.state = STATE.JUMPING;
              }
              break;

          case STATE.JUMPING:
              var upKey = keys.up;
              upKey.onDown.add(function () {
                  if (this.jumpCount < 2) {
                      this.jump();
                  }
                  else {
                      this.state = STATE.FALLING;
                  }
              }, this);
              if (keys.down.isDown) {
                  this.state = STATE.DIVING;
              }
              break;

          case STATE.FLYING:
              if ((keys.down.isDown) && (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
                  this.body.velocity.y = -(this.body.velocity.y * 2);
              }
              break;

          case STATE.FALLING:
              if (keys.down.isDown) {
                  this.state = STATE.DIVING;
              }
              break;

          case STATE.DIVING:
              //dive attack, jack
              break;
          }
    }
};


Player.prototype.animateInjury = function() {
  this.animations.play('blink');
}

function collidePlayer(player, obj) {
  //Animate death - blinking sprite, which disappears and then reappears at 0,0
  player.animateInjury();
  if (obj.body.position.x > player.body.position.x) {
    obj.body.velocity.x = 300;
  } else { obj.body.velocity.x = -300; }
  obj.body.velocity.y = -300;
  player.lifeCount -= 1;
}
