

// extensionForSpawn
function extensionForSpawn(spawnPointName, numExtensions){

    // TODO: limit spawns based on numExtensions

    const spawnPoint = Game.spawns[spawnPointName];
    const room = spawnPoint.room;
    const pos = spawnPoint.pos;
    let extensionPos = new RoomPosition(pos.x - 1, pos.y + 1, room.name);
    let result = room.createConstructionSite(extensionPos, STRUCTURE_EXTENSION);

    switch(result) {
        case ERR_NOT_OWNER:
        case ERR_FULL:
        case ERR_RCL_NOT_ENOUGH:
            // if the room is full, it's not ours, or the controller is not leveled up enough, don't do anything.
            return;
        case ERR_INVALID_TARGET:
            // it's possible to build an extension, but the position is wrong, modify the position
            // until we find one that works.
            while(room.createConstructionSite(extensionPos, STRUCTURE_EXTENSION) === ERR_INVALID_TARGET) {
                // build in line below the spawn site, won't work everywhere, can imrpove this tofind locations
                // in a smarter way.
                extensionPos.x += 1;
            }
    }
}


module.exports = {
    extensionForSpawn
};