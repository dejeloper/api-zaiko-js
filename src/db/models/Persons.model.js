const { Model, DataTypes, Sequelize } = require("sequelize");

const PERSONS_TABLE = "Persons";

const PersonsSchema = {
  Id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  DocumentType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: "TypesDocument",
    //   key: "Id",
    // },
  },
  DocumentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  DateBirthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  State: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: "StatesPersons",
    //   key: "Id",
    // },
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

class Persons extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSONS_TABLE,
      modelName: "Persons",
      timestamps: false,
    };
  }
}

module.exports = {
  PersonsSchema,
  PERSONS_TABLE,
  Persons,
};
