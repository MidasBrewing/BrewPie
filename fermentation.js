var Firebase = require("./Firebase");
var Gpio = require('onoff').Gpio;

var bubbleFork = new Gpio(17, 'in', 'rising', {debounceTimeout: 10});
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
        at: nowIso,
        count: count
    }

    console.log('Bubble: count ' + count + ' at ' + nowIso);

    Firebase.fermentations.child(key).set(data);
});

process.on('SIGINT', () => {
    bubbleFork.unexport();
});
