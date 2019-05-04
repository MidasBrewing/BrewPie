var Firebase = require("./Firebase");
var Gpio = require('onoff').Gpio;

function watch(bubbleFork, batch) {
    bubbleFork.watch((error) => {
    
        if (error) {
            throw error;
        }
        
        var now = new Date();
        var nowIso = now.toISOString();
        var key = nowIso.replace("\.",":");
        var data = {
            at: nowIso,
            count: 1
        }
    
        console.log('Bubble batch ' + batch + ' at ' + nowIso);
    
        Firebase.fermentations(batch).child(key).set(data);
    });
}

var bubbleForkA = new Gpio(17, 'in', 'rising', {debounceTimeout: 10});
watch(bubbleForkA, 'A');

var bubbleForkB = new Gpio(27, 'in', 'rising', {debounceTimeout: 10});
watch(bubbleForkB, 'B');

process.on('SIGINT', () => {
    bubbleForkA.unexport();
    bubbleForkB.unexport();
});
