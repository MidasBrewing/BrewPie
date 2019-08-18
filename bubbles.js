const BubbleFork = require("./BubbleFork");

const Bubbles = () => {
  this.initialize = () => {
    console.log("Initializing bubble counters ...");

    this.bubbleForkA = BubbleFork("A");
    this.bubbleForkA.initialize();

    this.bubbleForkB = BubbleFork("B");
    this.bubbleForkB.initialize();
  };

  this.destroy = () => {
    console.log("Destroying bubble counters ...");
    this.bubbleForkA.destroy();
    this.bubbleForkB.destroy();
  };
};

const bubbles = Bubbles();

module.exports = {
  bubbles: bubbles
};
