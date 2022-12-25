module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client){
        let commands = await client.db.get("commands")
        if(!commands){
            await client.db.set("commands", 1)
        } else {
            await client.db.add("commands", 1)
        }
    }
}