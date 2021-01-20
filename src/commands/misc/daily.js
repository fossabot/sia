module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    let daily = (await knex("daily").where({ id: message.author.id }))[0]
    message.channel.send(locale.wait).then((m) => {
      const id = message.author.id
      let today = new Date();
      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월 
      let date = today.getDate();  // 날짜
      let total = date - 1
      const time = year + '년 ' + month + '월 ' + date + '일'
      const yesterday = year + '년 ' + month + '월 ' + total + '일'
      const level = daily.level + 1
      const levels = level + 1
      console.log(levels)
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.daily.this,
            locale.commands.daily.return.bind({
              
            })
          )
  
          m.edit({ content: message.member, embed })
        })
    })
  }
  module.exports.props = {
    name: "출석체크",
    perms: "general",
    alias: ["출석체크"],
    args: [],
  }