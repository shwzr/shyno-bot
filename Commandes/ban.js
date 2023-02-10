const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name :"membre",
            description: "Le membre à bannir",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "La raison du banissement",
            required: true,
        }
    ],
    async run(bot, message, args) {
        try{
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Pas de membre à bannir !")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.get("raison").value;
            if (!reason) {
                message.reply("Veuillez fournir une raison pour le bannissement.");
                return;
}

            if(message.user.id === user.id) return message.reply("Essaie pas de te bannir !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propriétaire du serveur !")
            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir ce membre !")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà ban !")

            try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})
        } catch(err) {
            return message.reply("Pas de membre à bannir !")
        }
    }
}
