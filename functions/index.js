var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//works fine too
exports.getAllArticles = functions.https.onRequest((req, res) => {

	admin.database().ref('/articles').orderByChild('dateCreate').on('value', function(snapshot){
		res.send(snapshot.val());
	});

});

//works just fine!
exports.getFirstArticles = functions.https.onRequest((req, res) => {

	var limit = parseInt(req.query.limit);

	admin.database().ref('/articles').limitToFirst(limit).on('value', function(snapshot){
		res.send(snapshot.val());
	});

});

//working great
//user ?title= or ?movie=
exports.getArticle = functions.https.onRequest((req, res) => {

	var title = req.query.title;
	var movie = req.query.movie;

	admin.database().ref('/articles').on('value', function(snapshot) {
		var allArticles = snapshot.val(); //object {}

		for(key in allArticles){
			if(allArticles.hasOwnProperty(key)){
				var article = allArticles[key];
				if(article["articleTitle"] == title || article["movieTitle"] == movie){
					res.send(article);
					return;
				}
			}
		}

		res.send("No article found :(");

	});

});