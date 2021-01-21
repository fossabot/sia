const Inko = require("inko")
const inko = new Inko()
const uuid = require('uuid')
const commands = require("../../commands")
const tools = require("../")
const knex = tools.database
const data = {
  register: [],
  race: {},
  cooldown: {},
  action: [],
  leaderboard: {
    updated: 0,
    txt: "",  
  },
  news: { time: 0, data: [] },
}
module.exports = async (client, message, config) => {
  client.shard.fetchClient = async (props) => {
    let arr = []
    await client.shard.fetchClientValues(props).then((r) => {
      arr = r.concat(...r)
      arr.splice(0, r.length)
    })
    return arr
  }
  const embed = new require("./embed")(client, message)
  const prefix = config.client.prefix
  message.data = {
    raw: message.content,
    arg: message.content.replace(prefix, "").split(" ").slice(1),
    args: message.content.replace(prefix, "").split(" ").slice(1).join(" "),
    arg2: message.content.replace(prefix, "").split(" ").splice(2).join(" "),
    prefix: prefix,
    cmd: message.content.replace(prefix, "").split(" ")[0].toLowerCase(),
    premium: undefined,
    locale: "ko",
  }
  const locale = require("../../locale")[message.data.locale]
  if (
    message.author.bot ||
    !message.data.cmd ||
    (message.guid &&
      (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS") ||
        !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")))
  )
    return
    if (!message.content.startsWith(prefix)) return
  let CMD =
    commands[message.data.cmd] ||
    commands[inko.en2ko(message.data.cmd)] ||
    commands[inko.ko2en(message.data.cmd)]
  if (!CMD) return
  if (!config.client.owners.includes(message.author.id) && !client.onlineMode)
    return message.reply(locale.error.offline)
   client.commandwebhook.send(
          `
   guild : ${message.guild.name} // ${message.guild.id}
  channel : ${message.channel.name} // ${message.channel.id}
  user : ${message.author.tag} // ${message.author.id}
  text: ${message.content}
  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ`)
    const user = (await knex("users").where({ id: message.author.id }))[0]
  if (!user)
    return commands["register"].execute(
      client,
      message,
      locale,
      embed,
      tools,
      knex,
      CMD.props,
      data
    )
      var u = (
      await knex
          .select('*')
          .from('users')
          .where({ id: message.author.id })
  )[0]
  await knex
  .update({
    command: Number(u['command']) + 1,
  })
  .where({ id: message.author.id })
  .from('users')
  let blacked = await knex
    .select("*")
    .from("blacklist")
    .where({ id: message.author.id })

  if (blacked.length === 1)
  return message.reply(
    locale.error.blacklist.bind({
        reason: blacked[0].reason
    })
)
  if (user.action == 1) return message.reply(locale.error.already)
  message.data.premium = new Date() / 1000 < user.premium
  message.data.premiumTime = new Date(user.premium * 1000)
  if (
    data.cooldown[message.author.id] &&
    Number(data.cooldown[message.author.id]) > Number(new Date()) &&
    !message.data.premium
  ) {
    return message.reply(
      locale.error.cooldown.bind({
        time: Number(
          (Number(data.cooldown[message.author.id]) - Number(new Date())) / 1000
        ).toFixed(2),
        prefix: message.data.prefix,
      })
    )
  }
  if (
    message.guild &&
    !message.member.hasPermission(CMD.props.perms.required.perms)
  )
    return message.reply(
      locale.error.noperm.bind({
        perms: CMD.props.perms.name.toUpperCase(),
      })
    )
  if (
    CMD.props.perms.required.id
      ? !CMD.props.perms.required.id.includes(message.author.id)
      : false
  )
    return message.reply(
      locale.error.noperm.bind({
        perms: CMD.props.perms.name,
      })
    )
  data.cooldown[message.author.id] = new Date(Number(new Date()) + 2000)
  if (
    !client.users.cache.get(message.author.id) ||
    (message.guild && !message.guild.members.cache.get(message.author.id))
  ) {
    client.users.fetch(message.author.id)
    if (message.guild) message.guild.members.fetch(message.author.id)
  }
  if (message.channel.type === "dm" && !CMD.props.dm)
    return message.reply("해당 명령어는 DM에서 사용할 수 없습니다.")
  if (user.money >= 1e19) {
    let lost = Math.round(user.money * (getRandomInt(20, 50) / 100))
    await knex("users")
      .update({ money: user.money - lost })
      .where({ id: message.author.id })
    message.reply(locale.global.event.sad.random().bind({ lost }))
  }
  let args = message.content.split(" ")
  CMD.execute(
    client,
    message,
    locale,
    embed,
    tools,
    knex,
    CMD.props,
    data,
    args
  ).catch(async (error) => {
    knex("users")
      .where({ action: 1, id: message.author.id })
      .update({ action: 0 })
    console.error(error)
    console.log(`${error.message}:${error.lineNumber}`)
    let code = uuid()
    let time = Math.round(new Date() / 1000)
    embed.addField(
      `ERROR - ${client.user.username}`,
      locale.error.debug.bind({
        code,
        user: message.author.tag,
        userid: message.author.id,
        channel: message.channel.name,
        channelid: message.channel.id,
        url: message.url,
        error: error.stack,
        cmd: message.data.cmd,
        msg:
          message.content.length > 1000
            ? message.content.replace(0, 1000) + "\n..."
            : message.content,
        time: new Date(time * 1000).format("ko"),
        perm: message.guild.me.permissions.bitfield,
        guild: message.guild.name,
        guildid: message.guild.id,
      })
    )
    message.reply(locale.error.onerror.random().bind({ code }))
    client.errorwebhook.send(embed)
  })
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}