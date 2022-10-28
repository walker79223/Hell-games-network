const fs = require('fs');
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    try {
        fs.readdirSync("./events")
            .filter((file) => file.endsWith(".js"))
            .forEach((file) => {
                let event = require(`../events/${file}`)
                client.events.set(event, event)
                
            })
            console.log(`${client.events.size} Events are being listened !!`);
        }
    catch (error) {
        console.log(error);
    }
}