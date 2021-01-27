module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then((m) => {
          const min = 1
          const max = 3
          const Response = parseInt(Math.random() * (max - min) + min)
         const result = Response
      knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          let filter = (reaction, user) => (reaction.emoji.name === "✌️" || reaction.emoji.name === "✊" || reaction.emoji.name === "🖐️") && user.id === message.author.id
            m.edit(`\`가위\` \`바위\` \`보\` 중 한개를 골라 써주세요!`).then((th) => {
                th.react("✌️")
                th.react("✊")
                th.react("🖐️")
                th.awaitReactions(filter, {
                    max: 1,
                }).then((collected) => {
                    if (collected.array()[0].emoji.name === "✌️") {
                        th.delete()
                        if(result == "1") return message.reply('아슬아슬하게 비겼네요!\n시아의 선택 : 가위')
                        if(result == "2") return message.reply('아쉽게도 지셨습니다..ㅠㅠ\n시아의 선택 : 바위')
                        if(result == "3") return message.reply('축하드립니다! 이기셨습니다요!\n시아의 선택 : 보')
                    } else if(collected.array()[0].emoji.name === "✊"){
                        th.delete()
                        if(result == "1") return message.reply('축하드립니다! 이기셨습니다!\n시아의 선택 : 가위')
                        if(result == "2") return message.reply('아슬아슬하게 비겼네요!\n시아의 선택 : 바위')
                        if(result == "3") return message.reply('아쉽게도 지셨습니다..ㅠㅠ\n시아의 선택 : 보')
                    } else {
                      th.delete()
                        if(result == "1") return message.reply('아쉽게도 지셨습니다..ㅠㅠ\n시아의 선택 : 가위')
                        if(result == "2") return message.reply('축하드립니다! 이기셨습니다!\n시아의 선택 : 바위')
                        if(result == "3") return message.reply('아슬아슬하게 비겼네요!\n시아의 선택 : 보')
                    }
                })
            })
        })
        })
    }
  module.exports.props = {
    name: "rockpaperscissors",
    perms: "general",
    alias: ["가위바위보", "rockpaperscissors"],
    args: [],
  }