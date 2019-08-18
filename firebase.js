const admin = require("firebase-admin");
const serviceAccount = require("./midasbrewpie-firebase-adminsdk-2019-01-05.json");
const utils = require("./utils");

const Firebase = () => {
  this.initialize = () => {
    console.log("Initializing Firebase ...");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://midasbrewpie.firebaseio.com"
    });

    this.db = admin.database();
  };
  this.bubbles = batch => {
    return this.db.ref("fermentation/bubbles/" + batch);
  };
  this.notifyUp = ip => {
    notify("Up", ip);
  };
  this.notifyDown = ip => {
    notify("Down", ip);
  };
  this.notifyPing = ip => {
    notify("Ping", ip);
  };

  const notify = (message, ip) => {
    const ref = this.db.ref("device/fermentation/");
    const now = utils.now();

    console.log("Notifying " + message);

    ref.child(message).set({ time: now, ip: ip });
  };
};

const firebase = Firebase();

module.exports = {
  firebase: firebase
};
