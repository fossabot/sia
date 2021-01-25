const config = require("./index")
const perm = [
  {
    name: "general",
    required: {
      perms: [],
    },
  },
  {
    name: "관리자",
    required: {
      perms: ["ADMINISTRATOR"],
    },
  },
  {
    name: "멤버 차단하기",
    required: {
      perms: ["BAN_MEMBERS"],
    },
  },
  {
    name: "멤버 추방하기",
    required: {
      perms: ["KICK_MEMBERS"],
    },
  },
  {
    name: "메시지 관리",
    required: {
      perms: ["MANAGE_MESSAGES"],
    },
  },
  {
    name: "채널 관리하기",
    required: {
      perms: ["MANAGE_CHANNELS"],
    },
  },
  {
    name: "개발자",
    required: {
      perms: [],
      id: config.client.owners,
    },
  },
]
module.exports = perm
