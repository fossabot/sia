    module.exports.execute = async (
        client,
        message,
        locale,
        embed,
        _tools,
        knex
      ) => {
        const axios = require('axios')
        axios.get("http://hangang.dkserver.wo.tc/").then(function (x) {
        message.channel.send(locale.wait).then((m) => {
          let C = x.data.temp
          knex("users")
            .select("*")
            .limit(1)
            .then(() => {
              embed.addField(
                locale.commands.river.this,
                locale.commands.river.return.bind({
                  river: C,
                })
              )
              m.edit({ content: message.member, embed })
            })
        })
        })
      }
      module.exports.props = {
        name: "river",
        perms: "general",
        alias: ["한강", "river"],
        args: [],
      }