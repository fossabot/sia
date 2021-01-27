const emojis = require("../../tools/lib/emojis")

module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
        knex("users")
      .select("*")
      .limit(1)
      .then(() => {
          const id = message.data.arg[0]
          if(!id) return m.edit('아이디를 적어주세요')
          const text = message.content.replace(message.data.prefix, '').split(' ').splice(2).join(' ')
          if(!text) return m.edit('답변할 내용을 적어주세요')
          const user = client.users.cache.get(`${id}`);
          user.send(`${text}`).then(() => {
                message.react(emojis.send)
            })
    })
  }
  module.exports.props = {
    name: "askreturn",
    perms: "general",
    alias: ["문의답변", "askreturn"],
    args: [],
    hide: true,
  }