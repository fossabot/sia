      module.exports.execute = async (
        client,
        message,
        locale,
        embed,
        _tools,
        knex
      ) => {
        
       const { inspect } = require('util')
          const dev = require('../../config/client')

        if(message.author.id !== `${dev.owners}`) return message.channel.send(`봇 개발자 전용 명령어입니다.`)
        const commands = args.slice(2)
if (
    commands.includes("client.token") &&
    commands.includes("message")
  ) {
    return message.channel.send("봇의 토큰을 유출 할 수는 없습니다.")
  }
  if (
      commands.includes("process.exit") 
  ) {
      return message.channel.send("봇을 종료할 수 없습니다.")
  }
  if (
      commands < 1
  ) {
      return message.channel.send("실행할 구문을 적어주세요!")
  }
  try {
        message.channel.send(locale.wait).then((m) => {
          
          const result = inspect(evaled, { depth: 0})
          const type = typeof(evaled)
          knex("users")
            .select("*")
            .limit(1)
            .then(() => {
              embed.addField(
                locale.commands.eval.this,
                locale.commands.eval.return.bind({
                  commands: commands,
                  result: result,
                  type: type,
                })
              )
      
              m.edit({ embed: embed })
            })
        })
      } catch (error) {
        console.log(error)
        message.channel.send(`에러가 발생하였습니다\n${error}`)
      }
      }
      module.exports.props = {
        name: "eval",
  perms: "dev",
  alias: ["실행", "cmd", "script", "이블", "js"],
  args: [
    {
      name: "script",
      type: "text",
    },
  ],
  hide: true,
}