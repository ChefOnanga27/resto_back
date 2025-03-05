const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assurez-vous que votre fichier de configuration est correct

const Recette = sequelize.define('Recette', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  preparationTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
}, {
  timestamps: true,
  tableName: 'recettes', // Nom de la table en base de données
});

module.exports = Recette;
