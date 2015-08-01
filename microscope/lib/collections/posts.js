Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    //only allow postif if you are logged in
    return !!userId;
  }
});