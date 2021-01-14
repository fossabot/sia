  module.exports.execute = async (
    client,
    message,
    locale,
    embed,
    _tools,
    knex
  ) => {
      
   core:  async (bot) => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                // const $ = cheerio.load(body)
                let info = '', text1 = '', text2 = '', text3 = '';

                let oversea = response.body.split('DP_data.oversea.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 해외 유입
                let region = response.body.split('DP_data.region.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 국내 발생
                let date = response.body.split('DP_data.date.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 날짜
                let covidList = `\`\`\`md\n`;
                covidList += `# 코로나 기록\n`;
                covidList += `[날짜][신규확진자] <해외유입 국내발생>\n`;
                covidList += date.map((x, i) => {
                    if (i + 1 == date.length) {
                        info = "누적 확진자 현황 : \`\`" + '(' + x + '. 00시 기준)' + "\`\`";
                        text1 = "신규 확진자 : \`\`+ " + (parseInt(oversea[i]) + parseInt(region[i])) + "\`\`";
                        text2 = "해외유입 : \`\`" + oversea[i] + "\`\`";
                        text3 = "국내발생 : \`\`" + region[i] + "\`\`";
                    }
                    return `[2021.${x}][${parseInt(oversea[i]) + parseInt(region[i])}] <${oversea[i]} ${region[i]}>`;
                }).join('\n')
                covidList += `\`\`\``;

                resolve(`${info}\n\n${text1}\n${text2}\n${text3}\n\n${covidList}`);
            })
        });
    },
    
  
    message.channel.send(locale.wait).then( async (m) => {
        let a = await module.exports.core(bot)
      knex("users")
        .select("*")
        .limit(1)
        .then(() => {
          embed.addField(
            locale.commands.covid.this,
            locale.commands.covid.return.bind({
                covid: a,
            })
          )
  
          m.edit({ embed: embed })
        })
    })
  }
  module.exports.props = {
    name: "코로나",
    perms: "general",
    alias: ["코로나", "covid"],
    args: [],
  }