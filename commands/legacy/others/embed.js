const { Client, Message, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'embed', 
    description: 'Sends an embed',
    userPermissions: [PermissionFlagsBits.Administrator],
    /**
     * @param {Client} client 
     * @param {Message} message     
     * @param {String[]} args     
     */
    run: async(client, message, args) => {
        
        const targetChannel = message.mentions.channels.first()
        if(!targetChannel){
            message.channel.send("Please specify a channel to send an embed !!")
            return
        }

        args.shift()
        const json = JSON.parse(args.join(" "))
        
        targetChannel.send({
            embeds: [json]
        })
    }
}