module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then((m) => {
      knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          const coment = `${message.guild.shard.id}번의 샤드를 재시작 합니다`
          m.edit( coment ).then(() => {
              process.exit()
          })
        })
    })
  }
  module.exports.props = {
    name: "restart",
    perms: "general",
    alias: ["재시작", "restart"],
    args: [],
    hide: true,
  }