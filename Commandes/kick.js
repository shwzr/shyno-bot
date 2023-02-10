const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Expulser un membre du serveur",
    permission: Discord.PermissionFlagsBits.KICK_MEMBERS,
    dm: false,
    options: [
      {
        type: "user",
        name: "utilisateur",
        description: "L'utilisateur à expulser",
        required: true
      },
      {
        type: "string",
        name: "raison",
        description: "La raison de l'expulsion",
        required: true
      }
    ],
    async run(bot, message, args) {
    let user = args.getUser("utilisateur");
    if (!user) return message.reply("Pas d'utilisateur !");
    let member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply("L'utilisateur n'est pas sur ce serveur !");
    let reason = args.getString("raison");
    if (!reason) reason = "Pas de raison fournie.";
    try {
      await member.send(
        `Tu as été expulsé du serveur par ${message.author.tag} pour la raison : \`${reason}\``
      );
    } catch (err) {}
    await message.reply(
      `${message.author} a expulsé ${member.user.tag} pour la raison : \`${reason}\``
    );
    await member.kick(reason);
  }
};
