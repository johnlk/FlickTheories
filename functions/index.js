var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//returns all articles
exports.getAllArticles = functions.https.onRequest((req, res) => {

	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');

	admin.database().ref('/articles').orderByChild('dateCreated').on('value', function(snapshot){
		res.send(snapshot.val());
	});

});

//works just fine!
//?limit=10
exports.getArticlesUpTo = functions.https.onRequest((req, res) => {

	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');

	var limit = parseInt(req.query.limit);

	admin.database().ref('/articles').limitToFirst(limit).on('value', function(snapshot){
		res.send(snapshot.val());
	});

});

//TODO
//needs fixing
exports.getArticleRange = functions.https.onRequest((req, res) => {

	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');

	var lowerLimit = parseInt(req.query.lower);
	var upperLimit = parseInt(req.query.upper);

	admin.database().ref('/articles').startAt(lowerLimit).endAt(upperLimit).on('value', function(snapshot) {
		res.send(snapshot.val());
	});

});

//working great
//user ?title= or ?movie=
exports.getArticleBy = functions.https.onRequest((req, res) => {

	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');

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

//works
exports.getMovieList = functions.https.onRequest((req, res) => {

	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');

	admin.database().ref('/movieList').on('value', function(snapshot) {
		res.send(snapshot.val());
	});

});

//works
exports.getMovieListUpTo = functions.https.onRequest((req, res) => {

	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');

	var limit = parseInt(req.query.limit);

	admin.database().ref('/movieList').limitToFirst(limit).on('value', function(snapshot) {
		res.send(snapshot.val());
	});

});

//works
exports.getAdmins = functions.https.onRequest((req, res) => {

	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');

	admin.database().ref('/admins').on('value', function(snapshot) {
		res.send(snapshot.val());
	});

});

