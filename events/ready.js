const { ActivityType } = require("discord.js");
const client = require("..");

prefix = "?"
client.on('ready', async () => {
    console.log(`bot logged in as ${client.user.username}`);
    const statusArray = [
        `Over ${client.guilds.cache.size} Servers`,
        `Hell Games Network !!`,
        `The prefix is '${prefix}'`,
        `This bot is Cool AF`,
        `coding tutorials`,
        `gaming videos`,
        `A horror movie`,
        `Enemies Cry`,
        `Nerds`,

    ]
    let index = 0;
    setInterval(() => {
        if (index === statusArray.length) index = 0;
        const status = statusArray[index]
        client.user.setActivity(status, { type: ActivityType.Watching })
        index++;
    }, 5000)
    client.user.setStatus('dnd')
})