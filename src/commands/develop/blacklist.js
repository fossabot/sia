    module.exports.execute = async (
        client,
        message,
        locale,
        embed,
        _tools,
        knex
      )  =>  {
        var u = (
          await knex
              .select('*')
              .from('total')
              .where({ blacklist: "블랙" })
      )[0]
        message.channel.send(locale.wait).then( async (m) => {
       const config = require('../../config')
          if (!message.data.args)
        return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
    const blacks = await knex('blacklist')
    
    if (['add', '추가', 'a'].includes(message.data.arg[0])){
      const user = message.mentions.members.first()
      ? message.mentions.members.first().id
      : message.data.arg[1]
        const dev = message.author.tag
        let reason =  message.content.replace(message.data.prefix, '').split(' ').splice(3).join(' ')
        if(!reason) reason = "사유 없음"
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월 
        let date = today.getDate();  // 날짜
        const time = year + '년 ' + month + '월 ' + date + '일'  
      if(!user) return message.reply('맨션')
        if( blacks.find(r=> r.id === user) ) return m.edit('이미 존재하는 유저입니다.')
        if( user == config.client.owners) return m.edit("개발자를 블랙에 넣을 수는 없습니다.")
        await knex('blacklist').insert({ id: user, reason: reason, time: time, dev: dev}) 
        await knex.update({ blacklists: Number(u['blacklists']) + 1}).where({ blacklist: "블랙" }).from('total')
        return m.edit(`\`\`\`bash\n블랙리스트에 추가\nID: ${user}\ntime: ${time}\nREASON: ${reason}\n DEV: ${dev}\`\`\``)}
        else if (['remove', '삭제', '해제', 'rm'].includes(message.data.arg[0])){
          const user = message.data.arg[1]
          if(!user) return m.edit('아이디')
          if( !blacks.find(r=> r.id === user) ) return m.edit('블랙리스트에 없는 유저입니다.')
          await knex('blacklist').where({ id: user }).del()
          await knex.update({ blacklists: Number(u['blacklists']) - 1}).where({ blacklist: "블랙" }).from('total')
          return m.edit(`블랙리스트에서 삭제되었습니다\nID: ${user}`)
        }
        else if (['list', '리스트', 'ls'].includes(message.data.arg[0])){
          return m.edit(`\`\`\`md\n${blacks.map(r => ` [${r.id}] <"${r.reason}"> <${r.time}> | ${r.dev}`).join('\n')}\`\`\``)
          
    }
    else return m.edit(locale.error.usage(message.data.cmd, message.data.prefix))
}
        )}
      module.exports.props = {
        name: "black",
        perms: "개발자",
        alias: ["블랙", "black"],
        args: [
          {
            name: 'option',
            type: 'option',
            required: true,
            options: ['a', 'rm', 'ls']
        },
        {
            name: 'user',
            type: 'user',
            required: true
        },
        ],
        hide: true,
      }