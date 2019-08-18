const BubbleFork = require("./BubbleFork");

const Bubbles = () => {
  this.initialize = () => {
    console.log("Initializing bubble counters ...");

    this.bubbleForkA = BubbleFork("A", 17);
    this.bubbleForkA.initialize();

    this.bubbleForkB = BubbleFork("B", 27);
    this.bubbleForkB.initialize();
  };

  this.destroy = () => {
    console.log("Destroying bubble counters ...");
    this.bubbleForkA.destroy();
    this.bubbleForkB.destroy();
  };

  return this;
};

const bubbles = Bubbles();

module.exports = bubbles;
