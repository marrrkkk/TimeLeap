const { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gender')
    .setDescription('Are you a male? or a female?')
    .addStringOption(option => 
        option
        .setName('name')
        .setDescription('Who?')
        .setRequired(true)
        ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const name = await interaction.options.getString('name')
        await axios.get(`https://api.genderize.io/?name=${name}`)
        .then(async (res) => {
            const male = new EmbedBuilder()
            .setTitle(`${name}`)
            .setDescription(`Gender: ${res.data.gender || '???'}\nProbability: ${Math.floor(res.data.probability*100)}%`)
            .setColor('Blurple')

            const female = new EmbedBuilder()
            .setTitle(`${name}`)
            .setDescription(`Gender: ${res.data.gender || '???'}\nProbability: ${Math.floor(res.data.probability*100)}%`)
            .setColor('#FFC0CB')

            if(res.data.gender == 'male'){
                await interaction.reply({ embeds: [male] })
            } else {
                await interaction.reply({ embeds: [female] })
            }
        })

    }
}