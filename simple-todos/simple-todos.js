Items = new Mongo.Collection("items");

if (Meteor.isClient) {
    // this code only runs on the client
    Template.body.helpers({
        items: function () {
            return Items.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.body.events({
        "submit .new-item": function (event) {
            // this funtion is called when the new task form is submitted
            var form = event.target;
            var inputField = form.text;
            var text = inputField.value;
            console.log(event);
            Items.insert({
                text: text,
                createdAt: new Date()
            });

            // clear form
            event.target.text.value = "";

            // prevent default form submit
            return false;
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
