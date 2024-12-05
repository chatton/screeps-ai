const util = require("util");
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const spawn = require("spawner");

const SPAWN_POINT = "Spawn1";

const runFns = {
    "harvester": harvester.run,
    "upgrader": upgrader.run
}


function clearDeletedCreepMemory() {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

function handleSpawning(){
    const harvesters = util.getAll(harvester.ROLE_NAME);
    if(harvesters.length < 3) {
        spawn(harvester.ROLE_NAME, SPAWN_POINT);
    }

    const upgraders = util.getAll(upgrader.ROLE_NAME);
    if(upgraders.length < 3) {
        spawn(upgrader.ROLE_NAME, SPAWN_POINT);
    }
}

function handleCreeps() {
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        runFns[creep.memory](creep);
    }
}

module.exports.loop = function () {
    clearDeletedCreepMemory();
    handleSpawning();
    handleCreeps()
}
