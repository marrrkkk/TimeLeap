const { Client, Message } = require('discord.js')
module.exports = {
    name: 'messageCreate',
    once: false,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client){
        if(message.author.id == client.user.id){
            let sent = await client.db.get("sent")
            if(!sent){
                await client.db.set("sent", 1)
            } else {
                await client.db.add("sent", 1)
            }
        }

        if(message.author.bot) return
        let ch = await client.db.get(`channel_${message.guild.id}.${message.channel.id}`)
        if(ch == true) return
        message.channel.messages.fetch({ limit: 100 }).then(ms => {
            let msgs = ms.filter(m => !m.author.bot && !m.deleted).values()
            msgs = Array.from(msgs)
            if(msgs.length > 0){
                let index = Math.floor(Math.random() * msgs.length)
                if(index == 0) index++
                if(index == msgs.length) index--
                msg = msgs[index]
                let attachment = msg.attachments.values()
                attachment = Array.from(attachment)
                if(Math.floor(Math.random() * 10) == 3){
                    message.channel.send({ content: msg.content, files: attachment }).catch(e => console.log(e))
                }
            }
        })
    }
}