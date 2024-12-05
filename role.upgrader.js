const ROLE_NAME = "upgrader";

module.exports = {
    ROLE_NAME: ROLE_NAME,
    run(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        // make the creep upgrade.
        else {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};