const BubbleFork = require("./BubbleFork");

const Bubbles = () => {
  this.initialize = () => {
    console.log("Initializing bubble counters ...");

    this.bubbleForkA = new BubbleFork("A");
    this.bubbleForkA.initialize();

    this.bubbleForkB = new BubbleFork("B");
    this.bubbleForkB.initialize();
  };

  this.destroy = () => {
    console.log("Destroying bubble counters ...");
    this.bubbleForkA.destroy();
    this.bubbleForkB.destroy();
  };
};

const bubbles = new Bubbles();

module.exports = {
  bubbles: bubbles
};
