const { Client, Message, Collector, PermissionFlagsBits, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require("discord.js");
const ms = require('ms');
module.exports = {
    name: 'ping', 
    description: 'Ping of the bot !!',
    userPermissions: [PermissionFlagsBits.SendMessages],
    /**
     * @param {Client} client 
     * @param {Message} message     
     * @param {String[]} args     
     */
    run: async(client, message, args) => {
        message.delete()
        const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
                .setCustomId('ping')
                .setLabel('Calculate the Latency')
                .setStyle(ButtonStyle.Primary)
        ])
        const pingEmbed = new EmbedBuilder().setTitle('Pong 🚩!!')
        .setDescription('Use this button before 15 seconds and only who ran the command can use this button !!')
        .setColor('Blurple')
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({extension: "gif"})
        })
        const mainMsg = message.channel.send({
            components: [row],
            embeds: [pingEmbed]
        })
        collector = message.channel.createMessageComponentCollector({
            componentType: ComponentType.Button,
            max: 5,
            time: 1000 * 15
        })
        collector.on('collect', i => {
            if(i.user.id === message.author.id){
                i.reply({
                    content: `Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago **${client.ws.ping}ms** 🛰️`,
                    ephemeral: true
                })
            }else{
                i.reply({
                    content: `This button is not for you !!`,
                    ephemeral: true
                })
            }
        })
        // message.channel.send();
        setTimeout(async () => {
            (await mainMsg).delete()
        }, 1000 * 15);
        
    }
}