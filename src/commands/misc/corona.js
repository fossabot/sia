module.exports.execute = async (
  client,
    message,
    locale,
    embed,
    _tools,
    knex
    ) => {
      message.channel.send(locale.commands.corona.wait).then( async (m) => {
      const covid = require("covid19-korea")
      knex("users")
        .select("*")
        .limit(1)
        .then( async () => {
          if(!message.data.arg[0]) {
          const corona = await covid.getTotal()
          embed.addField(
            locale.commands.corona.this,
            locale.commands.corona.return.bind({
              confirm:corona[0].confirm,
              cure: corona[0].cure,
              curing: corona[0].curing,
              dead: corona[0].dead,
              accumlate: corona[0].accumlate,
            })
          )
          return m.edit({ content: message.member, embed })
        }
         if (message.data.arg[0]){
        const corona = await covid.getTotal(message.data.arg[0])
        embed.addField(
            locale.commands.corona.this,
            locale.commands.corona.returncity.bind({
              confirm:corona[0].confirm,
              cure: corona[0].cure,
              curing: corona[0].curing,
              dead: corona[0].dead,
              accumlate: corona[0].accumlate,
              incidence: corona[0].incidence,
            })
          )
          
            return m.edit({content: message.member, embed})
          }
        }
        
      )})
  }
  module.exports.props = {
    name: "corona",
    perms: "general",
    alias: ["코로나", "corona"],
    args: [],
  }
/*서울
  부산
  대구
  인천
  광주
  대전
  울산
  세종
  경기
  강원
  충북
  충남
  전북
  전남
  경북
  경남
  제주*/