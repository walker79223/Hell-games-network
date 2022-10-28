const client = require("..");
const fs = require('fs');

module.exports = async(client) => {
    const buttonFiles = fs.readdirSync("./buttons").filter(f => f.endsWith('.js'))
    for(const file of buttonFiles){
        const button = require(`../buttons/${file}`)
        if(button.name){
            client.buttons.set(button.name , button)
        }
    }
    console.log(`Listening for ${client.buttons.size} buttons`)
}