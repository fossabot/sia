    module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex,
    args
  ) => {
    message.channel.send(locale.wait).then((m) => {
      function getuser(callback) {
        if (message.data.args.length===0) return callback(message.author)
        if (message.mentions.members.first()) return callback(message.mentions.users.first())
        if (message.data.arg[0]) { return callback(client.users.cache.get(message.data.arg[0])) }
         else {
            return callback(undefined)
        }
    }
    getuser((member) => {
      try{
        let img = member.displayAvatarURL({ size: 1024, format: "png"});
      knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.profile.this,
            locale.commands.profile.return.bind({
              user: member.username,
            })
          )
          embed.setImage(img)
          m.edit({ content: message.member, embed })
        })
      }catch(err) {
        m.edit('알맞은 유저를 맨션, 아이디를 써주세요')
      }  
    })
  })
  }
  module.exports.props = {
    name: "profile",
    perms: "general",
    alias: ["프로필", "profile"],
    args: [
      {
        name: 'user',
        type: 'user/id',
        required: false
    }
    ],
  }