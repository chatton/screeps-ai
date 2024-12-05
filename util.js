module.exports = {
    getAll(creepType) {
        return _.filter(Game.creeps, {memory: creepType});
    }
}