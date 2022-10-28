const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('DMs a user')
        .addMentionableOption(optionM => optionM.setName('person').setDescription('Enter users @ to send them a msg').setRequired(true))
        .addStringOption(option => option.setName('text').setDescription('Enter Text you want to send !!').setRequired(true)),
        userPermissions: [PermissionFlagsBits.Administrator],
        category: 'utils',
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        const userMention = interaction.options.getMentionable('person')
        const msgReply = interaction.options.getString('text')

        userMention.user.send({ content: msgReply }).then(() => {
            interaction.reply({
                content: `Message Sent to ${userMention}`,
                ephemeral: true
            })
        }).catch(() => {
            interaction.reply({
                content: `Cannot DM this user !!`,
                ephemeral: true,

            })
        })





    },
};