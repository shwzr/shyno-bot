const Discord = require("discord.js")

module.exports = {
    name: "dm",
    description: "Envoie un message privé à un membre",
    permission: Discord.PermissionFlagsBits.SendMessages,
    dm: true,
    options: [
        {
        type: "user",
        name :"membre",
        description: "Le membre à envoyer le message",
        required: true,
        }, {
        type: "string",
        name: "message",
        description: "Le message à envoyer",
        required: true,
        }
    ],
    
async run(bot, message, args) {
    try {
    let user = await bot.users.fetch(args._hoistedOptions[0].value)
    if(!user) return message.reply("Pas de membre à envoyer le message !")
    let messageToSend = args.get("message").value;
    if(!messageToSend) return message.reply("Pas de message à envoyer !")
    await user.send(messageToSend);
    await message.reply(`Le message a été envoyé à ${user.tag} : ${messageToSend}`)
    } catch(err) {
    if (err.code === 50007) {
    return message.reply("Impossible d'envoyer le message privé car l'utilisateur a fermé ses messages privés !")
        }
         return message.reply("Impossible d'envoyer le message privé !")
        }
    }
}
