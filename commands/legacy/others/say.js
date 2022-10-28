const { Client, Message, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'say', 
    description: 'Say what you want !!',
    userPermissions: [PermissionFlagsBits.Administrator],
    /**
     * @param {Client} client 
     * @param {Message} message     
     * @param {String[]} args     
     */
    run: async(client, message, args) => {
        message.delete()
        
        const sayMsg = args.join(" ");
        if(!sayMsg) return message.reply({content: "Please provide a message to say !!"})
        message.channel.send(sayMsg)
        
    }
}