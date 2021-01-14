    module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    
  
    message.channel.send(locale.wait).then((m) => {
      let user =
      args[1] !== undefined
        ? message.mentions.users.first()
          ? message.mentions.users.first()
          : message.client.users.cache.get(args[1])
        : message.author
        let img = user.displayAvatarURL({ dynamic: true, size: 1024, format: "png"});
      knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.profile.this,
            locale.commands.profile.return.bind({
              uesr: user,
            })
          )
          
            embed.setImage(img)
  
          m.edit({ embed: embed })
        })
    })
  }
  module.exports.props = {
    name: "프로필",
    perms: "general",
    alias: ["프로필", "profile"],
    args: [
      {
        name: 'user',
        type: 'userid',
        required: false
    }
    ],
  }