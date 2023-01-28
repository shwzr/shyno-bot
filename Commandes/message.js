const Discord = require("discord.js")

module.exports = {
    name: "message",
    description: "Envoie un message personnalisé dans un canal spécifié",
    permission: Discord.Permissions,
    dm: false,
    options: [
        {
            type: "channel",
            name :"canal",
            description: "Le canal où envoyer le message",
            required: true,
        }, {
            type: "string",
            name: "message",
            description: "Le message à envoyer",
            required: true,
        }
    ],
    async run(bot, message, args) {
        try{
            let channel = await bot.channels.fetch(args._hoistedOptions[0].value)
            let messageToSend = args.get("message").value
            if(!channel) return message.reply("Canal introuvable !")
            if(!messageToSend) return message.reply("Pas de message à envoyer !")
            channel.send(messageToSend)
        } catch(err) {
        }
    }
}
