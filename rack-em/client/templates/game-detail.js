//subscribe
Meteor.subscribe('game');

Template.gameDetail.helpers({
  game: function () {
    return Games.find({});
  },
  hand: function() {
    return [
      {index: 1,  number: 1},
      {index: 2,  number: 5},
      {index: 3,  number: 10},
      {index: 4,  number: 11},
      {index: 5,  number: 30},
      {index: 6,  number: 35},
      {index: 7,  number: 40},
      {index: 8,  number: 41},
      {index: 9,  number: 45},
      {index: 10, number: 50}
    ]
  }
});

Template.card.helpers({
  cardHeight: function(i) {
    return i * 30;
  },
  numberWidth: function(n) {
    return Math.round(n/70 * 100)+"%";
  }
});

Template.gameDetail.events({
  'click .leave-game': function () {
    Meteor.call("leaveGame", this._id);
    Router.go("/");
  }
});
