module.exports.execute = async (
            client,
            message,
            locale,
            embed,
            _tools,
            knex
            ) => {
    
  
            message.channel.send(locale.wait).then((m) => {
            const user =
            message.mentions.members.first()
  
            if (!user) return m.edit(`밴 할 사람을 맨션해주세요.`)
            let reason =  message.content.replace(message.data.prefix, '').split(' ').splice(2).join(' ')
            if(!reason) reason = "사유 없음"
            user.ban({ reason: reason })
            knex("users")
            .select("*")
            .limit(1)
            .then(() => {
            embed.addField(
            locale.commands.ban.this,
            locale.commands.ban.return.bind({
            user: user,
            reason: reason,
        })
    )
  
            m.edit({ content: message.member, embed })
        },
    )
  }
)}
            module.exports.props = {
            name: "ban",
            perms: "ban",
            alias: ["밴", "벤", "ban"],
            args: [
            {
            name: 'user/id',
            type: 'text',
            required: true
            },
            {
            name: 'reason',
            type: 'text',
            required: false
            }
            ],
            }