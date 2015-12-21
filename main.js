// game handling variables
var platforms, player, cursors
// flags
var jumping

// Using https://phaser.io as a gaming platform
var game = new Phaser.Game(700, 500, Phaser.AUTO, '', {
  preload: preload,
  update: update,
  create: create
})

function preload() {
  game.load.image('rcircle','./img/rcircle.png')
  game.load.image('grect', './img/grect.gif')

}

function update() {
  game.physics.arcade.collide(player, platforms)
  player.body.velocity.x = 0
  if (cursors.left.isDown) {
    player.body.velocity.x = -150
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
  }
  if (cursors.up.isDown && jumping !== true) {
    // negative is up
    player.body.velocity.y = -150
  }
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  platforms = game.add.group()
  platforms.enableBody = true
  var ground = platforms.create(0, game.world.height - 64, 'grect')
  ground.body.immovable = true
  player = game.add.sprite(0,0, 'rcircle')
  player.scale.setTo(0.25, 0.25)
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.4
  player.body.gravity.y = 300
  player.body.collideWorldBounds = true
  // circle.enableBody = true
  cursors = game.input.keyboard.createCursorKeys()
}
