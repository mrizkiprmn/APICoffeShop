const {Pool} = require("pg")

const db = new Pool({
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    host: "localhost",
    user: process.env.DBUSER

})

module.exports = db