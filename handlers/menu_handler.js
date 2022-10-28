const client = require("..");
const fs = require('fs');

module.exports = async(client) => {
    const menuFiles = fs.readdirSync("./menus").filter(f => f.endsWith('.js'))
    for(const file of menuFiles){
        const menu = require(`../menus/${file}`)
        if(menu.name){
            client.selectMenus.set(menu.name , menu)
        }
    }
    console.log(`Listening for ${client.selectMenus.size} menus`)
}