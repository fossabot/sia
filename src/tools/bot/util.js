let canvas = require('canvas')
const Canvas = require('canvas')
function createServerImg(text) {
    canvas = Canvas.createCanvas(200, 200)
    var context = canvas.getContext('2d')
    context.beginPath()
    context.rect(0, 0, 200, 200)
    context.fillStyle = '#7289DA'
    context.fill()
    context.fillStyle = 'white'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, 100, 100, 200)
    return canvas.toBuffer()
}
function status(name, tools, locale){
    const emoji = tools.lib.emojis
    let a; let b; let c
    a=name.toString().toLowerCase()
    if(a === 'online') { b = emoji.online; c=locale.commands.userinfo.online }
    else if(a === 'idle') { b = emoji.idle; c=locale.commands.userinfo.idle }
    else if(a === 'dnd') { b = emoji.dnd;c=locale.commands.userinfo.dnd }
    else if(a === 'offline') { b = emoji.offline;c=locale.commands.userinfo.offline }
    else{ b = emoji.streaming; c=locale.commands.userinfo.streaming }                   
    return `${b} ${c}`
}
function getClient(presence,callback){
    const platform =  {
        'desktop': '🖥️ 컴퓨터',
        'mobile': '📱 모바일',
        'web': '🌐 웹'
    }
    if(presence ===null) return callback(null)
    let text = Object.keys(presence).map(el=> platform[el]).join('\n')
    callback(text)
}
module.exports.createServerImg = createServerImg
module.exports.status = status
module.exports.getClient = getClient