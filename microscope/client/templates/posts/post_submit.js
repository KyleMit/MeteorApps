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

    // capture returned post id
    post._id = Posts.insert(post);
    
    // navigate to new post on submit
    Router.go('postPage', post)
  }
});