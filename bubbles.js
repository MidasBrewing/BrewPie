const BubbleFork = require("./BubbleFork");

class Bubbles {
  initialize() {
    console.log("Initializing bubble counters ...");
    this.bubbleForkA = new BubbleFork("A", 17);
    this.bubbleForkA.initialize();
    this.bubbleForkB = new BubbleFork("B", 27);
    this.bubbleForkB.initialize();
  }
  destroy() {
    console.log("Destroying bubble counters ...");
    this.bubbleForkA.destroy();
    this.bubbleForkB.destroy();
  }
}

const bubbles = new Bubbles();

module.exports = bubbles;
