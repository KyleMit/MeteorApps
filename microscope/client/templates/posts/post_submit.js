Template.postSubmit.events({
  'submit form': function(e) {
    // prevent browser from handling
    e.preventDefault();

    console.log(e.target);

    // create post
    var post = {
      url: e.target.url.value,
      title: e.target.title.value
    };

    Meteor.call('postInsert', post, function(error, result) {
      // display any errors to the user and leave
      if (error) return alert(error.reason);

      Router.go('postPage', {_id: result._id});
    });
  }
});