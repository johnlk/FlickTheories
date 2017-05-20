function FireApp(){
	this.checkSetup();
	this.init();
}

FireApp.prototype.init = function(){
	this.database = firebase.database();
	this.auth = firebase.auth();
	this.storage = firebase.storage();

	this.userRef = this.database.ref('users');
	// this.auth.onAuthStateChanged(this.isSignedIn.bind(this));
	console.log('initalized');
}

FireApp.prototype.signOut = function() {
  this.auth.signOut();
};

FireApp.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};

window.onload = function(){
	window.fireApp = new FireApp();
}