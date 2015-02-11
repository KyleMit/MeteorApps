Items = new Mongo.Collection("items");

if (Meteor.isClient) {
    // this code only runs on the client
    Template.body.helpers({
        items: function () {
            return Items.find({});
        }
    });


}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
