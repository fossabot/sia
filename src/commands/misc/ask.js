module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then((m) => {
      const text = message.data.args
      if(!text) return m.edit('문의할 내용을 적어주세요!')
        let filter = (reaction, user) => (reaction.emoji.name === "⭕" || reaction.emoji.name === "❌") && user.id === message.author.id
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
            const wait = locale.commands.ask.wait.bind({text: text})
            m.edit(wait).then((th) => {
                th.react("⭕")
                th.react("❌")
                th.awaitReactions(filter, {
                    max: 1,
                }).then( async (collected) => {
                    if (collected.array()[0].emoji.name === "⭕") {
                        th.delete()
                        const config = require('../../config')
                        const Discord = require('discord.js')
                        client.askwebhook = new Discord.WebhookClient(
                            config.client.webhook.ask.id,
                            config.client.webhook.ask.token,
                          )
                        client.askwebhook.send(`${message.author.tag} (${message.author.id}) // 님이 문의를 보냈습니다.\n${text}`)
                        return message.reply(locale.commands.ask.return.bind({
                            text: text,
                        })
                        )
                    } else {
                        th.delete()
                        message.reply(`성공적으로 취소되였습니다!` )
                    }
                })
        })
        })
    })
  }
  module.exports.props = {
    name: "ask",
    perms: "general",
    alias: ["문의", "ask"],
    args: [],
  }