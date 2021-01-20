const Discord = require("discord.js")

module.exports = (client, message) => {
  const embed = new Discord.MessageEmbed()
  embed.setFooter(`${message.author.tag}`, message.author.avatarURL())
  embed.setTimestamp(new Date())
  embed.setColor("#93bfe6")
  return embed
}
