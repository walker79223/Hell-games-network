const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('say what you want to say')
        .addStringOption(op => op.setName('text').setDescription('enter you want to say !!')),
        userPermissions: [PermissionFlagsBits.Administrator],
        category: '', 
        userRoles: [],
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
	run: async (client, interaction) => {
        const whatToSay = interaction.options.getString('text')
        interaction.reply({
            content : whatToSay
        })
	},
};