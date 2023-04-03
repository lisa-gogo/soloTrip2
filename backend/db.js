const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password : "12345678",
    host:"shareroom.ckrqj9sxgvaw.us-east-1.rds.amazonaws.com",
    port: 5432,
   database: "shareroom"
})

module.exports = pool;

// client.connect();

// client.query("Select * from users")
