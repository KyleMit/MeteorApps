//subscribe
Meteor.subscribe('games');

Template.games.helpers({
  games: function () {
    var filter = {}
    var sort = { sort: { createdAt: -1 } };
    return Games.find(filter, sort);
  }
});