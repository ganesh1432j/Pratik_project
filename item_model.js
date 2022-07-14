module.exports = (db) => db.define(

    "items",

    {

        id: {

            type: Sequelize.INTEGER,

            allowNull: false,

            primaryKey: true,

            autoIncrement: true, // id is automatically incrementing with unique integers

        },

        title: {

            type: Sequelize.STRING,

            allowNull: false,

        },

        stage: {

            type: Sequelize.INTEGER,

            allowNull: false,

        },

    },

    {

        timestamps: false,

        freezeTableName: true,

    }

);