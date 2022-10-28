const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('report a member or report a bug to developers')
        .addStringOption(op => op.setName('category').setRequired(true)
        .setDescription('choose report category').addChoices(
                { name: 'Minecaft Player', value: 'minecraft' },
				{ name: 'Member', value: 'member' },
				{ name: 'Bugs', value: 'bugs' },
        ))

        
        .addStringOption(p => p.setName('describe').setDescription('Please describe the issue you are reporting').setRequired(true))
        .addAttachmentOption(d => d.setName('evidence').setDescription('Show us the evidence you are reporting').setRequired(true))

        .addStringOption(reason => reason.setName('reason')
        .setDescription('please enter the reason to report')
        .addChoices(
            { name: 'Abuse', value: 'abuse' },
            { name: 'Hacking', value: 'hacking' },
            { name: 'Flying ', value: 'fyling' },
            { name: 'Advertising ', value: 'advertising' },
        ))
        .addStringOption(player => player.setName('player').setDescription('Enter the name of the player to be reported')),
        userPermissions: [PermissionFlagsBits.SendMessages],
        userRoles: [],
        category: 'utils', 
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
	run: async (client, interaction) => {
        const category = interaction.options.getString('category')
        let reason = interaction.options.getString('reason')
        const describes = interaction.options.getString('describe')
        let  attachments = interaction.options.getAttachment('evidence')
        const logChannel = interaction.guild.channels.cache.get("1034907774993305682")
        let player = interaction.options.getString('player')
        const confirmButtons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('confirm').setLabel('Confirm').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('deny').setLabel('Cancel').setStyle(ButtonStyle.Danger),
        )

        const logEmbed = new EmbedBuilder().setColor('Random')
        .setTitle("Report by members of server")
        .setDescription(`Report made by **${interaction.user.username}**.\nYour report category : **${category}**\nDue to reason : **${reason === null ? reason = "Not provided" : reason}**\nDescribed as : **${describes}**\nPlayer tag : **${player === null ? player = 'Not Provided' : player}**\nEvidence :`).setImage(attachments.url)
        .setAuthor({name: `Report by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({extension:'png'})})

        
        interaction.reply({
            content: `Your report category : **${category}**\nYour reporting reason : **${reason}**\nYou described your issue as : **${describes}**\nPlayer tag : **${player === null ? player = 'Not Provided' : player}**\nEvidence (optional) : **${attachments.url}**\n**Is this info okay ? You can use these button only once !!**`,
            ephemeral: true,
            components: [confirmButtons]
        })

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 1000 * 60,
            max: 1
        })
        collector.on('collect', async(i) => {
            i.deferUpdate()
            if(i.customId === 'confirm'){
                await logChannel.send({embeds: [logEmbed]})
                i.followUp({content: "Your report has been submitted successfully !!", ephemeral: true})
            }
            if(i.customId === 'deny'){
                i.followUp({content: "Your report has been cancelled !!", ephemeral: true})
            }
        })
	},
}