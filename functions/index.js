var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push it into the Realtime Database then send a response
//   admin.database().ref('/messages').push({original: original}).then(snapshot => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref);
//   });
// });

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

exports.getArticleByName = functions.https.onRequest((req, res) => {

	var name = req.query.name;

	admin.database().ref('/articles').on('value', function(snapshot) {
		var allArticles = snapshot.val(); //object {}
		// for(var i = 0; i < allArticles.length; i++){

		// }
	});

});