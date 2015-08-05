// Default Layout for all routes
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return Meteor.subscribe('posts');
	}
});


// Define a route - 
// What the default yield section should have
Router.route('/', {name: 'postsList'});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/posts/:_id', {
	name: 'postPage',
	// pass in datacontext for template
	data: function() {
		return Posts.findOne(this.params._id);
	}
})

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() {
		return Posts.findOne(this.params._id);
	}
})

// create require login function
var requireLogin = function() {
  if (! Meteor.user()) {
  	if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate)
  	} else {
  		this.render('accessDenied');
  	}
  } else {
    this.next();
  }
}

// add login function to postSumbit route before action
Router.onBeforeAction(requireLogin, {only: 'postSubmit'})

// Load notFoundTemplate if data returns falsy value on the postPage route
Router.onBeforeAction('dataNotFound', {only: 'postPage'})
