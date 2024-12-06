
// buildExtensionNearPosition builds an extension near an arbitrary position in the room.
function buildExtensionNearPosition(room, pos) {
    let extensionPos = new RoomPosition(pos.x - 1, pos.y + 1, room.name);
    let result = room.createConstructionSite(extensionPos, STRUCTURE_EXTENSION);

    switch(result) {
        case ERR_NOT_OWNER:
        case ERR_FULL:
        case ERR_RCL_NOT_ENOUGH:
            // if the room is full, it's not ours, or the controller is not leveled up enough, don't do anything.
            return false;
        case ERR_INVALID_TARGET:
            // it's possible to build an extension, but the position is wrong, modify the position
            // until we find one that works.
            while(room.createConstructionSite(extensionPos, STRUCTURE_EXTENSION) === ERR_INVALID_TARGET) {
                // build in line below the spawn site, won't work everywhere, can imrpove this tofind locations
                // in a smarter way.
                extensionPos.x += 1;
            }
    }
    return true;
}


// buildExtensionAtSpawnPoint builds an extension near a spawning point in the room.
function buildExtensionAtSpawnPoint(room) {
    for(const name in Game.spawns) {
        const spawnPoint = Game.spawns[name];
        if(spawnPoint.room === room){
            return buildExtensionNearPosition(room, spawnPoint.pos);
        }
    }
    return false;
}

function buildExtensionAtEnergySource(room) {

    // TODO: ensure that
    // - the extensions don't block paths
    // - the extensions are built further out
    const sources = room.find(FIND_SOURCES);
    const source = sources[sources.length-1];
    return buildExtensionNearPosition(room, source.pos);
}


// extensionForSpawn
function extensionInRoom(room, numExtensions){
    // TODO: limit spawns based on numExtensions
    if(buildExtensionAtEnergySource(room)) {
        return true;
    }

    if(buildExtensionAtSpawnPoint(room)) {
        return true;
    }

    return false;
}


module.exports = {
    extensionInRoom
};