const Inko = require("inko")
const inko = new Inko()
const commands = require("../commands/index.js")
module.exports = {
  language: {
    english: "Korean",
    native: "한국어",
    code: "ko",
  },
  global: {
    won: '원',
    sia: '시아',
    github: '비공개',
    me: '안녕하세요! 저는 **시아**입니다!\n저를 사용해주셔서 항상 감사합니다!',
    mail: '📬 `{mail}`통의 메일이 도착하였습니다. `{prefix}메일`로 메일을 확인해주세요.\n> 메일을 확인하지 않으시면, 24시간 뒤에 다시 알려드립니다.',
    event: {
        good: ['지나가던 행인이 당신에게 반해서 {add}원을 받았습니다', '길을 가다가 {add}원 짜리 수표 한 장을 주웠습니다.', '당신이 제작한 발가락 긁기 기계가 주목을 받아 {add}원을 받았습니다', '길을 가다 동전을 주워 {add}원을 획득했습니다'],
        sad: ['이런... 길을 가다가 {lost}원을 도둑 맞았습니다...', '저런... 수표 한 장이 물 속에 떨어져 {lost}원을 잃었습니다...', '이럴수가..! 사용하시던 원더은행의 데이터베이스가 해킹당해 {lost}원이 시공속으로 사라졌습니다.', '5252 믿고 있었다구... 오이맨의 최면에 걸려 {lost}원을 기부했습니다.', '디스코드 인기 아이돌 산군의 앨범을 사면서 {lost}원을 지불 했습니다']
    }
},
  commands: {
    help: {
      CMDDESC: "도움말 명령어를 표시합니다!",
      noCommand: "아쉽지만 해당 명령어는 존재하지 않습니다!",
      commandInfo: "명령어 정보 - {cmd}",
      description: "명령어 설명",
      usage: "명령어 사용법",
      other: "명령어의 다른 이름들",
      docs: "문서",
      nodoc: "문서가 존재하지 않습니다!",
      help: "안녕하세요, **시아**입니다!",
      desc:
        "봇을 이용해주셔서 감사합니다. 해당 봇은 [원더 봇 오픈소스](https://github.com/wonderlandpark/wonderbot)를 기반으로 제작되었습니다.",
      more: "자세한 도움말보기",
      moreDesc:
        "`{prefix}도움 [명령어]`로 명령어의 사용법을 자세하게 알아볼 수 있습니다!",
      support: "유용한 링크",
      links: "[준비중](https://naver.com/)",
    },
    ping: {
      CMDDESC: "봇의 지연시간을 확인합니다!",
      pong: "퐁!",
      this: "🏓 퐁!",
      return:
        "봇 지연시간: {botLatency}ms\nAPI 지연시간: {APILatency}ms\nDB 쿼리 지연시간: {DBLatency}ms",
    },
    profile: {
        CMDDESC: "유저의 프로필을 보여줍니다!",
        this: "프로필",
        return: 
        "{user}님의 프로필입니다!",
    },
    choose: {
        CMDDESC: "여러개의 단어중 한개를 고릅니다!",
        this: "골라",
        return: "저는 `{result}`가(이) 좋은거 같습니다!\n단어리스트\n{list}",
    },
    covid: {
        CMDDESC: "대한민국 코로나 정보를 보여줍니다!",
        this: "코로나",
        return:
        "{covid}",
    },
    river: {
        CMDDESC: "한강 수온을 보여줍니다!",
        this: "한강",
        return: 
        "현재 한강온도: \`{river}℃\`입니다!"
    },
     shardinfo: {
            current: '해당 길드 샤드 정보',
            desc:
        '#{id}번 샤드(분리 프로세스) \n```prolog\n#{id} : Guilds {guild}, Users about {user}, Ram {ram}MiB, Ping {ping}ms \n마지막 정보 패치: {last}```\n\n다른 샤드 정보도 디스코드에 표시하기는 너무 길군요 [이곳](https://wonderbot.xyz/shards) 에서 확인할 수 있습니다.'
        },
    userinfo: {
      gametypes: { PLAYING: '하는 중', LISTENING: '듣는 중', WATCHING: '보는 중', STREAMING: '방송 중' },
      online: '온라인',
      idle: '자리 비움',
      dnd: '다른 용무 중',
      offline: '오프라인 표시',
      streaming: '방송 중',
      more: '외 {count}개 더...',
      many: '여러개의 항목이 있습니다! 채팅창에 번호를 입력해주세요!   ',
      notvaild: '올바르지 않은 수에요..',
      numberto: '숫자는 1부터 {max}까지 입력 가능합니다!',
      timeout: '시간이 지나 취소되었습니다! 다시 시도해주세요!',
      nores: '검색결과가 없습니다!',
      username: '유저이름',
      game: '게임',
      nogame: '플레이중인 게임이 없습니다!',
      status: '상태',
      unknown: '알 수 없음',
      client: '클라이언트',
      command: '명령어 사용 수',
      created: '계정 생성일',
      joined: '서버 참여일',
      roles: '역할들',
      platform:  {
          'desktop': '🖥️ 데스크톱',
          'mobile': '📱 모바일',
          'web': '🌐 웹'
      }
  },
  serverinfo: {
    serverinfo: '🏘️ {guild} 서버 정보',
    memberCount: '멤버',
    memberDesc: '{user}명',
    verification: '보안 수준',
    verificationLevel: {'NONE': '**없음**\n제한 없음','LOW': '**낮음**\n자신의 Discord 계정이 이메일 인증을 받은 적이 있어야 합니다.', 'MEDIUM': '**중간**\n추가로 Discord에 가입한지 5분이 지나야 합니다.','HIGH': '**(╯°□°）╯︵ ┻━┻**\n추가로 이 서버의 멤버가 된 지 10분이 지나야 합니다.','VERY_HIGH': '**┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻**\n전화 인증이 완료된 Discord 계정이어야 합니다.'},
    region: '지역',
    channel: '채널',
    channelDesc: '텍스트채널: {text}개 / 카테고리: {category}개 / 음성채널: {voice}개',
    owner: '소유자',
    boost: '부스팅',
    boostDesc: '{count}개 부스트 / {level} 레벨',
    regionList : {
        brazil:':flag_br: 브라질', 
        'us-west':':flag_us: 미국 서부', 
        japan:':flag_jp: 일본', 
        singapore : ':flag_sg: 싱가포르', 
        'eu-central':':flag_eu: 유럽 중부', 
        hongkong:':flag_hk:  홍콩', 
        'us-south':':flag_us: 미국 중부', 
        southafrica:':flag_za: 남아프리카 공화국', 
        'us-central':':flag_us: 미국 중부', 
        'london':':flag_gb: 런던', 
        'us-east':':flag_us: 미국동부', 
        sydney:':flag_au: 시드니', 
        'eu-west':':flag_eu: 유럽 서부', 
        amsterdam:':flag_nl: 암스테레담', 
        india:':flag_in: 인도', 
        frankfurt:':flag_de: 프랑크푸르트', 
        russia: ':flag_ru: 러시아',
        'south-korea': ':flag_kr: 한국',
        'vip-us-east': ':flag_us: VIP 미국 동부'
    },
    filterName: '유해 미디어 콘텐츠 필터',
            filter: {'DISABLED': '**미디어 콘텐츠를 스캔하지 않아요!', 'MEMBERS_WITHOUT_ROLES': '**역할 없는 멤버의 미디어 콘텐츠를 스캔해요!**\n신뢰하는 멤버에게 역할을 부여하는 서버에 권장하는 옵션이에요!', 'ALL_MEMBERS': '**모든 멤버의 미디어 콘텐츠를 스캔해요.**\n아주 깨끗한 채팅 환경을 원할시 권장하는 옵션이에요!'},
            roles: '역할',
            emojis: '이모지',
            none: '없음',
            more: '외 {count}개 더...'
        },
    black: {
      CMDDESC: "개발자 전용 명령어",
      this: "블랙",
      return: 
      "이름 : {name}\n사유 : {reason}\n아이디 : {id}\n날짜: {time}\n처리자: {dev}"
    },
    ban: {
      CMDDESC: "유저를 밴합니다!",
      this: "밴",
      return: 
      "{user} 을(를) 밴하는데 성공하셨습니다!\n 사유 : {reason}",
    },
    clear: {
      CMDDESC: "메시지를 삭제합니다",
      this: "삭제",
      return: 
      "{number}개의 메시지를 삭제하셨습니다!\n 이 메시지는 3초뒤 사라집니다!",
    },
    kick: {
      CMDDESC: "유저를 킥합니다!",
      this: "킥",
      return:
      "{user} 을(를) 성공적으로 킥하셨습니다!\n 사유 : {reason}",
    },
    welcomechannel: {
      CMDDESC: "멤버가 입장했을때 메시지를 전송할 채널을 설정합니다!",
      this: "입장채널",
      return:
      "입장채널을 {name} 채널로 설정하였습니다!",
    },
    welcomemessage: {
      CMDDESC: "멤버가 입장했을때 보낼 메시지를 설정합니다!",
      this: "입장메시지",
      return: 
      "입장메시지를 \n`{text}`\n 로 설정했습니다!",
    },
    byechannel: {
      CMDDESC: "멤버가 퇴장했을때 메시지를 전송할 채널을 설정합니다!",
      this: "퇴장채널",
      return:
      "퇴장채널을 {name} 채널로 설정하였습니다!",
    },
    byemessage: {
      CMDDESC: "멤버가 퇴장했을때 보낼 메시지를 설정합니다!",
      this: "퇴장메시지",
      return: 
      "퇴장메시지를 \n`{text}`\n 로 설정했습니다!",
    },
     register: {
      CMDDESC: "봇 서비스에 가입합니다!",
      message:
        "이미 가입하셨습니다. 데이터 초기화 및 계약 철회는 {contact} 에서 하실 수 있습니다.",
      contact: "미지원",
      register: "가입하기",
      tos: "이용약관",
      privacy: "개인정보취급방침",
      to: "바로가기",
      yet:
        "아직 약관에 동의하지 않으셨습니다.\n해당 채널에 `동의합니다.`를 시간안에 입력하시면 모든 약관을 수락하신걸로 간주됩니다!",
      start: "봇을 이용하시려면 반드시 다음 약관에 동의하셔야합니다!",
      code: "동의합니다.",
      timeout: "시간이 초과되어 취소되었습니다.",
      thanks:
        "봇의 약관을 동의해주셔서 감사합니다! 이제 모든 기능을 이용하실 수 있습니다!",
    },
    link: {
      tos: "https://naver.com",
      privacy: "https://youtube.com/",
    },
  },
  wait: "잠시만 기다려주세요!",
  error: {
    nodesc: "설명이 없습니다!",
    toLong: "출력 결과가 너무 길어 출력할 수 없습니다!",
    offline:
      "봇이 점검중입니다. 지금은 이용하실 수 없습니다. 불편을 드려 정말 죄송합니다.\n예상된 점검 및 공지는 지원 서버에서 확인해주세요.\nhttps://discord.gg/bPNdfeUT7M",
    debug:
      "[{time}]\n**SIA ERROR** - `{code}`\nCMD : `{cmd}`\nUSER : `{user}` (`{userid}`)\nGUILD : `{guild}` (`{guildid}`)\nCHANNEL : `{channel}`(`{channelid}`)\nURL : {url} \n```js\n{error}\n```\n DESC : \n```fix\nMSG CONTENT : {msg}\nBOT PERM : {perm}\n```",
    onerror: [
      "의도치않은 오류가 발생되었어요. 지원서버 (<#798822814832394258>)에서 오류코드를 보여주시면 감사하겠습니다. \n지원서버: https://discord.gg/bPNdfeUT7M 오류코드는 다음과 같습니다.\n`{code}`",
    ],
    noperm: "당신은 이 명령어를 실행할 권한이 없습니다.\n요구 권한 : {perms}",
    process: "이미 해당 작업을 진행중입니다. 작업을 마치고 실행해 주세요!",
    more: "저보다 돈도 많으신 분이 너무 조금 거는거아니에요?ㅠㅠ",
    blacklist:
      "당신은 시아 서비스 사용이 금지되었습니다.\n사유 : {reason}\n문의 및 이의 제기는 지원서버에서 하실 수 있습니다.\n 지원서버 : https://discord.gg/bPNdfeUT7M",
    cooldown:
      "명령어 사용이 쿨타임중입니다.\n`{time}`초 후에 사용 가능합니다!",
    botperm: "이 명령어를 실행하기 위해서는 봇에게 {perms} 권한이 요구됩니다!",
    timeout: "시간이 초과되어 취소되었습니다.",
    nouser: "가입되어있지 않은 유저입니다.",
    already: "다른 작업이 진행중입니다. 작업을 완료한 후 명령어를 시도하세요!",
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
        desc += "요구된 변수가 없습니다!"
      }
      return `사용법 : \n\`\`\`fix\n${prefix}${cmd} ${text}\`\`\` \`\`\`ini\n${desc}\`\`\`
        `
    },
  },
  category: {
    siabot: '시아봇',
    dev: '개발자용',
    account: '계정',
    money: '돈',
    fun: '재미',
    game: '도박',
    utills: '기능',
    stats: '스텟',
    season: '시즌한정',
    moderation: '관리',
    reason: '사유'
},
perm: {
    CREATE_INSTANT_INVITE: '초대 코드 만들기',
    KICK_MEMBERS: '멤버 추방하기',
    BAN_MEMBERS: '멤버 차단하기',
    ADMINISTRATOR: '관리자',
    MANAGE_CHANNELS: '채널 관리하기',
    MANAGE_GUILD: '서버 관리하기',
    ADD_REACTIONS: '반응 추가하기',
    VIEW_AUDIT_LOG: '감사 로그 보기',
    PRIORITY_SPEAKER: '우선 발언권',

    VIEW_CHANNEL: '채널 보기',
    READ_MESSAGES: '메세지 읽기',
    SEND_MESSAGES: '메세지 보내기',
    SEND_TTS_MESSAGES: 'TTS 메세지 보내기',
    MANAGE_MESSAGES: '메세지 관리',
    EMBED_LINKS: '링크 첨부',
    ATTACH_FILES: '파일 첨부',
    READ_MESSAGE_HISTORY: '메세지 기록 보기',
    MENTION_EVERYONE: '모두 멘션하기',
    EXTERNAL_EMOJIS: '외부 이모티콘',
    USE_EXTERNAL_EMOJIS: '외부 이모티콘 사용하기',

    CONNECT: '연결',
    SPEAK: '말하기',
    MUTE_MEMBERS: '멤버들의 마이크 음소거하기',
    DEAFEN_MEMBERS: '멤버들의 헤드셋 음소거하기',
    MOVE_MEMBERS: '멤버 이동',
    USE_VAD: '음성 감지 사용',

    CHANGE_NICKNAME: '별명 변경하기',
    MANAGE_NICKNAMES: '별명 관리하기',
    MANAGE_ROLES: '역할 관리하기',
    MANAGE_ROLES_OR_PERMISSIONS: '역할 또는 권한 관리하기',
    MANAGE_WEBHOOKS: '웹훅 관리하기',
    MANAGE_EMOJIS: '이모티콘 관리하기'
}
}
const usageNames = {
    option: '옵션',
    mention: '맨션',
    number: '숫자',
    money: '돈',
    text: '텍스트',
    user: '유저',
    stock: '아이템',
    count: '수량',
    script: '스크립트',
    'user/text': '유저 또는 텍스트',
    channel: '채널',
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