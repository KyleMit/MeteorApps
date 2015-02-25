/// <reference path=".meteor/local/build/programs/web.browser/packages/" />
/// <reference path=".meteor/local/build/programs/server/packages/" />

Items = new Mongo.Collection("items");

if (Meteor.isClient) {
    // this code only runs on the client
    Template.body.helpers({
        items: function () {
            var sort = { sort: { createdAt: -1 } };
            if (Session.get("hideCompleted")) {
                // if hide completed is checked, filter items
                return Items.find({ checked: { $ne: true } }, sort);
            } else {
                // otherwise, return all tasks
                return Items.find({}, sort);
            }
        },
        // we have to manually expose session properties to the client through helpers
        hideCompleted: function() {
            return Session.get("hideCompleted");
        },
        incompleteCount: function() {
            return Items.find({checked: {$ne: true}}).count()
        }
    });


    Template.body.events({
        "submit .new-item": function (event) {
            // this function is called when the new task form is submitted
            var form = event.target;
            var inputField = form.text;
            var text = inputField.value;

            Meteor.call("addItem", text);

            // clear form
            event.target.text.value = "";

            // prevent default form submit
            return false;
        },
        "change .hide-completed input": function(event) {
            Session.set("hideCompleted", event.target.checked);
        }
    });

    Template.item.events({
        "click .toggle-checked": function() {
            Meteor.call("setChecked", this._id, !this.checked);
            // Items.update(this._id, { $set: { checked: !this.checked } });
        },
        "click .delete": function () {
            Meteor.call("deleteItem", this._id);
            //Items.remove(this._id);
        }
    });

    Template.registerHelper('equals',
        function(v1, v2) {
            return (v1 === v2);
        }
    );

    Tracker.autorun(function() {
         document.title = "Simple Todos (" + Items.find({checked: {$ne: true}}).count() + ")"
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

    });
}

// run everywhere
Meteor.methods({
    addItem: function(text) {
        // make sure the user is logged in before inserting an item
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Items.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        })
    },
    deleteItem: function(itemId) {
        Items.remove(itemId);
    },
    setChecked: function(itemId, setChecked) {
        Items.update(itemId, { $set: { checked: setChecked} })
    }

})