/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

const ROLE_NAME = "harvester";

module.exports = {
    
    // peroforms all of the logic for a harvester.
    // - fetches energy.
    // - brings energy back to spawn.
    run(creep, spawnPoint) {
        
        // if the creep doesn't have any energy, make it go and find some
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        // make the creep transfer the energy to the spawn point.
        else {
            if( creep.transfer(Game.spawns[spawnPoint], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(Game.spawns[spawnPoint]);
            }
        }
    },
    
    // spawn a harvester at the given spawn point.
    spawn(harvesterName, spawnPoint){
        return Game.spawns[spawnPoint].spawnCreep( [WORK, CARRY, MOVE], harvesterName, { memory: ROLE_NAME });
    },
    
    // returns all harvesters.
    getAll() {
        return _.filter(Game.creeps, {memory: ROLE_NAME});
    }
};