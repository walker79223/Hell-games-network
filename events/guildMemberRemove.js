const client = require("..");
const {  exitChannel } = require('../settings/config')
client.on('guildMemberRemove', (member) => {
    member.guild.channels.cache.get(exitChannel).send({content: `<@${member.id}> has left !!`})
})