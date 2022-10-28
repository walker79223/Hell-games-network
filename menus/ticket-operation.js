const { Client, SelectMenuInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ticketChannelId = require('../buttons/ticket-open');
const { ticketLogChannel } = require('../settings/config');
module.exports = {
	name: 'ticket-operations',
	/**
	 * 
	 * @param {Client} client 
	 * @param {SelectMenuInteraction} interaction 
	 */
	run: async (client, interaction) => {
		if (interaction.values[0] === 'delete-ticket') {
			interaction.reply({
				content: "This ticket will delete in 5 seconds",
				ephemeral: true
			}).then(() => {
				setTimeout(() => {
					interaction.channel.delete()
					interaction.member.send("Your ticket has been deleted successfully. Thanks for contacting the staff !!")
				}, 5000);
			})
			const delTicketEmbed = new EmbedBuilder().setTitle(`${interaction.user.tag}`)
				.setDescription(`A ticket has been deleted`)
				.setColor("Red")
				.setFooter({
					text: `${interaction.channel.topic} `
				})
			const logChannel = interaction.guild.channels.cache.get(ticketLogChannel);
			if (logChannel) {
				logChannel.send({
					embeds: [delTicketEmbed]
				})
			}
		}

		if (interaction.values[0] === 'close-ticket') {
			if (!interaction.channel.permissionsFor(interaction.member).has(PermissionFlagsBits.SendMessages)) {
				return interaction.reply({
					content: "Your ticked is already closed !!",
					ephemeral: true
				})
			}
			interaction.reply({
				content: "Your ticked will close in 5 seconds !!",
				ephemeral: true
			}).then(() => {
				setTimeout(() => {
					interaction.channel.permissionOverwrites.edit(interaction.member.id,
						{
							SendMessages: false
						}
					)
				}, 5000);

			})
			const ticketCloseEmbed = new EmbedBuilder().setTitle(`${interaction.user.tag}`)
				.setDescription(`A ticket has been closed which was opened by ${interaction.user.tag}`)
				.setColor("Yellow")
				.setFooter({
					text: `${interaction.channel.topic} `
				})
			const logChannel = interaction.guild.channels.cache.get(ticketLogChannel);
			if (logChannel) {
				logChannel.send({
					embeds: [ticketCloseEmbed]
				})
			}
		}

		if (interaction.values[0] === 'open-ticket') {
			if (interaction.channel.permissionsFor(interaction.member).has(PermissionFlagsBits.SendMessages)) {
				return interaction.reply({
					content: "Your ticked is already opened !!",
					ephemeral: true
				})
			}
			interaction.reply({
				content: "Your ticked will reopen in 5 seconds !!",
				ephemeral: true
			})

			const ticketReopenEmbed = new EmbedBuilder().setTitle(`${interaction.user.tag}`)
				.setDescription(`A ticket has been reopened which was opened by ${interaction.user.tag}`)
				.setColor("Green")
				.setFooter({
					text: `${interaction.channel.topic} `
				})
			const logChannel = interaction.guild.channels.cache.get(ticketLogChannel);
			if (logChannel) {
				logChannel.send({
					embeds: [ticketReopenEmbed]
				})
			}
			setTimeout(() => {
				interaction.channel.permissionOverwrites.edit(interaction.member.id,
					{
						SendMessages: true
					}
				)
			}, 5000);

		}

	}
}