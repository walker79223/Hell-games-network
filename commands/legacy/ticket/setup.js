const { Client, Message, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'setup', 
    description: 'ticket setup !!',
    userPermissions: [PermissionFlagsBits.Administrator],
    /**
     * @param {Client} client 
     * @param {Message} message     
     * @param {String[]} args     
     */
    run: async(client, message, args) => {
        message.delete()
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('open-ticket')
            .setLabel('Open A New Ticket')
            .setStyle(ButtonStyle.Primary)
        )

        const embed = new EmbedBuilder()
        .setTitle('Open a Ticket')
        .setDescription('Click the button to ceate a new ticket and contact the server staff !!')
        .setColor("LuminousVividPink")

        message.channel.send({
            components: [row],
            embeds: [embed]
        })
        
    }
}