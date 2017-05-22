/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */
// FirebaseUI config.
let uiConfig = {
  'signInSuccessUrl': '../../play.html',
  'callbacks': {
    // Called when the user has been successfully signed in.
    'signInSuccess': function(user, credential, redirectUrl) {
      handleSignedInUser(user);
        console.log("singInSuccessCalled");
        return true;
    }
  },
  'signInOptions': [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());
// Keep track of the currently signed in user.
let currentUid = null;

/**
 * Redirects to the FirebaseUI widget.
 */
let signInWithRedirect = function() {
  window.location.assign('widget.html');
};


/**
 * Open a popup with the FirebaseUI widget.
 */
let signInWithPopup = function() {
  window.open('widget.html', 'Sign In', 'width=985,height=735');
};


/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
let handleSignedInUser = function(user) {
  currentUid = user.uid;
  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
  // if (user.photoURL){
  //   document.getElementById('photo').src = user.photoURL;
  //   document.getElementById('photo').style.display = 'block';
  // } else {
  //   document.getElementById('photo').style.display = 'none';
  // }
};


/**
 * Displays the UI for a signed out user.
 */
let handleSignedOutUser = function() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', uiConfig);
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  // The observer is also triggered when the user's token has expired and is
  // automatically refreshed. In that case, the user hasn't changed so we should
  // not update the UI.
  if (user && user.uid == currentUid) {
    return;
  }
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Deletes the user's account.
 */
let deleteAccount = function() {
  firebase.auth().currentUser.delete().catch(function(error) {
    if (error.code == 'auth/requires-recent-login') {
      // The user's credential is too oldfi. She needs to sign in again.
      firebase.auth().signOut().then(function() {
        // The timeout allows the message to be displayed after the UI has
        // changed to the signed out state.
        setTimeout(function() {
          alert('Please sign in again to delete your account.');
        }, 1);
      });
    }
  });
};


/**
 * Initializes the app.
 */
let initApp = function() {

  // document.getElementById('sign-in-with-redirect').addEventListener(
  //     'click', signInWithRedirect);
  // document.getElementById('sign-in-with-popup').addEventListener(
  //     'click', signInWithPopup);
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
  // document.getElementById('delete-account').addEventListener(
  //     'click', function() {
  //       deleteAccount();
  // });
};

window.addEventListener('load', initApp);
