require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("POSTGRES_DIALECT:", process.env.POSTGRES_DIALECT); // Verifica si se carga correctamente

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  dialect: String(process.env.POSTGRES_DIALECT), // Asegúrate de que el dialecto esté especificado como un string
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
