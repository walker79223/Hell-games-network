const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Tells you the bot latency !!'),
        // userPermissions: [PermissionFlagsBits.Administrator],
        // userRoles: ["990110288818864158", "993038331057291344"]
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
    category: 'basic',
	run: async (client, interaction) => {
        interaction.reply({
            content: "**Pong !! 🏓**",
            ephemeral: true
        }).then(() => {

            setTimeout(async () => {
                setTimeout(async() => {

                const msg = await interaction.editReply({
                    content: "Calculating My heart beat.....",
                    ephemeral: true,
                    fetchReply: true
                })
                    setTimeout(async () => {
                        let ping = msg.createdTimestamp - interaction.createdTimestamp
                        interaction.editReply({
                            content: `My heart beat: **${ping} ms**🛰️\nMy API heart beat: **${interaction.client.ws.ping} ms**🛰️`
                        })
                    }, 3200);

                }, 2500);

            })
        }, 2000);
	},
};