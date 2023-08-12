const { config } = require("../config/config");

const USER = encodeURIComponent(config.user_db);
const PASS = encodeURIComponent(config.password_db);
const URI = `postgresql://${USER}:${PASS}@${config.host_db}:${config.port_db}/${config.name_db}`;

module.exports = URI;
