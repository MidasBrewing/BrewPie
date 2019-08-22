const admin = require("firebase-admin");
const serviceAccount = require("./midasbrewpie-firebase-adminsdk-2019-01-05.json");
const utils = require("./utils");

class Firebase {
  constructor() {}

  initialize() {
    console.log("Initializing Firebase ...");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://midasbrewpie.firebaseio.com"
    });
    this.db = admin.database();
  }
  bubbles(batch) {
    return this.db.ref("fermentation/bubbles/" + batch);
  }
  temp() {
    return this.db.ref("fermentation/temp");
  }
  notifyUp(ip) {
    this._notify("Up", ip);
  }
  notifyDown(ip) {
    this._notify("Down", ip);
  }
  notifyPing(ip) {
    this._notify("Ping", ip);
  }
  _notify(message, ip) {
    const ref = this.db.ref("device/fermentation/");
    const now = utils.now();
    console.log("Notifying " + message);
    ref.child(message).set({ time: now, ip: ip });
  }
}

const firebase = new Firebase();

module.exports = firebase;
