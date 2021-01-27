module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then( async (m) => {
      const before = (await knex("guilds").where({ id: message.guild.id }))[0].prefix
      let after = message.data.arg[0]
      if(after.endsWith("야")) after = (`${message.data.arg[0]} `) // 추후 수정 예정, 임시방편(띄어쓰기)
      if(!after) return m.edit('설정할 접두사를 적어주세요!')
      if(after >= 6) return m.edit('접두사를 6글자 이내로 정해주세요!')
        knex("users")
        .select("*")
        .limit(1)
        .then( async () => {
          embed.addField(
            locale.commands.prefix.this,
            locale.commands.prefix.return.bind({
                before: before,
                after: after,
            })
          )
            await knex('guilds').update({ prefix: after }).where({ id: message.guild.id })
          m.edit({ content: message.member, embed })
        })
    })
  }
  module.exports.props = {
    name: "prefix",
    perms: "general",
    alias: ["접두사", "prefix"],
    args: [],
  }