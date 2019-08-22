const firebase = require("./firebase");
const bubbles = require("./bubbles");
const utils = require("./utils");

class App {
  constructor() {
    this.ip = null;
  }

  start() {
    firebase.initialize();
    bubbles.initialize();

    this.initInterval = setInterval(this._setIp.bind(this), utils.secs(10));

    setInterval(this._notifyPing.bind(this), utils.mins(60));

    process.on("SIGINT", this._destroy.bind(this));
  }

  _destroy() {
    if (this.ip) {
      firebase.notifyDown(this.ip);
    }
    bubbles.destroy();
  }
  _notifyPing() {
    if (this.ip) {
      firebase.notifyPing(this.ip);
    }
  }
  _setIp() {
    console.log("Getting IP ...");
    this.ip = utils.getIp();
    if (this.ip) {
      console.log("IP is " + this.ip);
      firebase.notifyUp(this.ip);
      clearInterval(this.initInterval);
    }
  }
}

const app = new App();
app.start();
