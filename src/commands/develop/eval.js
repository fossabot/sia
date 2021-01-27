module.exports.execute = async (
  client,
  message,
  locale,
  embed,
  tools,
  knex,
  props,
  data
) => {
  if (!message.data.args) return message.reply(locale.error.usage(message.data.cmd, message.data.prefix))
  if ( message.data.args.includes('client.token') && message.data.args.includes('message')) {
      return message.channel.send('토큰을 외부로 노출하실 수 없습니다.')
  }
  if ( message.data.args.includes('webhook.token') && message.data.args.includes('client')) {
      return message.channel.send('웹훅 토큰을 외부로 노출하실 수 없습니다.')
  }
  if ( message.data.args.includes('webhook.id') && message.data.args.includes('client')) {
      return message.channel.send('웹훅 아이디를 외부로 노출하실 수 없습니다.')
  }
  message.reply(locale.wait).then(async m => {
      const result = new Promise(resolve => resolve(eval(message.data.args)))
      return result
          .then( async (output) => {
              if (typeof output !== 'string')
                  output = require('util').inspect(output, {
                      depth: 0
                  })
              if (output.includes(client.token))
                  output = output.replace(new RegExp(client.token, 'gi'), '(accesstoken was hidden)')
              if (output.length > 1500)
                  console.log(output), (output = output.slice(0, 1500) + '\n...')
              return m.edit('**INPUT**\n```js\n' + message.data.args + '```\n**OUTPUT**\n```js\n' + output + '```')
          })
          .catch(error => {
              error = error.toString()
              if (error.includes(client.token))
                  error = error.replace(new RegExp(client.token, 'gi'), '(accesstoken was hidden)')
              if (error.length > 1500)
                  console.log(error), (error = error.slice(0, 1500) + '\n...')
              return m.edit('**INPUT**\n```js\n' + message.data.args + '```\n**OUTPUT**\n```js\n' + error + '```')

          })
  })
}
module.exports.props = {
        name: "eval",
        perms: "개발자",
        alias: ["실행", "eval"],
        args: [
    {
        name: 'script',
        type: 'text'
    }
  ],
  hide: true,
}