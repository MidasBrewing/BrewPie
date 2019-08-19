const firebase = require("./firebase");
const utils = require("./utils");

const leastTimeBetweenBubblesInMs = utils.secs(5);
const sendIntervalInMs = utils.mins(1);
const frequentSendCount = 60;

function BubbleSampler(batch) {
  this.batch = batch;

  this.initialize = () => {
    console.log("Initializing bubble sampler for batch " + this.batch);
    this.currentCount = 0;
    this.sendAttemptCount = 0;
    this.sendNext = false;

    this.sendInterval = setInterval(() => {
      //console.log("Maybe sending bubbles for batch " + this.batch);
      this.sendAttemptCount = this.sendAttemptCount + 1;
      this.sendNext =
        this.sendNext ||
        this.sendAttemptCount <= frequentSendCount ||
        this.sendAttemptCount % frequentSendCount === 0;

      if (this.currentCount === 0 || !this.sendNext) {
        return;
      }

      sendCount(this.batch, this.currentCount);
      this.currentCount = 0;
      this.sendNext = false;
    }, sendIntervalInMs);
  };

  this.recordBubble = () => {
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
  };

  this.destroy = () => {
    console.log("Destroying bubble sampler for batch " + this.batch);
    if (this.sendInterval) {
      clearInterval(this.sendInterval);
    }
  };

  const sendCount = (batch, count) => {
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
  };

  return this;
}

module.exports = BubbleSampler;
