module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then( async (m) => {
      const channel = message.mentions.channels.first()
      const channelid = channel.id
      const guildid = message.guild.id
         await knex('event').update({ welcomechannelid: channelid }).where({ guildid: guildid })
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.welcomechannel.this,
            locale.commands.welcomechannel.return.bind({
              name: channel,
            })
          )
          m.edit({ embed: embed })
        })
    })
  }
  module.exports.props = {
    name: "welcomechannel",
    perms: "admin",
    alias: ["입장채널", "welcomechannel"],
    args: [
      {
        name: 'mention',
        type: 'channel',
        required: false
    }
    ],
  }