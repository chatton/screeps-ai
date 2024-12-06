const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

function spawn(creepType, spawnPointName){

    const spawnPoint = Game.spawns[spawnPointName];
    const creepName = creepType + "-" + Game.time;

    switch (creepType) {
        case harvester.ROLE_NAME:
        case upgrader.ROLE_NAME:
        case builder.ROLE_NAME:
            spawnPoint.spawnCreep( [WORK, CARRY, MOVE], creepName, { memory: { task: creepType } });
            break;
        default:
            console.log("Unknown creep type: " + creepType);
    }
}

module.exports = spawn;