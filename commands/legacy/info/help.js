const { Client, Message, Collector, PermissionFlagsBits, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require("discord.js");
const ms = require('ms');
module.exports = {
    name: 'help', 
    description: 'all legacy commands !!',
    userPermissions: [PermissionFlagsBits.SendMessages],
    /**
     * @param {Client} client 
     * @param {Message} message     
     * @param {String[]} args     
     */
    run: async(client, message, args) => {
        message.delete()
        const Embed = new EmbedBuilder().setTitle('All Legacy Commands').setColor('Random')
        .setDescription(`${client.lcommands.map(a => a).map(name => `\`${name.name}\``).toString()}`)
        message.channel.send({
            embeds: [Embed]
        })
    }
} 