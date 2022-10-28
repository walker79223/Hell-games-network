const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Message } = require("discord.js");
const client = require("..");
const {  welcomeChannel } = require('../settings/config')

client.on('guildMemberAdd', async (member) => {
    const welcomeEmbed = new EmbedBuilder()
        .setTitle(`Welcome ${member.displayName}`)
        .setAuthor({
            name: member.user.tag,
            iconURL: member.user.avatarURL({ dynamic: true }),

        })
        .setDescription(`**➜ Know Our Server and Read Rules
<#1034741748221628476>
➜ Get roles
<#1034741723559100456> 
➜ Get Help
<#1034741764034150450> 
➜ Chat in
<#1034741751392522290> **`)
        .setImage('')
        .setColor('White')
        .setFooter({
            text: "Hell Games Network !!"
        })
    const welcomeButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Serevr Guide')
            .setURL('https://discord.com/channels/981871165591126096/981871167210127361'),

        new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Get Some Roles')
            .setURL('https://discord.com/channels/1002980518989672541/1034741723559100456')

    )
    member.guild.channels.cache.get(welcomeChannel).send({ content: `Greetings <@${member.id}> Welcome to Hell Games Network !!`, components: [welcomeButtons], embeds: [welcomeEmbed] })

       await member.send({ content: `Welcome <@${member.id}> in ${member.guild.name}`, components: [welcomeButtons], embeds: [welcomeEmbed] }).catch(() => null)


})