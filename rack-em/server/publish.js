Meteor.publish('games', function() {
  return Games.find()
});

Meteor.publish('game', function(gameId) {
  check(gameId, String);
  return Games.find({_id: gameId});
})

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});