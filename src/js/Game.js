var Game = (function() {
  var Game = function() {};

  Game.prototype.init = function(container, control, menu, width, height, speed, views) {
    this.container = container;
    this.control = control;
    this.menu = menu;

    this.view = views.target;
    this.combo = new Combo();
    this.combo.bind(views.energy, views.score);
    this.container.bind(views.next);
    this.menu.bind(this, views.menu);

    this.container.init(this, width, height, speed);
    this.control.init(this);

    this.speed = speed;
    this.running = false;
  };

  Game.prototype.restart = function() {
    this.container.restart();
    this.combo.reset();
  };

  Game.prototype.start = function() {
    var game = this;
    this.running = true;
    this.frame = window.requestAnimationFrame(function() {
      game.step();
    });
  };
  Game.prototype.stop = function() {
    this.running = false;
  };
  Game.prototype.lose = function() {
    this.menu.show('end');
    this.stop();
  };
  Game.prototype.step = function() {
    var game = this;
    if (!this.running)
      return;
    this.container.update();
    // use closure, because bind is slower
    this.frame = window.requestAnimationFrame(function() {
      game.step();
    });
  };
  return Game;
})();
