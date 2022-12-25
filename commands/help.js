const { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");
const { emojis } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Guide and Command list'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Guide')
            .addOptions(
                {
                    label: 'Starter',
                    value: 'starter'
                },
                {
                    label: 'Commands',
                    value: 'commands'
                }
            )
        )

        const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
        .setTitle('Starter')
        .addFields({ name: '__How this works?__', value: 'Timeleap randomly reply to messages using the previous message from the channel, you can try to spam to see if its works.' })
        .addFields({ name: '__How to block Timeleap from replying on certain channel?__', value: 'You can use the command `/exclude` and select a channel that you want to block and use `/include` to unblock.'})
        .setColor('#FFD4B2')

        const commands = new EmbedBuilder()
        .setTitle('Commands')
        .setDescription(`__/block__ - Block me from a certain channel\n__/unblock__ - unblock me if you have blocked me previously\n__/about__ - Information about me\n__/define__ - seach a word in urban dictionary\n__/gender__ - Guess your gender`)
        .setColor('#FFD4B2')

        let msg = await interaction.reply({ embeds: [embed], components: [row] })
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect })

        collector.on('collect', async i => {
            const value = i.values[0]
            if(!i.user.id == interaction.user.id) return await i.reply({ content: 'This selection is not for you!', ephemeral: true })
            if(value == 'starter'){
                await i.update({ embeds: [embed] })
            } else if(value == 'commands'){
                await i.update({ embeds: [commands] })
            }
        })
    }
}
