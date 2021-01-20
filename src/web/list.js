const express = require("express")
const router = express.Router()
const Discord = require("discord.js")
const client = new Discord.Client()
const config = require('../config')
const knex = require("knex")(config.database)
client.login(config.client.token)

router.get("/", async function (_req, res) {
  let posts = await knex("total").select("*")
  res.render("index.ejs", { posts: posts, client: client, })
})
module.exports = router