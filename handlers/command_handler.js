const fs = require('fs');
const { Client } = require('discord.js');
const { guildID } = require('../settings/config');
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    try {
        const arrOfCommands = [];
        fs.readdirSync("./commands/slash")
            .forEach((file) => {
                let commands = fs.readdirSync(`./commands/slash/${file}`).filter(file => file.endsWith(".js"))

                for (const cmd of commands) {
                    let command = require(`../commands/slash/${file}/${cmd}`);
                    if(command.data.name){
                        client.scommands.set(command.data.name, command)
                        arrOfCommands.push(command.data.toJSON());
                    }else{
                        console.log(`${cmd} is not ready !!`);
                    }
                }
            })
            console.log(`${client.scommands.size} Slash Commands loaded !!`);

            client.on('ready', () => {
                client.guilds.cache.get(guildID).commands.set(arrOfCommands);
            })

    }

    catch (error) {
        console.log(error);
    }

}
