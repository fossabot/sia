      module.exports.execute = async (
      client,
      message,
      locale,
      embed,
      _tools,
      knex
    ) => {
      const config = require("../../config")
    
      message.channel.send(locale.wait).then((m) => {
        let msg = message.content.split(" ")
        
        let args = msg.slice(2)
        
        if (args.length < 2) return m.edit(`알맞은 사용법 : ${config.client.prefix}골라 (단어1) (단어2)... `)
        let words = args
        
        let random = Math.floor(Math.random() * words.length)
        let result = words[random]
        
        knex("users")
          .select("*")
          .limit(1)
          .then(() => {
            embed.addField(
              locale.commands.choose.this,
              locale.commands.choose.return.bind({
               result: result, 
               list: words,
              })
            )
    
            m.edit({ content: message.member, embed })
          })
      })
    }
    module.exports.props = {
      name: "골라",
      perms: "general",
      alias: ["골라", "choose"],
      args: [],
    }