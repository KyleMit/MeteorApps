// Default Layout for all routes
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return Meteor.subscribe('posts');
	}
});

// Load notFoundTemplate if data returns falsy value on the postPage route
Router.onBeforeAction('dataNotFound', {only: 'postPage'})

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