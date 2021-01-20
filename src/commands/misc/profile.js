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
      let member =
      message.data.args !== undefined
        ? message.mentions.users.first()
          ? message.mentions.users.first()
          : message.client.users.cache.get(message.data.args)
        : message.author
        if(member == undefined) member = message.author
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