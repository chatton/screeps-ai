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

function shouldHarvestEnergy(creep) {
    return creep.store[RESOURCE_ENERGY] < creep.store.getCapacity();
}

function harvestEnergy(creep) {
    // TODO: pick up energy if it's on the ground
    const source = creep.pos.findClosestByRange(FIND_SOURCES);
    if(source) {
        if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
}

// performs all of the logic for a harvester.
// - fetches energy.
// - brings energy back to spawn.
function run(creep){
    // if the creep doesn't have any energy, make it go and find some
    if(shouldHarvestEnergy(creep)) {
        harvestEnergy(creep);
    }
    // make the creep transfer the energy to the spawn point.
    else {
        if( creep.transfer(Game.spawns[SPAWN_POINT], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
            creep.moveTo(Game.spawns[SPAWN_POINT]);
        }
    }
}

module.exports = {
    ROLE_NAME,
    harvestEnergy,
    shouldHarvestEnergy,
    run
};