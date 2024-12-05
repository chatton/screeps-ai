/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

const ROLE_NAME = "upgrader";

module.exports = {
    run(creep, spawnPoint) {
        console.log(creep);
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        // make the creep upgrade.
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    // spawn an upgrader at the given spawn point.
    spawn(upgraderName, spawnPoint){
        return Game.spawns[spawnPoint].spawnCreep( [WORK, CARRY, MOVE], upgraderName, { memory: ROLE_NAME });
    },
    
    // returns all upgraders.
    getAll() {
        return _.filter(Game.creeps, {memory: ROLE_NAME});
    }
};