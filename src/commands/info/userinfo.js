const { status, getClient  } = require('../../tools/bot/util')
const { emojis } = require('../../tools/lib')
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    tools,
    _tools,
    knex
) => {
    message.channel.send(locale.wait).then((m) => {
const lower = message.data.args.toLowerCase().toString()
function getuser(callback) {
    if (message.data.args.length===0) return callback(message.member)
    if (message.mentions.members.first()) return callback(message.mentions.members.first())
    const mems = message.guild.members.cache
    const getmem = mems.filter(a => a === lower || a.id === lower || a.displayName.toLowerCase().includes(lower) || a.user.username.toLowerCase() === lower || a.user.tag.toLowerCase() === lower || a.user.discriminator.toLowerCase() === lower).map(a => a)  
    if (getmem.length === 1) {
        return callback(getmem[0])
    } else if (getmem.length > 1) {
        let order = ''
        let loop
        let moreuser = false
        if (getmem.length >= 5) loop = 5
        if (getmem.length > 5) moreuser = true
        else loop = getmem.length
        for (let i = 0; i < loop; i++) {
            let user = `\n[${i + 1}] ${getmem[i].displayName}${getmem[i].user.bot === true ? ' **[BOT]**' : ''} (${getmem[i].user.tag}) [${getmem[i].id}]`
            order += user
            if (i === loop - 1) {
                const filter = m => m.author.id === message.author.id
                if (moreuser === true) order = order+locale.commands.userinfo.more.bind({ count: getmem.length-5 })
                message.channel.send(locale.commands.userinfo.many + order).then(m => {
                    message.channel.awaitMessages(filter, { max: 1, time: 5000 }).then(collected => {
                        if (Number.isInteger(Number(collected.first().content)) === false) {
                            m.delete().catch(() => {})
                            return message.channel.send(locale.commands.userinfo.notvaild)
                        }
                        if (1 > Number(collected.first().content) || getmem.length < Number(collected.first().content)) {
                            m.delete().catch(() => {})
                            return message.channel.send(locale.commands.userinfo.notvaild + ' ' + locale.commands.userinfo.numberto.bind({ max: getmem.length }))
                        }
                        const collect = Number(collected.first().content) - 1
                        m.delete().catch(() => {})
                        return callback(getmem[collect])
                    }).catch(() => {
                        m.delete().catch(() => {})
                        return callback('timeout')
                    })
                })
            }
        }
    } else {
        return callback(undefined)
    }
}
        getuser((user) => {
        if (user === 'timeout') return message.channel.send(locale.commands.userinfo.timeout)
        if (!user) return message.channel.send(locale.commands.userinfo.nores)
        embed.setThumbnail(user.user.displayAvatarURL())
        embed.addField(locale.commands.userinfo.username, `${user.user.tag} ${user.user.bot ? emojis.bot : ''}`, true)
        embed.addField('ID', user.id)
        embed.addField(locale.commands.userinfo.status ,status(user.user.presence.status, tools, locale),true)
        getClient(user.user.presence.clientStatus, (callback)=>{
            embed.addField(locale.commands.userinfo.client, callback || locale.commands.userinfo.unknown, true)
        })
        embed.addField(locale.commands.userinfo.profile, `[클릭](${user.user.displayAvatarURL()})`,true)
        embed.addField(locale.commands.userinfo.created,`${user.user.createdAt.toLocaleDateString("korea")}`,true)
        embed.addField(locale.commands.userinfo.joined,`${user.joinedAt.toLocaleDateString("korea")}`,true)
        embed.addField(locale.commands.userinfo.roles, message.guild.member(user.user).roles.cache.array().join(', ').length > 1000 ? message.guild.member(user.user).roles.cache.array().splice(0, 42).join(', ') + locale.commands.serverinfo.more.bind({ count:  message.guild.member(user.user).roles.cache.array().length - 42 }) :  message.guild.member(user.user).roles.cache.array().join(', '))
        m.edit({ content: message.member, embed})
    })
})
}
  module.exports.props = {
    name: "userinfo",
    perms: "general",
    alias: ["유저정보", "userinfo"],
    args: [
        {
        name: 'user',
        type: 'user/id',
        required: false
        }
    ],
}