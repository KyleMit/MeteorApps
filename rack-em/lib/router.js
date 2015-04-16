Router.route('/', function () {
  this.render('Home', {
    data: function () { return }
  });
});

// given a url like "/game/5"
Router.route('game/:_id', function () {
  var id = this.params._id;
  this.render('gameDetail', {
    data: function () {
      return Games.findOne({_id: id});
    }
  });
});