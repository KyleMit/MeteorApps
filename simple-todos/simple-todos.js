if (Meteor.isClient) {
    // this code only runs on the client
    Template.body.helpers({
        tasks: [
            { text: 'Task 1' },
            { text: 'Task 2' },
            { text: 'Task 4' }
        ]
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
