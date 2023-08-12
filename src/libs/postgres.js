const { Pool } = require("pg");
const URI = require("./URI");

const pool = new Pool({ connectionString: URI });

module.exports = pool;
