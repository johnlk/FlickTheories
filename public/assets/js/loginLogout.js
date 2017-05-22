$(document).ready(function() {
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { //if we are already signed in
      $('.welcomeBack').css('display', 'block');
    } else {
      $('.loginButtons').css('display', 'block');
    }
  });
  
  $('#loginButton').on('click', function() {
    var username = $('#userEmail').val();
    var password = $('#userPass').val();
    if (username.length > 0 && password.length > 0) {
      login(username, password);
    }
  });
  
  $('#logout').on('click', function() {
    window.fireApp.signOut();
    location.reload();
  });
  
  $('#createAccountButton').on('click', function() {
    var name = $('#newName').val();
    var email = $('#newEmail').val();
    var password = $('#pass').val();
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        location.reload();
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
    }
  });
  
  $('#loginModal').on('click', function() {
    $('.modal').eq(0).css('display', 'block');
  });
  
  $('#createAccountModal').on('click', function() {
    $('.modal').eq(1).css('display', 'block');
  });
  
  $('.cancel').on('click', function() {
    $('.modal').css('display', 'none');
  });
  
  $('#pass').on('change', function() {
    validatePassword();
  });
  
  $('#passConfirm').on('keyup', function() {
    validatePassword();
  });

  function validatePassword() {
    
    var password = document.getElementById('pass');
    var confirmPass = document.getElementById('passConfirm');
    
    if (password.value.length < 6) {
      password.setCustomValidity("Password must be at least 6 characters");
    } else if (password.value != confirmPass.value) {
      confirmPass.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPass.setCustomValidity('');
    }
    
  }

  function login(username, password) {
    firebase.auth().signInWithEmailAndPassword(username, password).then(function() {
      location.reload();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }
  
});