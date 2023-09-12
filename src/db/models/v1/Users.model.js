const { Model, DataTypes, Sequelize } = require("sequelize");

const USERS_TABLE = "Users";

const UsersSchema = {
  Id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  Username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  State: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  DateCreated: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  UserCreated: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: "Admin",
  },
  DateUpdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  UserUpdate: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
};

class UsersModel extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: "Users",
      timestamps: false,
    };
  }
}

module.exports = {
  UsersSchema,
  USERS_TABLE,
  UsersModel,
};
