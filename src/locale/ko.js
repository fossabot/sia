const Inko = require("inko")
const inko = new Inko()

const config = require("../config")
const commands = require("../commands/index.js")

module.exports = {
  language: {
    english: "Korean",
    native: "한국어",
    code: "ko",
  },
  commands: {
    help: {
      CMDDESC: "도움말 명령어를 표시합니다.",
      noCommand: "해당 명령어는 존재하지 않습니다.",
      commandInfo: "명령어 정보 - {cmd}",
      description: "명령어 설명",
      usage: "명령어 사용법",
      other: "명령어의 다른 이름들",
      docs: "문서",
      nodoc: "문서가 존재하지 않습니다.",
      help: "안녕하세요, 리아 봇입니다!",
      desc:
        "봇을 이용해주셔서 감사합니다. 해당 봇은 [원더 봇 오픈소스](https://github.com/wonderlandpark/wonderbot)를 기반으로 제작되었습니다.",
      more: "자세한 도움말보기",
      moreDesc:
        "`{prefix}도움 [명령어]`로 명령어의 사용법을 자세하게 알아볼 수 있습니다.",
      support: "유용한 링크",
      links: "[준비중](https://naver.com/)",
    },
    ping: {
      CMDDESC: "봇의 지연시간을 확인합니다.",
      pong: "퐁!",
      this: "🏓 퐁!",
      return:
        "봇 지연시간: {botLatency}ms\nAPI 지연시간: {APILatency}ms\nDB 쿼리 지연시간: {DBLatency}ms",
    },
    profile: {
        CMDDESC: "유저의 프로필을 보여줍니다.",
        this: "프로필",
        return: 
        "{user}님의 프로필입니다.",
    },
    choose: {
        CMDDESC: "여러개의 단어중 한개를 고릅니다.",
        this: "골라",
        return: "저는 {result}가 좋은거 같습니다\n단어리스트\n{lsit}",
    },
    covid: {
        CMDDESC: "대한민국 코로나 정보를 보여줍니다.",
        this: "코로나",
        return:
        "{covid}",
    },
    river: {
        CMDDESC: "한강 수온을 보여줍니다.",
        this: "한강",
        return: 
        "현재 한강온도: \`{river}℃\`입니다."
    },
    eval: {
        CMDDESC: "개발자 전용 명령어",
        this: "실행",
        return:
        "input\n\`\`\`js\n{commands}\`\`\`\noutput\`\`\`js\n{result})}\`\`\`\nType of\`\`\`{type}\`\`\`"
    },
    black: {
      CMDDESC: "개발자 전용 명령어",
      this: "블랙",
      return: 
      "이름 : {name}\n사유 : {reason}\n아이디 : {id}\n날짜: {time}\n처리자: {dev}"
    },
    ban: {
      CMDDESC: "유저를 밴합니다",
      this: "밴",
      return: 
      "{user} 을(를) 밴하였습니다.\n 사유 : {reason}",
    },
    clear: {
      CMDDESC: "메시지를 삭제합니다",
      this: "삭제",
      return: 
      "개의 메시지를 삭제하셨습니다!\n 이 메시지는 3초뒤 사라집니다",
    },
    kick: {
      CMDDESC: "유저를 킥합니다",
      this: "킥",
      return:
      "{user} 을(를) 킥하였습니다.\n 사유 : {reason}",
    },
     register: {
      CMDDESC: "봇 서비스에 가입합니다.",
      message:
        "이미 가입하셨습니다. 데이터 초기화 및 계약 철회는 {contact} 에서 하실 수 있습니다.",
      contact: "미지원",
      register: "가입하기",
      tos: "이용약관",
      privacy: "개인정보취급방침",
      to: "바로가기",
      yet:
        "<:service:792301678480326656> 아직 약관에 동의하지 않으셨습니다.\n해당 채널에 `동의합니다.`를 입력하시면 모든 약관을 수락하신걸로 간주됩니다.",
      start: "봇을 이용하시려면 반드시 다음 약관에 동의하셔야합니다.",
      code: "동의합니다.",
      timeout: "시간이 초과되어 취소되었습니다.",
      thanks:
        "봇의 약관을 동의해주셔서 감사합니다! 이제 모든 기능을 이용하실 수 있습니다.",
    },
    link: {
      tos: "https://naver.com",
      privacy: "https://youtube.com/",
    },
  },
  wait: "잠시만 기다려주세요.",
  error: {
    nodesc: "설명이 없습니다.",
    toLong: "출력 결과가 너무 길어 출력할 수 없습니다.",
    offline:
      "봇이 점검중입니다. 지금은 이용하실 수 없습니다. 불편을 드려 죄송합니다.\n예상된 점검 및 공지는 지원 서버에서 확인해주세요.\nhttps://discord.gg/bPNdfeUT7M",
    debug:
      "[{time}]\n**LIAH ERROR** - `{code}`\nCMD : `{cmd}`\nUSER : `{user}` (`{userid}`)\nGUILD : `{guild}` (`{guildid}`)\nCHANNEL : `{channel}`(`{channelid}`)\nURL : {url} \n```js\n{error}\n```\n DESC : \n```fix\nMSG CONTENT : {msg}\nBOT PERM : {perm}\n```",
    onerror: [
      "의도치않은 오류가 발생되었어요. 오류는 다음과 같아요.\n`{code}`",
    ],
    noperm: "당신은 이 명령어를 실행할 권한이 없습니다.\n요구 권한 : {perms}",
    process: "이미 해당 작업을 진행중입니다. 작업을 마치고 실행해 주세요.",
    more: "저보다 돈도 많은 양반이 너무 조금 거는거아니에요?",
    blacklist:
      "당신은 시아 서비스 사용이 금지되었습니다.\n사유 : {reason}\n문의 및 이의 제기는 [여기](https://discord.gg/bPNdfeUT7M) 에서 하실 수 있습니다.",
    cooldown:
      "명령어 사용이 쿨타임중입니다.\n`{time}`초 후에 사용 가능합니다\n쿨타임에 대해 더 알고 싶으시다면 `{prefix}쿨타임` 명령어를 사용하세요.",
    botperm: "이 명령어를 실행하기 위해서는 봇에게 {perms} 권한이 요구됩니다.",
    timeout: "시간이 초과되어 취소되었습니다.",
    nouser: "가입되어있지 않은 유저입니다.",
    already: "다른 작업이 진행중입니다. 작업을 완료한 후 명령어를 시도하세요.",
    usage: function (cmd, prefix) {
      var text = ""
      var desc = ""
      var args = (
        commands[cmd] ||
        commands[inko.en2ko(cmd)] ||
        commands[inko.ko2en(cmd)]
      ).props.args
      args.forEach((a) => {
        if (!a.type) return
        if (a.required) {
          text += `[${a.options ? a.options.join("|") : usageNames[a.name]}] `
          desc += `[${usageNames[a.name]} - ${
            usageNames[a.type.toString()]
          }](필수)\n`
        } else {
          text += `(${a.options ? a.options.join("|") : usageNames[a.name]})`
          desc += `[${usageNames[a.name]} - ${usageNames[a.type.toString()]}]\n`
        }
      })
      if (text.length === 0) {
        text += "(없음)"
        desc += "요구된 변수가 없습니다."
      }
      return `사용법 : \n\`\`\`fix\n${prefix}${cmd} ${text}\`\`\` \`\`\`ini\n${desc}\`\`\`
        `
    },
  },
}

const usageNames = {
    option: '옵션',
    number: '숫자',
    money: '돈',
    text: '텍스트',
    user: '유저',
    stock: '아이템',
    count: '수량',
    script: '스크립트',
    'user/text': '유저 또는 텍스트',
    delivery: '택배사',
    bill: '운송장',
    item: '아이템',
    botid: '봇 아이디',
    perm: '권한',
    'user/id': '유저 또는 아이디',
    gamemode: '게임모드',
    battletag: '배틀태그',
    city: '도시명',
    reason: '사유',
    channel: '채널',
    warnlimt: '경고 한도',
    cmd: '명령어',
    address: '주소',
    season: '시즌',
    periodic: '원소기호',
    bet: '배팅금',
    seconds: '시간(초)',
    currency: '변환할 화폐단위',
    iso4217: 'ISO 4217 코드',
    fromMoney: '변환할 금액',
    moneyresolvable: '숫자+화폐단위',
    prefix: '변경할 접두사',
    sender: '전송자',
    station: '역명',
    domain: '도메인',
    word: '단어',
}