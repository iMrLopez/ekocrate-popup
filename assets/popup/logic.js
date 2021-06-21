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
  var message;
  const zip = ev.target.value;
  const zipCodes = ['97062','97224','97035','97070','97034','97068','97140','97036','97223','97008','97219','97079','97268','97281','97239','97267','97078','97027','97007','97269','97222','97075','97076','97077','97298','97002','97005','97221','97258','97225','97202','97020','97201','97205','97003','97206','97132','97291','97204','97013','97296','97294','97293','97292','97290','97286','97283','97207','97208','97228','97238','97240','97242','97251','97253','97254','97256','97282','97280','97214','97015','97006','97045','85301','85318','85311','85312','85303','85302','85031','85019','85033','85051','85304','85305','85017','85380','85035','85345','85015','85385','85021','85381','85029','85306','85013','85005','85037','85372','85012','85376','85053','85351','85009','85307','85043','85014','85363','85039','85020','85392','85023','85007','85382','85003','85026','85065','85070','85066','85064','85082','85063','85069','85062','85067','85002','85079','85078','85076','85075','85074','85073','85072','85071','85061','85060','85068','85080','85001','85010','85011','85030','85036','85038','85046','85308','85004','85335','85006','85353','85016','85022','85329','85028','85027','85309','85310','85041','85032','83704','83713','83703','83722','83719','83717','83711','83707','83701','83724','83726','83799','83756','83735','83732','83715','83729','83728','83720','83725','83709','83706','83680','83705','83702','83646','83642','83714','83708','83712','83616','83669'];
  if(zipCodes.find(element => element == zip)) {
    message = undefined;
  } else {
    message = "Invalid Zip Code";
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
