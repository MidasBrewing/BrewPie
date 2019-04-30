var Firebase = require("./Firebase");
var Config = require('./Config');
var Gpio = require('onoff').Gpio;

var bubbleFork = new Gpio(Config.gpio, 'in', 'rising', {debounceTimeout: 10});
var count = 0;

bubbleFork.watch((error) => {
    
    if (error) {
        throw error;
    }

    count++;

    var now = new Date();
    var nowIso = now.toISOString();
    var key = nowIso.replace("\.",":");
    var data = {
        batch: Config.batch,
        at: nowIso,
        count: count
    }

    console.log('Bubble: batch: ' + Config.batch + ' count ' + count + ' at ' + nowIso);

    Firebase.fermentations.child(key).set(data);
});

process.on('SIGINT', () => {
    bubbleFork.unexport();
});
