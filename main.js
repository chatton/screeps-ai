var harvester = require('role.harvester');
var upgrader = require('role.upgrader');


function handleHarvesters() {
    const harvesterName = "Harvester-" + Game.time;
    const harvesters = harvester.getAll();
    if(harvesters.length < 3) {
        harvester.spawn(harvesterName, "Spawn1");
    }
    
    for(const i in harvesters) {
        const creep = harvesters[i];
        harvester.run(creep, "Spawn1");
    }
}

function handleUpgraders() {
    const upgraderName = "Upgrader-" + Game.time;
    const upgraders = upgrader.getAll();
    if(upgraders.length < 3) {
        upgrader.spawn(upgraderName, "Spawn1");
    }
    
    
    for(const i in upgraders) {
        const creep = upgraders[i];
        upgrader.run(creep, "Spawn1");
    }
}

module.exports.loop = function () {
    handleHarvesters();
    handleUpgraders();
}
