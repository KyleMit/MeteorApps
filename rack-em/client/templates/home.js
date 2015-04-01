Template.home.helpers({

});

Template.home.events({
  'click .create-game': function () {
    Meteor.call("createGame");
  }
});

