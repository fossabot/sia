module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
  const { prefix } = require('../../config').client
    message.channel.send(locale.wait).then( async (m) => {
      const text = message.data.args
        if(!text) return m.edit(`메시지를 적어주세요\n올바른 사용법 : ${prefix}<메시지>`)
        await knex('badwords').insert({ message: text })
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.addbadwords.this,
            locale.commands.addbadwords.return.bind({
              text: text,
            })
          )
          m.edit({ content: message.member,embed })
        })
    })
  }
  module.exports.props = {
    name: "addbadwords",
    perms: "개발자",
    alias: ["블랙단어추가", "addbadwords"],
    args: [
      {
        name: 'text',
        type: 'text',
        required: false
    }
    ],
    hide: true,
  }