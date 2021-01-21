module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
  const prefix = require('../../config').client.prefix
    message.channel.send(locale.wait).then( async (m) => {
      const text = message.data.args
        if(!text) return m.edit(`메시지를 적어주세요\n올바른 사용법 : ${prefix}입장메시지 <메시지>`)
        await knex('event').update({ welcomechannelmessage: text }).where({ guildid: message.guild.id })
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
  
          m.edit({ embed: embed })
        })
    })
  }
  module.exports.props = {
    name: "welcomemessage",
    perms: "admin",
    alias: ["입장메시지", "welcomemessage"],
    args: [
      {
        name: 'text',
        type: 'text',
        required: false
    }
    ],
  }