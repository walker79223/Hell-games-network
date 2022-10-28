const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes Mutliple Messages at once !!')
        .addNumberOption(option => option.setName('amount').setDescription('Enter the amout to delete the messages !!').setRequired(true)),
        userPermissions: [PermissionFlagsBits.Administrator],
        // modOnly: true,
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
    run: async (client, interaction) => {
        const amount =  parseInt(interaction.options.getNumber('amount'))
        const { size } = await interaction.channel.bulkDelete(amount, true)

        const reply = `Deleted ${size} Message(s)`;
        interaction.reply({
            content: reply,
            ephemeral: true
        })
    },
};