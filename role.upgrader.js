const harvester = require('role.harvester');

const ROLE_NAME = "upgrader";

function run(creep) {
    if(harvester.shouldHarvestEnergy(creep)) {
        harvester.harvestEnergy(creep);
    }
    // make the creep upgrade.
    else {
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
}

module.exports = {
    ROLE_NAME,
    run
};