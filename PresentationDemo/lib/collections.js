Questions = new Mongo.Collection('questions');

if (Questions.find().count() == 0) {
	Questions.insert({text: 'Seed Question'});
}