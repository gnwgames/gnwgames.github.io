
var CirclesGroup = function(game) {
    Phaser.Group.call(this, game);
};

CirclesGroup.prototype = Object.create(Phaser.Group.prototype);
CirclesGroup.prototype.constructor = CirclesGroup;

CirclesGroup.prototype.addCircle = function(circle) {
    this.add(circle);
};
