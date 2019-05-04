var os = require('os');

var Firebase = require("./Firebase");
var fermentation = require('./fermentation');

var ip; 

var secs = (secs) => {
    return secs * 1000;
}
var mins = (mins) => {
    return mins * secs(60);
}

var setIp = () => {
    var ifaces = os.networkInterfaces();
    
    Object.keys(ifaces).forEach(function(ifname) {
    
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
    
            ip = iface.address;
        });
    });   
}

var app = () => {
    Firebase.initialize();
    fermentation.initialize();
    
    var initInterval = setInterval(() => {
        console.log('Getting IP ...');
        setIp();
        if (ip) {
            Firebase.notifyUp(ip);
            clearInterval(initInterval);
        }
    }, secs(10));

    setInterval(() => {
        if (ip) {
            Firebase.notifyPing(ip);
        }
    }, mins(60));

    process.on('SIGINT', () => {
        if (ip) {
            Firebase.notifyDown(ip);
        }

        fermentation.destroy();
    });
}

app();