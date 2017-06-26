function FireApp(){
	this.checkSetup();
	this.init();
}

FireApp.prototype.init = function(){
	this.database = firebase.database();
	this.auth = firebase.auth();
	this.storage = firebase.storage();

	this.articleRef = this.database.ref('articles');
	console.log('intialized');
};

FireApp.prototype.addArticle = function(obj){
  this.articleRef.push(obj);
};

FireApp.prototype.signOut = function() {
  this.auth.signOut();
};

FireApp.prototype.addToMovieList = function(obj) {
  this.database.ref('movieList').push(obj);
};

FireApp.prototype.addComment = function(obj, numComments) {
  this.database.ref('comments').push(obj);
  var that = this;
  this.database.ref('/articles').on('value', function(snapshot) {
    var articles = snapshot.val();
    for(key in articles){
      if(articles.hasOwnProperty(key) && articles[key].dateCreated == obj.parent){
        that.database.ref('/articles/' + key).update({
          comments: numComments + 1
        });
      }
    }
  });
};

FireApp.prototype.addVote = function(dateCreated, votes){
  var that = this;
  this.database.ref('/articles').on('value', function(snapshot) {
    var articles = snapshot.val();
    for(key in articles){
      if(articles.hasOwnProperty(key) && articles[key].dateCreated == dateCreated){
        that.database.ref('/articles/' + key).update({
          votes: votes + 1
        });
      }
    }
  });
}

FireApp.prototype.removeFromMovieList = function(movieName) {
  var that = this;
  this.database.ref('/movieList').on('value', function(snapshot) {
    var movies = snapshot.val();
    for(key in movies){
      if(movies.hasOwnProperty(key) && movies[key].title == movieName){
        that.database.ref('/movieList/' + key).remove();
      }
    }
  });
};

FireApp.prototype.deleteArticle = function(dateCreated){
  var that = this;
  this.database.ref('/articles').on('value', function(snapshot) {
    var articles = snapshot.val();
    for(key in articles){
      if(articles.hasOwnProperty(key) && articles[key].dateCreated == dateCreated){
        that.database.ref('/articles/' + key).remove();
      }
    }
  });
}

FireApp.prototype.isAdministrator = function(uid) {
  var admins = ["TFQHoVg0RqYuUoMEMLgN9S7hUBc2", "URiRTmp97VhR1mU7Gss2ACmep9J3", "mkiXn1E0iAaWuHASR7PlZwiLhlz2"];
  // this.database.ref('/admins').on('value', function(snapshot) {
  //   admins = snapshot.val().uids; //[]
  // });
  return admins.indexOf(uid) != -1;
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
};