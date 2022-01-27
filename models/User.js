const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        user_WIP: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
    }
);

module.exports = User;