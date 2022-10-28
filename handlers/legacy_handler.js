const fs = require('fs');

module.exports = async (client) => {
    try {
        fs.readdirSync("./commands/legacy")
            .forEach((file) => {
                let commands = fs.readdirSync(`./commands/legacy/${file}`)
                    .filter(file => file.endsWith(".js"))

                for (const cmd of commands) {
                    let command = require(`../commands/legacy/${file}/${cmd}`);
                    if(command.name){
                        client.lcommands.set(command.name, command)
                    }else{
                        console.log(`${cmd} is not ready !!`);
                    }
                }
            })
            console.log(`${client.lcommands.size} Legacy Commands loaded !!`);
    } catch (error) {
        console.log(error);
    }

}
