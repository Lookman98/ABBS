
var admin = require("firebase-admin");

var serviceAccount = require("C:/FYP2/ABBS/serviceaccount/abbis-402b5-firebase-adminsdk-1b1x3-c5e0346429.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://abbis-402b5.firebaseio.com"
});
