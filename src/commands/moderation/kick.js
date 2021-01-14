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

    if (!user) return m.edit(`킥 할 사람을 맨션해주세요.`)
    if (user.hasPermission(['KICK_MEMBERS']))
    return m.edit(`해당 유저는 봇의 권한으로 추방할 수 없습니다.  유저권한 및 봇 권한을 다시 확인해주세요.`)
    if(!message.author.hasPermission(['KICK_MEMBERS'])) 
    return m.edit(`${message.member}님은 킥 권한이 없습니다.`)
    let reason = args.slice(2).join(" ")
    if(!reason) reason = "사유 없음"
    user.kick({ reason: reason })
    knex("users")
    .select("*")
    .limit(1)
    .then(() => {
    embed.addField(
    locale.commands.kick.this,
    locale.commands.kick.return.bind({
    uesr: user,
    reason: reason,
})
)

    m.edit({ embed: embed })
},
)
}
)}
    module.exports.props = {
    name: "킥",
    perms: "admin",
    alias: ["킥", "KICK"],
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