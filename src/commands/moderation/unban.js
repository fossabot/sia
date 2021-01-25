module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then((m) => {
      let user = message.data.arg[0]
      if(!user) return m.edit(`언밴할 유저를 맨션해주세요!`)
      let userID = user.replace('<@!', '').replace('>', '')
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
              user: member.user.tag
              })
            )
            m.edit({ content: message.member, embed })
          })
    })
  })
}
  module.exports.props = {
    name: "unban",
    perms: "멤버 차단하기",
    alias: ["언밴", "언벤", "unban"],
    args: [],
  }
