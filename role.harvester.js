/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

const ROLE_NAME = "harvester";
const SPAWN_POINT = "Spawn1";

module.exports = {
    ROLE_NAME: ROLE_NAME,
    // peroforms all of the logic for a harvester.
    // - fetches energy.
    // - brings energy back to spawn.
    run(creep) {

        // if the creep doesn't have any energy, make it go and find some
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        // make the creep transfer the energy to the spawn point.
        else {
            if( creep.transfer(Game.spawns[SPAWN_POINT], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
                creep.moveTo(Game.spawns[SPAWN_POINT]);
            }
        }
    }
};