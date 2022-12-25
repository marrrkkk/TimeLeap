const { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Information about me'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        let commands = await client.db.get("commands")
        let sent = await client.db.get("sent")
        let days = Math.floor(client.uptime / 86400000 )
        let hours = Math.floor(client.uptime / 3600000 ) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        
        const embed = new EmbedBuilder()
        .setTitle("About")
        .setDescription("Timeleap sends random messages from the previously sent messages in the same channel, this bot was inspired by the anime [The girl who leapt through time](https://myanimelist.net/anime/2236/Toki_wo_Kakeru_Shoujo), Makoto discovered that she can travel to the past and change her future")
        .addFields({ name: "Guilds", value: `[${client.guilds.cache.size} Servers\n${client.channels.cache.size} Channels\n${client.users.cache.size} Users](https://github.com/marrrkkk)`, inline: true})
        .addFields({ name: "Commands Executed", value: `[${commands || 0} commands](https://github.com/marrrkkk)`, inline: true})
        .addFields({ name: "Messages Sent", value: `[${sent || 0} messages](https://github.com/marrrkkk)`, inline: true})
        .addFields({ name: "Uptime", value: `[${days}d ${hours}h ${minutes}m](https://github.com/marrrkkk)`, inline: true})
        .setColor('#FFD4B2')
        .setThumbnail('https://media.giphy.com/media/ON0VRa1q2xMFW/giphy.gif')
        .setFooter({ text: "Developed by markk#1312", iconURL: 'https://cdn.discordapp.com/attachments/1048218971524055040/1054701531116605470/h.png'})

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}