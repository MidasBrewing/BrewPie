const firebase = require("./firebase");
const bubbles = require("./bubbles");
const utils = require("./utils");

const app = () => {
  firebase.initialize();
  bubbles.initialize();

  var ip;

  var initInterval = setInterval(() => {
    console.log("Getting IP ...");
    ip = utils.getIp();
    if (ip) {
      console.log("IP is " + ip);
      firebase.notifyUp(ip);
      clearInterval(initInterval);
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
};

app();
