const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('')
		.setDescription(''),
        userPermissions: [PermissionFlagsBits.Administrator],
        userRoles: [],
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
    category: '', 
	run: async (client, interaction) => {
        // Code
	},
};