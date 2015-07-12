if (Posts.find().count() === 0) {
	Posts.insert({
		title: "Introducing Kyle",
		url: "http://kylemitofsky.com"
	});

	Posts.insert({
		title: "Meteor",
		url: "http://meteor.com"
	});
}