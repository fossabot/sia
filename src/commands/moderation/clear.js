    module.exports.execute = async (
      client,
      message,
      locale,
      embed,
      _tools,
      knex,
      args
    ) => {
      const member = message.member
        const amount = message.data.args
        var isNum = !isNaN(amount)
        if (!member.hasPermission(['MANAGE_MESSAGES']))
        return message.channel.send(`해당 유저는 봇의 권한으로 메시지를 삭제할 수 없습니다. 유저권한 및 봇 권한을 다시 확인해주세요.`)
            if (isNum && (amount <= 0.9 || 99.9 < amount)) {
              message.channel.send(`${member}, 1 ~ 99 사이의 숫자를 입력해주세요!`)
              return
            }
             else if (isNum == false) {
            message.channel.send(`${member},1 ~ 99 사이의 \`숫자\`를 입력해주세요!`)
            return
            }
            else if (!isNum) {
              if (message.content.split("<@").length == 2) {  
                if (isNaN(message.content.split(" ")[2])) return
                var user = message.content.split(" ")[1].split("<@!")[1].split(">")[0]
                var count = parseInt(message.content.split(" ")[2]) + 1
                let _cnt = 0
                message.channel.messages.fetch().then((collected) => {
                  collected.every((msg) => {
                    if (msg.author.id == user) {
                      msg.delete()
                      ++_cnt
                    }
                    return !(_cnt == count)
                  })
                })
              }
            } else {
              message.channel
              .bulkDelete(parseInt(amount) + 1).then(() => {
              message.channel.send(locale.wait).then((m) => 
                knex("users")
                .select("*")
                .limit(1)
                .then(() => {
                  embed.addField(
                    locale.commands.clear.this,
                    locale.commands.clear.return.bind({
                      number: amount
                    })
                  )
                  m.edit({ content: member, embed }).then((msg) => msg.delete({ timeout: 3000 }))
              })
              )})
              .catch(console.error)
            }
          
    }
    module.exports.props = {
      name: "clear",
      perms: "메시지 관리",
      alias: ["삭제", "청소", "clear"],
      args: [
      {
          name: 'count',
          type: 'number',
          required: false
      }
      ],
    }