var admin = require("firebase-admin");

var serviceAccount = require("./midasbrewpie-firebase-adminsdk-2019-01-05.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://midasbrewpie.firebaseio.com"
});

var db = admin.database();
var fermentations = db.ref("fermentations");

module.exports = {
    fermentations: fermentations
};
