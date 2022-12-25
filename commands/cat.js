const { SlashCommandBuilder, CommandInteraction, Client } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('My gf adore cats so I added this command'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        await axios.get('http://aws.random.cat/meow')
        .then(async (res) => {
            await interaction.reply({ content: res.data.file })
        })
    }
}