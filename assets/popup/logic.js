const Swal = window.Swal;
const firebase = window.firebase;

var firebaseConfig = {
  // CHANGEME when deployed
  apiKey: "AIzaSyDY7S3DFb3_ATZyEMnpUEVKxKRCQcd9nYw",
  authDomain: "myndsit.firebaseapp.com",
  databaseURL: "https://myndsit.firebaseio.com",
  projectId: "myndsit",
  storageBucket: "myndsit.appspot.com",
  messagingSenderId: "131929940359",
  appId: "1:131929940359:web:996f95faa9c28698baf322",
  measurementId: "G-0X4XGDDWSR"
};

/* POP UP VALIDATION METHODS */
// Validates the input value to check if it is a zip code
function validateZip(ev) {
  var zip = ev.target.value;
  var message;
  if (!/^\d{5}(-\d{4})?$/.test(zip)) {
    message = "Invalid Zip Code";
  } else {
    message = undefined;
  }

  document.getElementById(ev.target.id + "_msg").textContent = message;
}
// Validates the input to check if its an actual email
function ValidateEmail(ev) {
  var email = ev.target.value;
  var message;
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    message = "Invalid email address";
  } else {
    message = undefined;
  }
  document.getElementById("email_msg").textContent = message;
}

/* FIREBASE METHODS */
// Validate that the data is ok before we save it
function shouldAddData() {
  // Check for field sintax validation errors
  const validationEmail = document.getElementById("email_msg").textContent;
  const validationDropZip = document.getElementById("drop_zip_msg").textContent;
  const validationPickZip = document.getElementById("pick_zip_msg").textContent;
  const validationResult =
    !validationEmail && !validationDropZip && !validationPickZip ? true : false;

  // Check for field completeness validation errors
  const valueEmail = document.getElementById("email").value;
  const valueDropZip = document.getElementById("drop_zip").value;
  const valuePickZip = document.getElementById("pick_zip").value;
  const valueResult = valueEmail && valueDropZip && valuePickZip ? true : false;

  return valueResult && validationResult;
}
// Actually adding the data to firestore
const addDataToDb = () => {
  if (shouldAddData()) {
    firebase
      .firestore()
      .collection("emails")
      .add({
        email: document.getElementById("email").value,
        zip_drop: document.getElementById("drop_zip").value,
        zip_pick: document.getElementById("pick_zip").value,
        location: window.location.href,
        timestamp: new Date().toISOString()
      });
    console.log("added to db");
  } else {
    console.log("ignored");
  }
};

/* GLOBAL METHODS*/
// Fire popup and init firebase connection
window.addEventListener("load", function () {
  Swal.fire({
    template: "#popup-contents",
    preConfirm: () => {
      addDataToDb();
    }
  });
  firebase.initializeApp(firebaseConfig);
});
