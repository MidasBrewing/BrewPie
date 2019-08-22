const Gpio = require("onoff").Gpio;
const BubbleSampler = require("./BubbleSampler");

class BubbleFork {
  constructor(batch, port) {
    this.batch = batch;
    this.port = port;
    this.bubbleSampler = new BubbleSampler(this.batch);
  }

  initialize() {
    console.log("Initializing bubble fork for batch " + this.batch);
    this.bubbleSampler.initialize();
    this.input = new Gpio(this.port, "in", "rising", { debounceTimeout: 10 });
    this.input.watch(this._watcher);
  };
  destroy() {
    console.log("Destroying bubble fork for batch " + this.batch);
    this.bubbleSampler.destroy();
    this.input.unexport();
  };

  _watcher(error) {
    if (error) {
      throw error;
    }
    this.bubbleSampler.recordBubble();
  };
}

module.exports = BubbleFork;
