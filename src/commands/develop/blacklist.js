const { UserFlags } = require('discord.js')

    module.exports.execute = async (
        client,
        message,
        locale,
        embed,
        _tools,
        knex
      )  =>  {
         const blacks = await knex('blacklist')
         const config = require('../../config/client')       
         const user = message.mentions.members.first()
                const name = user.user.username
                const id = user.user.id
                const dev = message.author.username
                let reason = args.slice(2).join(" ")
                if(!reason) reason = "사유 없음"
                let today = new Date();
                let year = today.getFullYear(); // 년도
                let month = today.getMonth() + 1;  // 월 
                let date = today.getDate();  // 날짜
                const time = year + '년 ' + month + '월 ' + date + '일 '
                if (!user) return m.edit(`블랙 할 사람을 맨션해주세요.`)
                if(blacks.find(r=> r.id === user.id) ) return message.reply('이미 존재합니다.')
                if(message.author.id !== `${config.owners}`) return message.channel.send(`봇 개발자 전용 명령어입니다.`)
                if(name == undefined || reason == undefined || id == undefined || dev == undefined) return message.channel.send(`${message.member} 4개중 어느것이 undefined 입니다.`)
        message.channel.send(locale.wait).then( async (m) => {
            await knex('blacklist').insert({ name: name, id: id, reason: reason, time: time, dev: dev})
            knex("users")
            .select("*")
            .limit(1)
            .then(() => {
              embed.addField(
                locale.commands.black.this,
                locale.commands.black.return.bind({
                  name: name,
                  reason: reason,
                  id: id,
                  time: time,
                  dev: dev,
                })
              )
      
              m.edit({ embed: embed })
            })
        })
      }
      module.exports.props = {
        name: "블랙",
        perms: "general",
        alias: ["블랙", "black"],
        args: [],
        hide: true,
      }