const Gpio = require("onoff").Gpio;
const BubbleSampler = require("./BubbleSampler");

function BubbleFork(batch, port) {
  this.batch = batch;
  this.port = port;
  this.bubbleSampler = new BubbleSampler(this.batch);

  this.initialize = () => {
    console.log("Initializing bubble fork for batch " + this.batch);
    this.bubbleSampler.initialize();
    this.input = new Gpio(this.port, "in", "rising", { debounceTimeout: 10 });
    this.input.watch(watcher);
  };

  this.destroy = () => {
    console.log("Destroying bubble fork for batch " + this.batch);
    this.bubbleSampler.destroy();
    this.input.unexport();
  };

  const watcher = error => {
    if (error) {
      throw error;
    }
    this.bubbleSampler.recordBubble();
  };

  return this;
}

module.exports = BubbleFork;
