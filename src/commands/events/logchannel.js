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
      if(!channel) return m.edit('로그채널로 설정할 채널을 맨션해주세요!')
      const channelid = channel.id
      const guildid = message.guild.id
         await knex('event').update({ logchannelid: channelid }).where({ guildid: guildid })
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.logchannel.this,
            locale.commands.logchannel.return.bind({
              name: channel,
            })
          )
          m.edit({ content: message.member, embed })
        })
    })
  }
  module.exports.props = {
    name: "logchannel",
    perms: "관리자",
    alias: ["로그채널", "logchannel"],
    args: [
      {
        name: 'mention',
        type: 'channel',
        required: false
    }
    ],
  }