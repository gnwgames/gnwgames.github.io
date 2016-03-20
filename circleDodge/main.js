var CircleDodge = CircleDodge || {};
var keys, circlesGroup, lastDroppedTime, dropInterval, circlesDropped;

CircleDodge.game = new Phaser.Game(800, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  CircleDodge.game.load.script('Player.js', './objects/Player.js');
  CircleDodge.game.load.script('Circle.js', './objects/Circle.js');
  CircleDodge.game.load.script('Circle.js', './objects/CirclesGroup.js')
  CircleDodge.game.load.spritesheet('dude', './assets/sprites/dude_spritesheet.png', 128, 128);
  CircleDodge.game.load.spritesheet('circle', './assets/sprites/circle.png',360,360);
}

function create() {
  dropInterval = 3;

  this.game.physics.startSystem(Phaser.Physics.Arcade);
  this.game.stage.backgroundColor = '#ffffff';

  CircleDodge.player = new Player(this.game, 300, -100);
  circlesGroup = new CirclesGroup(this.game)
  var circle = new Circle(this.game,50,50);
  circlesGroup.addCircle(circle);

  lastDroppedTime = new Date().getSeconds();
  circlesDropped = 1;

  keys = CircleDodge.game.input.keyboard.createCursorKeys();

}

function update() {
  CircleDodge.player.handleInput(keys);
  switch (circlesDropped) {
    case 10:
      dropInterval = 2;
      break;
    case 20:
      dropInterval = 1;
      break;
    case 40:
      dropInterval = 0.75;
      break;
    case 80:
      dropInterval = 0.5;
      break;
    case 160:
      dropInterval = 0.25;
      break;
    case 320:
      dropInterval = 0.15;
      break;
    default:
      dropInterval = dropInterval;
      break;
  }

  var now = new Date().getTime() / 1000;
  if (now > (lastDroppedTime + dropInterval)) {
    var xPoint = Math.floor((Math.random() * 800) + 1);
    var circle = new Circle(this.game, xPoint, -100);
    circlesGroup.addCircle(circle);
    lastDroppedTime = now;
    circlesDropped++;
  }

  circlesGroup.forEachAlive(function(circle) {
    if (CircleDodge.player.alive) {
      CircleDodge.player.collide(circle);
      CircleDodge.player.overlap(circle);
    }
  });

  CircleDodge.game.physics.arcade.collide(circlesGroup, circlesGroup);
}
