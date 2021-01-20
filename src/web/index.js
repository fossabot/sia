const path = require("path")
const viewsPath = path.join(__dirname, "./views")
const express = require("express")
const app = express()

app.use(express.static(__dirname + "/public"))
app.set("views", viewsPath)
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/", require("./list"))

app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})