const W1Temp = require("w1temp");
const utils = require("./utils");

class TempSensor {
  async initialize() {
    console.log("Initializing temp sensor");

    this.sensor = await this._getSensor();

    const temp = this.sensor.getTemperature();
    console.log("Current temp is " + temp + "°C");
    this._sendUpdate(temp);

    sensor.on("change", this._tempUpdated.bind(this));
  }
  destroy() {
    console.log("Destroying temp sensor");
    clearInterval(this.readInterval);
  }

  async _getSensor() {
    const sensorsIds = await W1Temp.getSensorsUids();
    return await W1Temp.getSensor(sensorsIds[0]);
  }
  _tempUpdated(temp) {
    console.log("Temp changed to ", temp, "°C");
    this._sendUpdate(temp);
  }
  _sendUpdate(temp) {
    const now = utils.now();
    const key = now.replace(".", ":");
    const data = {
      at: now,
      temp: temp
    };
    console.log("Sending temp " + temp + " at " + now);
    firebase
      .temp(batch)
      .child(key)
      .set(data);
  }
}

module.exports = TempSensor;
