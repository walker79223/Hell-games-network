const DJS = require('discord.js');
const {GatewayIntentBits, Partials, Collection}= require('discord.js');
const {token}  = require('./settings/config')
require('dotenv').config()
const client = new DJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildPresences,

    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.User,
    ]
})

module.exports = client
client.events = new Collection()
client.scommands = new Collection()
client.lcommands = new Collection()
client.buttons = new Collection()
client.selectMenus = new Collection()

const allHandlers = ["event_handler", "command_handler", "legacy_handler", "button_handler", "menu_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
})
client.login(token)
