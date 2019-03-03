var Firebase = require("./Firebase");

function generateData(count) {
    var generatedData = {};
    var i;
    var id;
    var now;
    var from;
    var to;

    for (i = 0; i < count; i++) {
        id = i;
        now = new Date();
        now.setHours(now.getHours() - (count - i));
        from = new Date(now);
        from.setHours(from.getHours() + 1);
        to = new Date(now);

        generatedData[id] = {
            from: from.toISOString(),
            to: to.toISOString(),
            count: i + 1
        }
    }

    return generatedData;
}

var generatedData = generateData(10);

if (1 === 0) {
Firebase.fermentations.set(generatedData);

Firebase.fermentations.once("value", function(snapshot) {
    console.log(snapshot.val());
});
}

