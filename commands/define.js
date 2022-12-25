const { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('define')
    .setDescription('Search up a word from urban dictionary')
    .addStringOption(option => 
        option
        .setName('word')
        .setDescription('What word do you want to search for?')
        .setRequired(true)
        ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        let word = interaction.options.getString('word')
        word = encodeURIComponent(word)

        const {
            data: {list}
        } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${word}`)

        const [answer] = list
        if(!answer) return interaction.reply(`Couldn't find the word ${word}`)

        const embed = new EmbedBuilder()
        .setTitle(`${word}`)
        .setDescription(`${answer.definition}\n\n**Example**\n${answer.example}`)
        .setColor('Random')

        const embed2 = new EmbedBuilder()
        .setTitle(`${word}`)
        .setDescription(`${answer.definition}`)
        .setColor('Random')
        
        if(answer.example){
            return await interaction.reply({ embeds: [embed] })
        } else {
            return await interaction.reply({ embeds: [embed2] }) 
        }

    }
}