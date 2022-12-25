const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('unblock')
    .setDescription('Unblock me if you have blocked me previously')
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
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            return await interaction.reply({ content: "Only admins are allowed to use this command.", ephemeral: true })
        }

        const channel = interaction.options.getChannel('channel');
        let ch = await client.db.get(`channel_${interaction.guild.id}.${channel.id}`)
        if(!ch || ch == false){
            const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`${channel} is not blacklisted`)
            await interaction.reply({ embeds: [embed] })
        } else if (ch == true) {
            await client.db.set(`channel_${interaction.guild.id}.${channel.id}`, false)
            const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`${channel} removed from the blacklist`)
            await interaction.reply({ embeds: [embed] })
        }
    }
}