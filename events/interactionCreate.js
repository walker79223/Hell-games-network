const client = require("..");
const cooldowns = new Map();

const { InteractionType, EmbedBuilder, PermissionFlagsBits, Collection } = require('discord.js')
client.on('interactionCreate', async (interaction) => {


  if (interaction.type === InteractionType.ApplicationCommand) {
    command = client.scommands.get(interaction.commandName)
    // Command interaction Handler
    try {
      if (command) {
        if (!interaction.member.permissions.has(command.userPermissions || [])) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setColor("Aqua").setTitle('Not Enough Permissions').setDescription(`** ❌ You don't Have enough permissions To Run This Command.. **`).setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ extension: 'gif' })
            })],
            ephemeral: true
          });
        }
        else {
          await command.run(client, interaction)
        }
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "An error occured while executing this **command** !!",
        ephemeral: true
      })
    }
  }

  // Buttons interaction Handler
  try {
    if (interaction.type === InteractionType.MessageComponent) {
      if (client.buttons.has(interaction.customId)) {

        const button = client.buttons.get(interaction.customId)
        await button.run(client, interaction)
      }
    }
  } catch (error) {
    console.log(error);
    await interaction.reply({
      content: "An error occured while executing this **button** !!",
      ephemeral: true
    })
  }

  // Menus interaction Handler
  try {
    if (interaction.type === InteractionType.MessageComponent) {
      if (client.selectMenus.has(interaction.customId)) {

        const menu = client.selectMenus.get(interaction.customId)
        await menu.run(client, interaction)
      }
    }
  } catch (e) {
    console.log(e);
    await interaction.reply({
      content: "An error occured while executing this **menus** !!",
      ephemeral: true
    })
  }
})