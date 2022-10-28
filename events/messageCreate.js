const { EmbedBuilder, Collection } = require("discord.js");
const client = require("..");
prefix = "?"

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix)) {
    if (message.author.bot || !message.guild) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/);
    let cmd = args.shift()?.toLocaleLowerCase();
    command = client.lcommands.get(cmd);
    if (!command) {
      return message.channel.send({ content: "Commands doest exist !!" });
    }
    if (command) {
      if (!message.member.permissions.has(command.userPermissions || [])) {
        return message.reply({
          embeds: [new EmbedBuilder().setColor("Red").setTitle('Not Enought Permissions').setDescription(`** ❌ You don't Have enough permissions To Run This Command.. **`).setAuthor({
            name: message.member.user.tag,
            iconURL: message.member.user.displayAvatarURL({ extension: 'gif' })
          })],
        });
      }
      command.run(client, message, args)
    }
  }


}
)