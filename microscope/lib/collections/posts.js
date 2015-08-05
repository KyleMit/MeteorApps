Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    //only allow postif if you are logged in
    return !!userId;
  },
  update: function(userId, post) {
  	return ownsDocument(userId, post)
  },
  remove: function(userId, post) {
  	return ownsDocument(userId, post)
  },
});

Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		// check for duplicate url posts and return if found
		var samePost = Posts.findOne({url: postAttributes.url});
		if (samePost) {
			return {
				postExists: true,
				_id: samePost._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		})

		var postId = Posts.insert(post);

		return {
			_id: postId
		}
	}
})