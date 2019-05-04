var admin = require('firebase-admin');

var serviceAccount = require('./midasbrewpie-firebase-adminsdk-2019-01-05.json');
var db;

var initialize = () => {
    console.log('Initializing Firebase ...');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://midasbrewpie.firebaseio.com'
    });

    db = admin.database();
}
var fermentations = (batch) => {
    return db.ref('fermentations/' + batch);
}
var notifyUp = (ip) => {
    notify('Up', ip);
}
var notifyDown = (ip) => {
    notify('Down', ip);
}
var notifyPing = (ip) => {
    notify('Ping', ip);
}

var notify = (message, ip) => {
    var ref = db.ref('device/fermentation/');
    var now = new Date();
    var nowIso = now.toISOString();

    console.log('Notifying ' + message);

    ref.child(message).set({time: nowIso, ip: ip});
}

module.exports = {
    initialize: initialize,
    fermentations: fermentations,
    notifyUp: notifyUp,
    notifyDown: notifyDown,
    notifyPing: notifyPing
};
