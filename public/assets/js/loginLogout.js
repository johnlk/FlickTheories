$(document).ready(function() {

  $('.inner').eq(0).prepend('<div class="loginButtons" style="display:none;">' +
                '<ul class="actions">' +
                  '<li><input id="loginModal" type="submit" value="Login" class="special" /></li>' +
                  '<li><input id="createAccountModal" type="submit" value="Create Account" /></li>' +
                '</ul>' +
              '</div>' +              
              '<div class="welcomeBack" style="display:none;">' +
                'Welcome <strong>Back!</strong>' +
                '<ul class="actions" style="display: inline-block; margin-left: 3%;">' +
                  '<li><input id="logout" type="submit" value="Logout" /></li>' +
                '</ul>' +
              '</div>');

  $('.inner').eq(0).append('<!-- Login Modal -->' +
          '<div class="modal">' +
            '<div class="loginForm modal-content animate">' +
              '<form onsubmit="return false">' +
                '<div class="row uniform">' +
                  '<div class="12u 12u$(xsmall)">' +
                    '<input id="userEmail" name="email" placeholder="Email" type="email" value="" required>' +
                  '</div>' +
                '</div>' +
                '<div class="row uniform">' +
                  '<div class="12u$ 12u$(xsmall)">' +
                    '<input id="userPass" name="password" placeholder="Password" type="password" value="" required>' +
                  '</div>' +
                '</div>' +
                '<div class="row uniform">' +
                  '<div class="12u$">' +
                    '<ul class="actions">' +
                      '<li><input id="loginButton" class="special" type="submit" value="Login"></li>' +
                      '<li><input class="cancel" type="submit" value="Cancel"></li>' +
                    '</ul>' +
                  '</div>' +
                '</div>' +
              '</form>' +
            '</div>' +
          '</div>' +
        '<!-- Create Account Modal -->' +
          '<div class="modal">' +
            '<div class="loginForm modal-content animate">' +
              '<form onsubmit="return false">' +
                '<div class="row uniform">' +
                  '<div class="12u 12u$(xsmall)">' +
                    '<input id="newEmail" name="email" placeholder="Email" type="email" value="" required>' +
                  '</div>' +
                '</div>' +
                '<div class="row uniform">' +
                  '<div class="12u$ 12u$(xsmall)">' +
                    '<input id="pass" name="password" placeholder="Password" type="password" value="" required>' +
                  '</div>' +
                '</div>' +
                '<div class="row uniform">' +
                  '<div class="12u$ 12u$(xsmall)">' +
                    '<input id="passConfirm" name="password" placeholder="Confirm Password" type="password" value="" required>' +
                  '</div>' +
                '</div>' +
                '<div class="row uniform">' +
                  '<div class="12u$">' +
                    '<ul class="actions">' +
                      '<li><input id="createAccountButton" class="special" type="submit" value="Create Account"></li>' +
                      '<li><input class="cancel" type="submit" value="Cancel"></li>' +
                    '</ul>' +
                  '</div>' +
                '</div>' +
              '</form>' +
            '</div>' +
          '</div>');
  
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