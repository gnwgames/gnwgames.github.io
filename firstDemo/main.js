// game handling variables
var platforms, player, cursors, textInstance, keyN
// flags
var jumping, textIndex

var text = ['Hello and welcome to our game. Please press "n" to continue',
            'We are pleased to announce that we have no experience making games',
            'What you see here is our silly attempt at such a thing',
            'We won\'t mind if you decide to quit']

// Using https://phaser.io as a gaming platform
var game = new Phaser.Game(700, 500, Phaser.AUTO, '', {
  preload: preload,
  update: update,
  create: create
})

function preload() {
  game.load.image('rcircle','./img/rcircle.png')
  game.load.image('grect', './img/grect.gif')
  game.load.image('bullet', './img/bullet.png', 20,20)

}

function update() {
  game.physics.arcade.collide(player, platforms)
  player.body.velocity.x = 0
  if (cursors.left.isDown) {
    player.body.velocity.x = -150
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
  }
  if (cursors.up.isDown && player.body.touching.down) {
    // negative is up is px/s
    player.body.velocity.y = -150
  }

}

function create() {
  textIndex = 0
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
  keyN = game.input.keyboard.addKey(Phaser.Keyboard.N)
  keyN.onDown.add(function(key) {
    textIndex++
    if (textIndex < text.length){
      textInstance.text = text[textIndex]
    }
  })
  var keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  keySpace.onDown.add(function(key) {
    x = player.position.x
    y = player.position.y
    console.log(x + " " + y)
    var bullet = game.add.sprite(x,y, 'bullet')
    bullet.scale.setTo(0.01, 0.01)
    game.physics.arcade.enable(bullet)
    bullet.body.velocity.x = (Math.random() - 0.5) * 150
    bullet.body.velocity.y = (Math.random() - 0.5) * 150
  }, this)
  textInstance = game.add.text(10,10, text[textIndex], {'fill': 'white', fontSize: '14pt'})
}
