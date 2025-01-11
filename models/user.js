const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Zorg ervoor dat je databaseconfiguratie correct is

const User = sequelize.define('User', {

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true, // Alleen letters toegestaan
            notEmpty: true, // Mag niet leeg zijn
        },
     },
     age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true, // Alleen gehele nummers toegestaan
            min: 0, // Minimumwaarde
        },
     },     
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validatie voor een geldig e-mailadres
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users', // Tabelnaam in de database
  timestamps: true, // Creëert automatisch velden createdAt en updatedAt
});


module.exports = User;
