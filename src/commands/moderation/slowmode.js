module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex,
    args
  ) => {
            message.channel.send(locale.wait).then((m) => {    
            const num = message.data.arg[0]
            if(!num || isNaN(num)) return m.edit('슬로우 모드로 설정할 `숫자`를 `적어`주세요!')
            if(num >= 21601) return m.edit('0부터~21600 사이의 숫자를 써주세요!')
            message.channel.setRateLimitPerUser(Number(num))
            knex("users")
              .select("*")
              .limit(1)
              .then(() => {
                embed.addField(
                  locale.commands.slowmode.this,
                  locale.commands.slowmode.return.bind({
                  channel: message.channel,
                  number: num
                  })
                )
        
                m.edit({ content: message.member, embed })
            })
            }
        )}
  module.exports.props = {
    name: "slowmode",
    perms: "채널 관리하기",
    alias: ["슬로우모드", "slowmode"],
    args: [
    {
        name: 'count',
        type: 'number',
        required: false
    }
    ],
  }