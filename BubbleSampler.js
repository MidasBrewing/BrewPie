const firebase = require("./firebase");
const utils = require("./utils");

const leastTimeBetweenBubblesInMs = utils.secs(5);
const sendIntervalInMs = utils.mins(1);
const frequentSendCount = 60;

const BubbleSampler = batch => {
  this.batch = batch;

  this.initialize = () => {
    this.currentCount = 0;
    this.sendAttemptCount = 0;

    this.sendInterval = setInterval(() => {
      this.sendAttemptCount = this.sendAttemptCount + 1;
      if (this.currentCount === 0) {
        return;
      }
      if (
        this.sendAttemptCount > frequentSendCount &&
        this.sendAttemptCount % frequentSendCount !== 0
      ) {
        return;
      }
      sendCount(this.batch, this.currentCount);
      this.sendCount = this.sendCount + 1;
      this.currentCount = 0;
    }, sendIntervalInMs);
  };

  this.recordBubble = () => {
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
      "Sending " + count + " bubbles in batch " + batch + " at " + nowIso
    );

    firebase
      .bubbles(batch)
      .child(key)
      .set(data);
  };
};

module.exports = BubbleSampler;
