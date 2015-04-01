Meteor.methods({
  createGame: function() {
    // make sure the user is logged in before inserting an item
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Games.insert({
      createdAt: new Date(),
      owner: Meteor.userId(),
      users: [Meteor.userId()]
    }, function(err, id) {
      Router.go("/game/" + id);
    });


  },
  leaveGame: function(gameId) {
    console.log("user " + Meteor.userId() + " left game " + gameId)
    Games.update(gameId, { $set: { users: []} });
  }
})