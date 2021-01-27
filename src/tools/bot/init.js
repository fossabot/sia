const knex = require("../database/knex")
module.exports = class sia {
  constructor(config, devMode) {
    const Discord = require("discord.js")
    const client = new Discord.Client(config.client.app)
    let tools = require("../")
    client.guildwebhook = new Discord.WebhookClient(
      config.client.webhook.guild.id,
      config.client.webhook.guild.token,
    )
    client.commandwebhook = new Discord.WebhookClient(
      config.client.webhook.command.id,
      config.client.webhook.command.token,
    )
    client.errorwebhook = new Discord.WebhookClient(
      config.client.webhook.error.id,
      config.client.webhook.error.token,
    )
    client.once("ready", async () => {
      client.onlineMode = true
      if (!client.shard) {
        console.error("Only Shard Allowed")
        process.exit(0)
      }
      await knex('users').update({ action: 0 })
      // Fetch for all Guild
      const g = await tools.database("guilds")
      client.guilds.cache.forEach(async (guild) => {
        if (!g.find((r) => r.id === guild.id)) {
          console.log(`[INSERT] NEW GUILD: ${guild.name}`)
          await tools.database("guilds").insert({ id: guild.id, name: guild.name })
          client.mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
          await knex('shards')
              .update({
                  lastupdate: Math.round(new Date() / 1000),
                  ping: client.ws.ping,
                  guilds: client.guilds.cache.size,
                  users: client.guilds.cache
                      .map(r => r.memberCount)
                      .reduce(
                          (accumulator, currentValue) => Number(accumulator) + currentValue
                      ),
                  memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
              })
              .where({ id: client.guilds.cache.first().shardID })
      }
    })
    client.mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
            await knex('shards')
                .update({
                    lastupdate: Math.round(new Date() / 1000),
                    ping: client.ws.ping,
                    guilds: client.guilds.cache.size,
                    users: client.guilds.cache
                        .map(r => r.memberCount)
                        .reduce(
                            (accumulator, currentValue) => Number(accumulator) + currentValue
                        ),
                    memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
                })
                .where({ id: client.guilds.cache.first().shardID })
            setInterval(async () => {
                client.mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
                await knex('shards')
                    .update({
                        lastupdate: Math.round(new Date() / 1000),
                        ping: client.ws.ping,
                        guilds: client.guilds.cache.size,
                        users: client.guilds.cache
                            .map(r => r.memberCount)
                            .reduce(
                                (accumulator, currentValue) =>
                                    Number(accumulator) + currentValue
                            ),
                        memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
                    })
                    .where({ id: client.guilds.cache.first().shardID })
            }, 60000)
        })
    client.on("message", async (message) => {
      tools.bot.handler(client, message, config, devMode)
    })
    client.on('messageUpdate', async (message, oldMessage) => {
      if(message.author.bot) return
      if(oldMessage.content == message.content) return
    const guild = (await knex.select('*').from('event').where({ guildid: message.guild.id }))[0]
    if(!guild) return
    if(!guild.logchannelid) return
    const channel = message.guild.channels.cache.get(guild.logchannelid)
    const embed = new Discord.MessageEmbed()
    embed.setTitle('메시지수정로그')
    embed.addFields({ name: '메시지주인', value: `${message.author}`},
      { name: '채널', value: `${message.channel}`},
      { name: '메시지바로가기', value: `[클릭](${message.url})`},
      { name: '변경전', value: `${message.content}`},
      { name: '변경후', value: `${oldMessage}`},)
    embed.setThumbnail(`${message.author.avatarURL()}`)
    embed.setFooter(`${message.author.tag}`, message.author.avatarURL())
    embed.setTimestamp(new Date())
    embed.setColor("#93bfe6")
    channel.send(embed)}) 
    client.on('messageDelete', async (message) => {
      const guild = (await knex.select('*').from('event').where({ guildid: message.guild.id }))[0]
    if(!guild) return
    if(!guild.logchannelid) return
      const channel = message.guild.channels.cache.get(guild.logchannelid)
      const { MessageAttachment } = require('discord.js');
      const fetch = require('node-fetch');
    if(message.author.bot) return;
    if(message.attachments.array().length > 0) {
      try {
          const result = await fetch(message.attachments.array()[0].proxyURL);
          if (!result.ok) {
          const embed = new Discord.MessageEmbed()
          embed.setTitle('메시지삭제로그')
          embed.addFields({ name: '메시지주인', value: `${message.author}`},
            { name: '채널', value: `${message.channel}`},
            { name: '메시지바로가기', value: `[클릭](${message.url})`},
            { name: '삭제내용', value: `파일`},)
          embed.setThumbnail(`${message.author.avatarURL()}`)
          embed.setFooter(`${message.author.tag}`, message.author.avatarURL())
          embed.setTimestamp(new Date())
          embed.setColor("#93bfe6")
          return channel.send(embed)}
          const avatar = await result.buffer();
          const attachment = new MessageAttachment(avatar, message.attachments.array()[0].name);
          if(message.content.length == 0) {
            const embed = new Discord.MessageEmbed()
            embed.setTitle('메시지삭제로그')
            embed.addFields(
              { name: '메시지주인', value: `${message.author}`},
              { name: '채널', value: `${message.channel}`},
              { name: '메시지바로가기', value: `[클릭](${message.url})`},
              { name: '삭제내용', value: `사진`},
            )
            embed.setThumbnail(`${message.author.avatarURL()}`)
            embed.setFooter(`${message.author.tag}`, message.author.avatarURL())
            embed.setTimestamp(new Date())
            embed.setColor("#93bfe6")
            channel.send(embed)
            return channel.send(attachment)
          }
          else {
            const embed = new Discord.MessageEmbed()
            embed.setTitle('메시지삭제로그')
            embed.addFields(
              { name: '메시지주인', value: `${message.author}`},
              { name: '채널', value: `${message.channel}`},
              { name: '메시지바로가기', value: `[클릭](${message.url})`},
              { name: '삭제내용', value: `${message.content}`},
            )
            embed.setThumbnail(`${message.author.avatarURL()}`)
            embed.setFooter(`${message.author.tag}`, message.author.avatarURL())
            embed.setTimestamp(new Date())
            embed.setColor("#93bfe6")
            return channel.send(embed)
        }
      } 
      catch (e) {
        return console.log(e);
      }
  }
   const embed = new Discord.MessageEmbed()
            embed.setTitle('메시지삭제로그')
            embed.addFields(
              { name: '메시지주인', value: `${message.author}`},
              { name: '채널', value: `${message.channel}`},
              { name: '삭제내용', value: `${message.content}`},
            )
            embed.setThumbnail(`${message.author.avatarURL()}`)
            embed.setFooter(`${message.author.tag}`, message.author.avatarURL())
            embed.setTimestamp(new Date())
            embed.setColor("#93bfe6")
            return channel.send(embed)
})
  client.on('guildMemberAdd', async member => {
    const guild = (
      await knex
          .select('*')
          .from('event')
          .where({ guildid: member.guild.id })
  )[0]
  if(!guild.welcomechannelid) return
    const channel = member.guild.channels.cache.get(guild.welcomechannelid)
    if(!guild.welcomemessage) return
    const welcomemessage = guild.welcomemessage 
    channel.send(welcomemessage.bind({ user: member, userID: member.id, 유저: member, 유저아이디: member.id,
      유저수: member.guild.memberCount, memberCount: member.guild.memberCount,
      서버: member.guild.name, 길드: member.guild.name, 서버아이디: member.guild.id, 길드아이디: member.guild.id, guildID: member.guild.id,
       }), { allowedMentions: { parse: ['roles', 'users'] }})
})
client.on('guildMemberRemove', async member => {
  const guild = (
    await knex('event').where({ guildid: member.guild.id })
)[0]
if(!guild)
if(!guild.byechannelid) return
      const channel = member.guild.channels.cache.get(guild.byechannelid)
      if(!guild.byemessage) return
      const byemessage = guild.byemessage
      channel.send(byemessage.bind({ user: member, userID: member.id, 유저: member, 유저아이디: member.id,
        유저수: member.guild.memberCount, memberCount: member.guild.memberCount,
        서버: member.guild.name, 길드: member.guild.name, 서버아이디: member.guild.id, 길드아이디: member.guild.id, guildID: member.guild.id,
         }), { allowedMentions: { parse: ['roles', 'users'] }})
})
    client.on("guildCreate", async (guild) => {
      if (guild.shardID !== client.guilds.cache.first().shardID) return
      const hello = await client.shard.fetchClientValues("guilds.cache.size")
      await knex("event").insert({ guildid: guild.id })
      const g = await knex("guilds")
      if (!g.find((r) => r.id === guild.id)) {
        console.log(`[INSERT] NEW GUILD: ${guild.name}`)
        await knex("guilds").insert({ id: guild.id, name: guild.name, prefix: "시아야 " })
      }
      const invites = await guild.fetchInvites().then(r=> r.first()).catch(() => null)
      client.guildwebhook.send(
        `**NEW GUILD**: TOTAL: ${hello.reduce(
          (prev, val) => prev + val,
          0
        )}\nNAME: ${guild.name}\nID: ${guild.id}\nOWNER: ${
          (await client.users.fetch(guild.ownerID)).tag
        }\nMEMBER: ${guild.memberCount}\nBOTCOUNT: ${
          guild.members.cache.filter((r) => r.user.bot).size
        }\nBOTS: ${guild.members.cache
          .filter((r) => r.user.bot)
          .map((r) => r.user.username)
          .join(", ")}\ndiscord.gg/${
          invites ? invites.code : '없음'
        }\n\n\n--------------------------------------`.slice(0, 1999)
      )
    })
    client.on("guildDelete", async (guild) => {
      if (guild.shardID !== client.guilds.cache.first().shardID) return
      const hello = await client.shard.fetchClientValues("guilds.cache.size")
      await knex("event").del().where({ guildid: guild.id })
      await knex("guilds").del().where({ guildid: guild.id })
      const invites = await guild
        .fetchInvites()
        .then((r) => r.first())
        .catch(() => null)
      client.guildwebhook.send(
        `**LEFTED GUILD**: TOTAL: ${hello.reduce(
          (prev, val) => prev + val,
          0
        )}\nNAME: ${guild.name}\nID: ${guild.id}\nOWNER: ${
          (await client.users.fetch(guild.ownerID)).tag
        }\nMEMBER: ${guild.memberCount}\nBOTCOUNT: ${
          guild.members.cache.filter((r) => r.user.bot).size
        }\nBOTS: ${guild.members.cache
          .filter((r) => r.user.bot)
          .map((r) => r.user.username)
          .join(", ")}\ndiscord.gg/${
          invites ? invites.code : "없음"
        }\n\n\n--------------------------------------`.slice(0, 1999)
      )
    })
    client.login(config.client.token)
  }
}
