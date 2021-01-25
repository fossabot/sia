module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then((m) => {
      let userID = message.content.includes('<@!') ? message.content.replace('<@!', '').replace('>', '')
          : message.content.includes('<@') ? message.content.replace('<@', '').replace('<', '') : '';
          if (userID == '') {
            m.edit('잘못된 사용자 ID 또는 멘션입니다.');
            return;
          }
          
      message.guild.fetchBans().then(bans => {
        let member = bans.get(userID);

        if (member == null) {
          m.edit('이 서버에서 밴 당하지 않은 유저입니다.');
          return;
        }
        message.guild.members.unban(member.user.id)
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.unban.this,
            locale.commands.unban.return.bind({
              user: member.user.username,
            })
          )
          })
          m.edit({ embed: embed })
        })
    })
  }
  module.exports.props = {
    name: "unban",
    perms: "멤버 차단하기",
    alias: ["언밴", "언벤", "unban"],
    args: [],
  }
