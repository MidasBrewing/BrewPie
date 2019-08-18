const Gpio = require("onoff").Gpio;
const BubbleSampler = require("./BubbleSampler");

const BubbleFork = batch => {
  this.batch = batch;
  this.bubbleSampler = new BubbleSampler(batch);

  this.initialize = () => {
    console.log("Initializing bubble fork for batch " + this.batch);
    this.input = new Gpio(17, "in", "rising", { debounceTimeout: 10 });
    this.input.watch(watcher);
  };

  this.destroy = () => {
    console.log("Destroying bubble fork for batch " + this.batch);
    this.input.unexport();
  };

  const watcher = error => {
    if (error) {
      throw error;
    }
    this.bubbleSampler.recordBubble();
  };
};

module.exports = {
  BubbleFork: BubbleFork
};
