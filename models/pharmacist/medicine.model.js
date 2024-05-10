const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db');

const Medicine = sequelize.define('Medicine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

Medicine
  .sync()
  .then(() => {
    console.log("Medicine model synchronized with the database");
  })
  .catch((error) => {
    console.error("Failed to sync Medicine model:", error);
  });

module.exports = Medicine;
