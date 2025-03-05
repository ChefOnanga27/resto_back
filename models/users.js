const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/default-avatar.png',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'utilisateur', // Par défaut, un utilisateur est un utilisateur classique
    validate: {
      isIn: [['utilisateur', 'admin']], // Rôle valide : soit utilisateur, soit admin
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
