const { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('block')
    .setDescription('Block me from a specific channel')
    .addChannelOption(option => 
        option
        .setName('channel')
        .setDescription('Select a channel')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "Only admins are allowed to use this command", ephemeral: true })

        const channel = interaction.options.getChannel('channel');
        let ch = await client.db.get(`channel_${interaction.guild.id}.${channel.id}`)
        if(!ch){
            const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setDescription(`${channel} added to blacklisted`)
            await client.db.set(`channel_${interaction.guild.id}.${channel.id}`, true)
            await interaction.reply({ embeds: [embed] })
        } else if (ch == true) {
            const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`${channel} is already in the blacklist`)
            await interaction.reply({ embeds: [embed] })
        }
    }
}