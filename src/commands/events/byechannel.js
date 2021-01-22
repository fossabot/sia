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
         await knex('event').update({ byechannelid: channelid }).where({ guildid: guildid })
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.byechannel.this,
            locale.commands.byechannel.return.bind({
              name: channel,
            })
          )
          m.edit({ embed: embed })
        })
    })
  }
  module.exports.props = {
    name: "byechannel",
    perms: "관리자",
    alias: ["퇴장채널", "byechannel"],
    args: [
      {
        name: 'mention',
        type: 'channel',
        required: false
    }
    ],
  }