module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then( async (m) => {
      const text = message.data.args
        if(!text) return m.edit(`메시지를 적어주세요\n올바른 사용법 : ${message.data.prefix}입장메시지 <메시지>`)
        await knex('event').update({ welcomemessage: text }).where({ guildid: message.guild.id })
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.welcomemessage.this,
            locale.commands.welcomemessage.return.bind({
              text: text,
            })
          )
  
          m.edit({ content: message.member,embed })
        })
    })
  }
  module.exports.props = {
    name: "welcomemessage",
    perms: "관리자",
    alias: ["입장메시지", "welcomemessage"],
    args: [
      {
        name: 'text',
        type: 'text',
        required: false
    }
    ],
  }