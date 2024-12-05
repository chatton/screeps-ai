const util = require("util");
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const spawn = require("spawner");

const SPAWN_POINT = "Spawn1";

function clearDeletedCreepMemory() {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

function handleHarvesters() {
    const harvesters = util.getAll(harvester.ROLE_NAME);
    if(harvesters.length < 3) {
        spawn(harvester.ROLE_NAME, SPAWN_POINT);
    }

    for(const i in harvesters) {
        const creep = harvesters[i];
        harvester.run(creep);
    }
}

function handleUpgraders() {
    const upgraders = util.getAll(upgrader.ROLE_NAME);
    if(upgraders.length < 3) {
        spawn(upgrader.ROLE_NAME, SPAWN_POINT);
    }

    for(const i in upgraders) {
        const creep = upgraders[i];
        upgrader.run(creep);
    }
}


module.exports.loop = function () {
    clearDeletedCreepMemory();
    handleHarvesters();
    handleUpgraders();
}
