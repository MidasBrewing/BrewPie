const firebase = require("./firebase");
const utils = require("./utils");

const leastTimeBetweenBubblesInMs = utils.secs(5);
const sendIntervalInMs = utils.hours(1);

class BubbleSampler {
  constructor(batch) {
    this.batch = batch;
    this.currentCount = 0;
  }

  initialize() {
    console.log("Initializing bubble sampler for batch " + this.batch);
    this.sendInterval = setInterval(() => {
      //console.log("Maybe sending bubbles for batch " + this.batch);
      const count = this.currentCount;
      this.currentCount = 0;
      this._sendCount(this.batch, count);
    }, sendIntervalInMs);
  }
  recordBubble() {
    //console.log("Record bubble for batch " + this.batch);
    const now = new Date();
    if (this.lastBubbleAt) {
      const diffInMs = now.getTime() - this.lastBubbleAt.getTime();
      if (diffInMs < leastTimeBetweenBubblesInMs) {
        return;
      }
    }
    this.lastBubbleAt = now;
    this.currentCount = this.currentCount + 1;
  }
  destroy() {
    console.log("Destroying bubble sampler for batch " + this.batch);
    if (this.sendInterval) {
      clearInterval(this.sendInterval);
    }
  }

  _sendCount(batch, count) {
    const now = utils.now();
    const key = now.replace(".", ":");
    const data = {
      at: now,
      count: count
    };
    console.log(
      "Sending " + count + " bubbles in batch " + batch + " at " + now
    );
    firebase
      .bubbles(batch)
      .child(key)
      .set(data);
  }
}

module.exports = BubbleSampler;
