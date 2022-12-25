const { Client } = require('discord.js')
module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client){
        await console.log(`Connected as ${client.user.tag}`)
    }
}