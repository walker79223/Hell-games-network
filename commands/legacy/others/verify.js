const { Client, Message, Collector, PermissionFlagsBits, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require("discord.js");
const ms = require('ms');
module.exports = {
    name: 'verify', 
    description: 'Verify message',
    userPermissions: [PermissionFlagsBits.Administrator],
    cooldown: 20, // seconds 
    /**
     * @param {Client} client 
     * @param {Message} message     
     * @param {String[]} args     
     */
    run: async(client, message, args) => {
        message.delete()
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('verify').setLabel('Verify Me').setStyle(ButtonStyle.Primary)
        )
        const embed = new EmbedBuilder()
        .setTitle('Verification')
        .setColor('58b9ff')
        .setDescription(`**__Welcome to the server.__**

        **Tap on the Verified button to get verified.**
        
        
        > **You can also react with to get verified in the server.**
        
        > **Make sure to read the server rules once before start talking which you can find them here. <#1034741748221628476>**
        
        ❔ **What if the verification system is not working?** 
        
        ** - In such cases, you can dm our server admins or staff members to get quick help.**`)

            
                message.channel.send({
                    embeds: [embed],
                    components: [row]
                })

    }
}