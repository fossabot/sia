const moment = require("moment")
require("moment-duration-format")
module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
    message.channel.send(locale.wait).then((m) => {
        
        var duration = moment.duration(client.uptime).format(" D [일] H [시간] m [분] s [초]")
        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
        ];
        
        Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
        knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
              locale.commands.botinfo.this,
            locale.commands.botinfo.return.bind({
                name: client.user.tag,
                site: "https://naver.com",
                github: "https://github.com/kyjkyj080115/sia",
                koreanbots: "https://naver.com",
                ram: ram,
                uptime: duration,
                guilds: totalGuilds,
                user: totalMembers,
            })
          )
  
          m.edit({ content: locale.commands.ping.pong, embed })
        })
    })
})
}
module.exports.props = {
    name: "botinfo",
    perms: "general",
    alias: ["봇정보", "botinfo"],
    args: [],
  }