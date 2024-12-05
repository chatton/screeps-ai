const harvester = require('role.harvester');
const upgrader = require('role.upgrader');

function spawn(creepType, spawnPointName){

    const spawnPoint = Game.spawns[spawnPointName];
    const creepName = creepType + "-" + Game.time;

    switch (creepType) {
        case harvester.ROLE_NAME:
            spawnPoint.spawnCreep( [WORK, CARRY, MOVE], creepName, { memory: creepType });
            break;
        case upgrader.ROLE_NAME:
            spawnPoint.spawnCreep( [WORK, CARRY, MOVE], creepName, { memory: creepType });
            break;
        default:
            console.log("Unknown creep type: " + creepType);
    }
}

module.exports = spawn;