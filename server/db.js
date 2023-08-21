const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgress",
    password:"123abc",
    host:"localhost",
    port: 5001,
    database: "perntodo"
});

module.exports = pool;