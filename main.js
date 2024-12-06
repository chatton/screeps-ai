const util = require("util");

// import roles
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

// import functions
const spawn = require("spawner");
const build = require("build");

const SPAWN_POINT = "Spawn1";

const runFns = {
    "harvester": harvester.run,
    "upgrader": upgrader.run,
    "builder": builder.run,
}

const buildOrder = [harvester.ROLE_NAME, upgrader.ROLE_NAME, builder.ROLE_NAME];

const desiredRoleCount = {
    "harvester": 3,
    "upgrader": 3,
    "builder": 3
}

function clearDeletedCreepMemory() {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

function handleSpawning(){
    // TODO: modify the buildOrder if being attacked or short on specific type of worker etc.

    for (let role of buildOrder) {
        const currentCreeps = util.getAll(role);
        if(currentCreeps.length < desiredRoleCount[role]){
            spawn(role, SPAWN_POINT);
            return; // ensure the first one is spawned.
        }
    }
}

function handleBuilding() {
    build.extensionForSpawn(SPAWN_POINT, 5);
}

function handleCreeps() {
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        runFns[creep.memory.task](creep);
    }
}

module.exports.loop = function () {
    clearDeletedCreepMemory();
    handleSpawning();
    handleBuilding();
    handleCreeps()
}
