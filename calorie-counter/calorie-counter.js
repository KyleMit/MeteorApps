Foods = new Mongo.Collection("foods");

if (Meteor.isClient) {

  Template.foodList.helpers({
    foods: function () {
      return Foods.find({});
    }
  });

  Router.route('/', function () {
    this.render('Home');
  });

  Router.route('/foodList');

  // given a url like "/food/5"
  Router.route('/food/:_id', function () {
    var params = this.params; // { _id: "5" }
    var id = params._id;      // "5"
    this.render('foodDetail', {
      data: function () {
        return Foods.findOne({_id: id});
      }
    });
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Foods.remove({});
    // code to run on server at startup
    if (Foods.find({}).count() == 0) {
      var apple = {
        createdAt: new Date(),
        // owner: Meteor.userId() || "",
        Name: "Apple",
        Brand: "",
        Description: "One regular apple",
        Link: "",
        ImageUrl: "http://i.imgur.com/Tp6kTQc.jpg",
        UPCCode: "",
        TotalFat: 1,
        TotalCalories: 55,
        SaturatedFat: 0,
        PolyFat: 0,
        MonoFat: 0,
        TransFat: 0,
        Cholesterol: 0,
        Sodium: 50,
        Potassium: 0,
        TotalCarb: 5,
        DietaryFiber: 0,
        Sugars: 4,
        OtherCarb: 1,
        Protein: 0,
        VitaminA: 0,
        VitaminC: 0,
        VitaminD: 0,
        VitaminE: 0,
        VitaminK: 0,
        Calcium: 0,
        Iron: 0,
        B1: 0,
        B3: 0,
        B6: 0,
        Tags: [
          "Fruit",
          "Ingredient"
        ]
      };
      Foods.insert(apple);
    }
  });
}
