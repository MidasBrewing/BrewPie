var admin = require("firebase-admin");
var os = require('os');

var serviceAccount = require("./midasbrewpie-firebase-adminsdk-2019-01-05.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://midasbrewpie.firebaseio.com"
});

var db = admin.database();
var fermentations = function(batch) {
    return db.ref("fermentations/" + batch);
}
var notifyUp = function() {
    notify('Up');
}
var notifyDown = function() {
    notify('Down');
}
var notifyPing = function() {
    notify('Ping');
}

var notify = function(message) {
    var ref = db.ref("device/fermentation/");
    var ip = getIp();
    var now = new Date();
    var nowIso = now.toISOString();

    ref.child(message).set({time: nowIso, ip: ip});
}
var _getIp = function() {
    var ifaces = os.networkInterfaces();
    var ip;
    
    Object.keys(ifaces).forEach(function(ifname) {
    
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
    
            ip = iface.address;
        });
    });   
    
    return ip;
}
var sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function getIp() {
    while(true) {
        var ip = _getIp();
        if (ip) {
            return ip;
        }
        await sleep(10 * 1000);
        console.log('Unable to get IP. retrying ...');
    }
}

module.exports = {
    fermentations: fermentations,
    notifyUp: notifyUp,
    notifyDown: notifyDown,
    notifyPing: notifyPing
};
