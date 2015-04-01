Meteor.publish('games', function() {
  return Games.find()
});

Meteor.publish('game', function(gameId) {
  check(gameId, String);

  return Games.find({_id: gameId});
})