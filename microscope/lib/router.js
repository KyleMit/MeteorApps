// Default Layout for all routes
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('posts');
	}
});

// Define a route - 
// What the default yield section should have
Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
	name: 'postPage',
	// pass in datacontext for template
	data: function() {
		return Posts.findOne(this.params._id);
	}
})