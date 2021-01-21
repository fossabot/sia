const config = require("./index")
const perm = [
  {
    name: "general",
    required: {
      perms: [],
    },
  },
  {
    name: "admin",
    required: {
      perms: ["ADMINISTRATOR"],
    },
  },
  {
    name: "ban",
    required: {
      perms: ["BAN_MEMBERS"],
    },
  },
  {
    name: "kick",
    required: {
      perms: ["KICK_MEMBERS"],
    },
  },
  {
    name: "clear",
    required: {
      perms: ["MANAGE_MESSAGES"],
    },
  },
  {
    name: "dev",
    required: {
      perms: [],
      id: config.client.owners,
    },
  },
]
module.exports = perm
