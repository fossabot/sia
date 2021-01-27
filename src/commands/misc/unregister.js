module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
      const user = message.author
      const sql = await knex('users')
      if( !sql.find(r=> r.id === user.id) ) return m.edit('아직 가입하시지 않으셧습니다')
      let filter = (reaction, user) => (reaction.emoji.name === "⭕" || reaction.emoji.name === "❌") && user.id === message.author.id
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
        const wait = locale.commands.unregister.wait
          message.channel.send({ content: wait }).then((th) => {
                th.react("⭕")
                th.react("❌")
                th.awaitReactions(filter, {
                    max: 1,
                }).then( async (collected) => {
                    if (collected.array()[0].emoji.name === "⭕") {
                        th.delete()
                        await knex('users').where({ id: user.id }).del()
                        return message.channel.send(`${user}님은 성공적으로 서비스 가입을 취소하셨습니다. \`시아야 가입\` 명령어로 재가입 가능합니다.`)
                    } else {
                        th.delete()
                        message.reply(`성공적으로 취소되였습니다!` )
                    }
                })
        })
    })
  }
  module.exports.props = {
    name: "unregister",
    perms: "general",
    alias: ["가입취소", "unregister"],
    args: [],
  }