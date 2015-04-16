//subscribe
Meteor.subscribe('game');
Meteor.subscribe("directory");

Template.gameDetail.helpers({
  // this  = {
  //  createdAt: date,
  //  owner: id,
  //  users: []
  // }
  hand: function() {
    return [
      {index: 1,  number: 5},
      {index: 2,  number: 10},
      {index: 3,  number: 15},
      {index: 4,  number: 20},
      {index: 5,  number: 25},
      {index: 6,  number: 30},
      {index: 7,  number: 35},
      {index: 8,  number: 40},
      {index: 9,  number: 45},
      {index: 10, number: 50}
    ]
  },
  userInGame: function() {
    return this.users.indexOf(Meteor.userId()) > -1
  },
  users: function() {
    // doesn't work on initial load - wait till we have data
    if (!this.users) return;
    console.log(this.users)
    return this.users.map(function(user) {
      var user = Meteor.users.findOne(user);
      // if we can't find the user, keep going
      if (!user) return;
      return {
        id: user.id,
        name: user.emails.length ? user.emails[0].address : "Unknown User"
      }
    })

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
  },

  'click .join-game': function () {
    Meteor.call("joinGame", this._id);
  }
});
