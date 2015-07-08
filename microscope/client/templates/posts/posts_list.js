var postsData = [
	{
		title: "Introducing Kyle",
		url: "http://kylemitofsky.com"
	},
	{
		title: "Meteor",
		url: "http://meteor.com"
	}
];

Template.postsList.helpers({
	posts: postsData
});