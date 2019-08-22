const ds18b20 = require("ds18b20");
const utils = require("./utils");

const sendIntervalInMs = utils.mins(1);

class TempSensor {
  constructor(port) {
    this.port = port;
    this.temp = null;
  }

  initialize() {
    console.log("Initializing temp sensor");
    let id;
    ds18b20.sensors((err, ids) => {
      id = ids[0];
    });
    this.id = id;
    console.log("Temp sensor id is " + this.id);
    this._requestTemp();
    this.readInterval = setInterval(
      this._requestTemp.bind(this),
      sendIntervalInMs
    );
  }
  destroy() {
    console.log("Destroying temp sensor");
    clearInterval(this.readInterval);
  }

  _requestTemp() {
    const currentTemp = ds18b20.temperatureSync(this.id);
    if (currentTemp !== this.temp) {
      this.temp = currentTemp;
      this._sendUpdate(this.temp);
    }
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
