require("dotenv").config();
require("dotenv").config({ path: `.env.local`, override: true });

const config = {
  env: process.env.NODE_ENV || "local",
  port: process.env.PORT || "300",
  host_db: process.env.HOSTDB || "localhost",
  port_db: process.env.PORTDB || "5432",
  user_db: process.env.USERDB,
  password_db: process.env.PASSDB,
  name_db: process.env.NAMEDB || "zaiko_db",
};

module.exports = { config };
