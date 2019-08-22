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

    this.initInterval = setInterval(() => {
      console.log("Getting IP ...");
      this.ip = utils.getIp();
      if (this.ip) {
        console.log("IP is " + this.ip);
        firebase.notifyUp(this.ip);
        clearInterval(this.initInterval);
      }
    }, utils.secs(10));

    setInterval(() => {
      if (ip) {
        firebase.notifyPing(ip);
      }
    }, utils.mins(60));

    process.on("SIGINT", () => {
      if (ip) {
        firebase.notifyDown(ip);
      }
      bubbles.destroy();
    });
  }
}

const app = new App();
app.start();
