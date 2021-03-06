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
    console.log("user " + Meteor.userId() + " left game " + gameId);
    // http://docs.mongodb.org/manual/reference/operator/update/pull/#up._S_pull
    Games.update(gameId, {$pull: {users: Meteor.userId()}});
  },

  joinGame: function(gameId) {
    console.log("user " + Meteor.userId() + " joined game " + gameId);
    //http://docs.mongodb.org/manual/reference/operator/update/push/#up._S_push
    Games.update(gameId, { $push: { users: Meteor.userId()} });
  }

});