const Inko = require('inko')
const { emojis } = require('../../tools/lib')
const inko = new Inko()
const commands = require('../index')
module.exports.execute = async (client, message, locale, embed) => {
    if (!message.data.args) {
        message.channel.send(locale.wait).then((m) => {
        embed.setTitle(locale.commands.help.help)
        embed.setDescription(locale.commands.help.desc)
        // Object.keys(commands.categorys).forEach(cat => {
        //     if(['dev', 'coding'].includes(cat.toLowerCase())) return
        //     let cmds = cmdFormat(commands.categorys[cat])
        //     if(cmds) embed.addField(cat.toUpperCase(), cmds)
        // })
        embed.addFields(
            { name: `시아야 도움`, value: locale.commands.help.CMDDESC},
            { name: `시아야 핑`, value: locale.commands.ping.CMDDESC},
            { name: `시아야 가입`, value: locale.commands.register.CMDDESC},
            { name: `시아야 가입취소`, value: locale.commands.unregister.CMDDESC},
            { name: `시아야 프로필 <맨션 / 유저아이디>`, value: locale.commands.profile.CMDDESC},
            { name: `시아야 한강`, value: locale.commands.river.CMDDESC},
            { name: `시아야 골라 <예시단어1> <예시단어2> ...`, value: locale.commands.choose.CMDDESC},
            { name: `시아야 코로나 <지역>`, value: locale.commands.corona.CMDDESC},
            { name: `시아야 봇정보`, value: locale.commands.botinfo.CMDDESC},
            { name: `시아야 서버정보`, value: locale.commands.serverinfo.CMDDESC},
            { name: `시아야 유저정보 <맨션 / 유저아이디>`, value: locale.commands.userinfo.CMDDESC},
            { name: `시아야 샤드정보`, value: locale.commands.shardinfo.CMDDESC},
            { name: `시아야 밴 <맨션>`, value: locale.commands.ban.CMDDESC},
            { name: `시아야 언밴 <맨션>`, value: locale.commands.unban.CMDDESC},
            { name: `시아야 킥 <맨션>`, value: locale.commands.kick.CMDDESC},
            { name: `시아야 삭제 <1~99 사이의 숫자>`, value: locale.commands.clear.CMDDESC},
            { name: `시아야 슬로우모드`, value: locale.commands.slowmode.CMDDESC},
            { name: `시아야 입장채널 <채널맨션>`, value: locale.commands.welcomechannel.CMDDESC},
            { name: `시아야 입장메시지 <메시지>`, value: locale.commands.welcomemessage.CMDDESC},
            { name: `시아야 퇴장채널 <채널맨션>`, value: locale.commands.byechannel.CMDDESC},
            { name: `시아야 퇴장메시지 <메시지>`, value: locale.commands.byemessage.CMDDESC},
            { name: `시아야 로그채널 <채널맨션>`, value: locale.commands.logchannel.CMDDESC},
        )
        embed.addField(
            locale.commands.help.more,
            locale.commands.help.moreDesc.bind({ prefix: message.data.prefix })
        )
        embed.addField(locale.commands.help.support, locale.commands.help.links)
        // return message.channel.send(embed)
        const user = client.users.cache.get(message.author.id);
        user.send(embed).then( async () => {
            m.delete()
            await message.react(emojis.send)
        })
    })
    } else {
        const cmd = (commands[message.data.arg[0]] || commands[inko.en2ko(message.data.arg[0])] || commands[inko.ko2en(message.data.arg[0])])
        if (!cmd) return message.reply(locale.commands.help.noCommand)
        embed.setTitle(
            '> ' +
        locale.commands.help.commandInfo.bind({
            cmd: cmd.props.name.toUpperCase()
        })
        )
        embed.addField(
            locale.commands.help.description,
            '```fix\n' + cmd.props.desc + '```')
        embed.addField(
            locale.commands.help.usage,
            locale.error.usage(cmd.props.name, message.data.prefix)
        )
        embed.addField(
            locale.commands.help.other,
            '`' + cmd.props.alias.join('`, `') + '`'
        )
        embed.addField(
            locale.commands.help.docs,
            cmd.props.docs ? cmd.props.docs : locale.commands.help.nodoc
        )
        message.reply(embed)
    }
}
module.exports.props = {
    name: 'help',
    perms: 'general',
    alias: ['도움', '도움말', 'help'],
    dm: true,
    args: [
        {
            name: 'cmd',
            type: 'text',
            required: false
        }
    ]
}
function cmdFormat(cmds) {
    var array = []
    Object.values(cmds).forEach(c => array.push(c.props))
    array = array.filter(r=> !r.hide).map(r=> r.alias[0])
    if(array.length === 0) return undefined
    else return '`' + array.join('`, `') + '`'
}