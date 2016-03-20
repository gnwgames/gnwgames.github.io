var Circle = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'circle');
  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.body.gravity.y = 300;
  this.scale.setTo(.3,.3);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

Circle.prototype = Object.create(Phaser.Sprite.prototype);
Circle.prototype.constructor = Circle;
