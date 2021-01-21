const knex = require("../database/knex")
module.exports = class sia {
  constructor(config, devMode) {
    const Discord = require("discord.js")
    const client = new Discord.Client(config.client.app)
    let tools = require("../")
    const logger = tools.logger
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
  client.on('guildMemberAdd', async member => {
    const guild = (
      await knex
          .select('*')
          .from('event')
          .where({ guildid: member.guild.id })
  )[0]
  if(!guild) return  
  if(!guild.welcomechannelid) return
    const channel = member.guild.channels.cache.get(guild.welcomechannelid)
    if(!guild.welcomechannelmessage) return
    const welcomemessage = guild.welcomechannelmessage
    channel.send(welcomemessage)
})
client.on('guildMemberRemove', async member => {
  const guild = (
    await knex
        .select('*')
        .from('event')
        .where({ guildid: member.guild.id })
)[0]
if(!guild) return  
if(!guild.byechannelid) return
      const channel = member.guild.channels.cache.get(guild.byechannelid)
      if(!guild.byechannelmessage) return
      const byemessage = guild.byechannelmessage
      channel.send(byemessage)
})
    client.on("guildCreate", async (guild) => {
      if (guild.shardID !== client.guilds.cache.first().shardID) return
      const hello = await client.shard.fetchClientValues("guilds.cache.size")
      var u = (await tools.database.select('*').from('total').where({ guild: "서버" }))[0]
      await knex.update({ guilds: Number(u['guilds']) + 1}) .where({ guild: "서버" }).from('total')
      const g = await knex("guilds")
      if (!g.find((r) => r.id === guild.id)) {
        console.log(`[INSERT] NEW GUILD: ${guild.name}`)
        await knex("guilds").insert({ id: guild.id, name: guild.name })
        await knex("event").insert({ guildid: guild.id, welcomechannelid: "없음", beychannelname: "없음", byechannelid: "없음"})
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
      var u = (await tools.database.select('*').from('total').where({ guild: "서버" }))[0]
      await knex.update({ guilds: Number(u['guilds']) - 1}) .where({ guild: "서버" }).from('total')
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