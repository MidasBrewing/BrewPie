var Gpio = require('onoff').Gpio;

var Firebase = require('./Firebase');

var bubbleForkA;
var bubbleForkB;

var initialize = () => {
    console.log('Initializing fermentation ...');
    bubbleForkA = new Gpio(17, 'in', 'rising', {debounceTimeout: 10});
    watch(bubbleForkA, 'A');

    bubbleForkB = new Gpio(27, 'in', 'rising', {debounceTimeout: 10});
    watch(bubbleForkB, 'B');
}
var destroy = () => {
    console.log('Destroying fermentation ...');
    bubbleForkA.unexport();
    bubbleForkB.unexport();
}

var watch = (bubbleFork, batch) => {
    bubbleFork.watch((error) => {
    
        if (error) {
            throw error;
        }
        
        var now = new Date();
        var nowIso = now.toISOString();
        var key = nowIso.replace('\.',':');
        var data = {
            at: nowIso,
            count: 1
        }
    
        console.log('Bubble batch ' + batch + ' at ' + nowIso);
    
        Firebase.fermentations(batch).child(key).set(data);
    });
}

module.exports = {
    initialize: initialize,
    destroy: destroy
}