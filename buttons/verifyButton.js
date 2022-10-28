const { Client, ButtonInteraction, PermissionOverwrites, PermissionFlagsBits, ChannelType, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js')
const { verifyRole } = require('../settings/config')
module.exports = {
    name: 'verify',
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     */
    
    run: async (client, interaction) => {
        interaction.member.roles.add(verifyRole)
        interaction.reply({
            content: `You are verified now! You gained access to this server and <@&${verifyRole}> role !!`,
            ephemeral: true
        })
    }
}