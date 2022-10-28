const { Client, ButtonInteraction, PermissionOverwrites, PermissionFlagsBits, ChannelType, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js')
const { channels } = require('..')
const { ticketParent, ticketLogChannel } = require('../settings/config')
module.exports = {
    name: 'open-ticket',
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const ticketChannelId = (Math.floor(Math.random() * 1000000000) + 9999999999)
        if (interaction.guild.channels.cache.find((channel) => channel.name === `ticket-${interaction.member.id}`)) {
            return interaction.reply({
                content: `Your ticket is already in use !!`,
                ephemeral: true
            })
        }

        const chl = interaction.guild.channels.create({
            name: `ticket-${interaction.member.id}`,
            parent: ticketParent,
            topic : `channel id: ${ticketChannelId}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.member.id,
                    allow: [PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.AddReactions,
                    PermissionFlagsBits.AttachFiles,
                    PermissionFlagsBits.EmbedLinks]
                },
                {
                    id: interaction.guild.roles.everyone.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                },

            ]
        }).then(chl => {

            const row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder().setCustomId('ticket-operations').setPlaceholder('Please Select something').addOptions([
                    {
                        label: 'Delete',
                        description: "Deletes the ticket !!",
                        value: "delete-ticket",
                        emoji: '🔴'
                    },
                    {
                        label: 'Close',
                        description: "Closes the ticket !!",
                        value: "close-ticket",
                        emoji: '🟡'
                    },
                    {
                        label: 'Open',
                        description: "Opens the ticket !!",
                        value: "open-ticket",
                        emoji: '🟢' 
                    }

                ])
            )

            const logEmbed = new EmbedBuilder()
            .setTitle(`${interaction.user.tag}`).
            setDescription(`A new ticket has been opened by ${interaction.user.tag}`)
            .setColor("Green")

            interaction.reply({
                content: `Your channel has been created in ${chl}`,
                ephemeral: true,
            })
            chl.send({
                content: `Hey ${interaction.member}!! You have successfully created a ticket`,
                components: [row]
            })
            const logChannel = interaction.guild.channels.cache.get(ticketLogChannel);
            if(logChannel){
                logChannel.send({
                    embeds: [logEmbed]
                })
            }
        })
        


        module.exports = ticketChannelId
    }
}