const harvester = require('role.harvester');
const ROLE_NAME = "builder";

function run(creep) {
    if(harvester.shouldHarvestEnergy(creep)) {
        harvester.harvestEnergy(creep);
    } else {
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target) {
            if(creep.build(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
}

module.exports = {
    ROLE_NAME,
    run
};