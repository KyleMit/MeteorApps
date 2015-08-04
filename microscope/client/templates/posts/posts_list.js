Template.postsList.helpers({
	posts: function() {
		var operator = {};
		operator.sort = {
			submitted: -1
		};
		return Posts.find({}, operator);
	}
});