module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    knex,
    props,
    data
  ) => {
    var u = (
      await knex
          .select('*')
          .from('total')
          .where({ user: "유저" })
  )[0]
    if (
      (await knex.select("*").from("users").where({ id: message.author.id }))
        .length > 0
    ) {
      return message.reply(
        locale.commands.register.message.bind({
          contact: locale.commands.register.contact,
        })
      )
    } else {
      if (data.register.includes(message.author.id))
        return message.reply(locale.error.process)
      embed.setDescription(locale.commands.register.yet)
      embed.addField(
        locale.commands.register.register,
        locale.commands.register.start
      )
      embed.addField(
        locale.commands.register.tos,
        "[{to}]({tos})".bind({
          tos: locale.commands.link.tos,
          to: locale.commands.register.to,
        }),
        true
      )
      let today = new Date();
      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월 
      let date = today.getDate();  // 날짜
      const time = year + '년 ' + month + '월 ' + date + '일 '  
      const filter = (m) =>
        m.content === locale.commands.register.code &&
        m.author.id === message.author.id
      data.register.push(message.author.id)
      await message.channel.send(embed)
      message.channel
        .awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
        .then(async (collected) => {
          if (!collected) {
            await data.register.splice(
              data.register.indexOf(message.author.id),
              1
            )
            await message.reply(locale.commands.register.timeout)
          }
          await data.register.splice(data.register.indexOf(message.author.id), 1)
          await knex
            .insert({
              name: message.author.username,
              id: message.author.id,
              enter: Math.round(new Date() / 1000),
              money: 0,
              command: 0,
              time: time,
            })
            .from("users")
            await knex.update({ users: Number(u['users']) + 1}) .where({ user: "유저" }).from('total')
            let total = date - 1
            const yesterday = year + '년 ' + month + '월 ' + total + '일'
            await knex('daily').insert({ id: message.author.id, time: yesterday, level: 0}) 
          return message.reply(locale.commands.register.thanks)
        })
        .catch(async (collected) => {
          console.log(collected)
          await data.register.splice(data.register.indexOf(message.author.id), 1)
          await message.reply(locale.commands.register.timeout)
        })
    }
  }
  module.exports.props = {
    name: "register",
    perms: "general",
    alias: ["가입", "등록"],
    args: [],
    hide: true,
  }