# Pratik_project
index.js:

const express = require('express');

const bodyParser = require('body-parser');

const db = require('./DB_Sequelize/connection');

const Item = require('./DB_Sequelize/Item_model')(db);

let router = express.Router();

let app = express();

app.use(router)

 

 

app.use(bodyParser.json())

app.listen(3000, () => {

    console.log('server listening');

});

 

 

// POST request

app.post('/boards', (req, res)=> {

    let insertObject = {

        title: req.body.title,

        stage: 1 // setting stage as 1 for every newly creating item

    };

 

    Item.create(insertObject).then(data => {

        Item.findByPk(data.id).then(itemData => {

            // sending 201 status code with newly created item details

            res.status(201).send(itemData.dataValues);

        });

    });

});

 

// PUT request

app.put('/boards/:id', (req, res) => {

    // checking the 'stage' value is between 1 to 3

    if(req.body.stage >= 1 && req.body.stage <= 3) {

        Item.update(req.body, {

            where: {id: req.params.id}

        }).then(data => {

            Item.findByPk(req.params.id).then(itemData => {

                // sending 200 status code with updated item details

                res.status(200).send(itemData.dataValues);

            });

        })

 

    } else {

        // sending 400 status code with empty response

        res.status(400).send();

    }

});

Co@ V KANBAN_BOARD v node_task > DB_Sequelize () config.json JS index.js () package.json U ou WN M ΣΣ M 13 node_task > JS ind

 

config.json:

{

    "database": {

        "host": "localhost",

        "user": "<username>",

        "password": "<password>",

        "database": "<db name>"

    }

}

KANBAN_BOARD v node_task > DB_Sequelize {} config.json Js index.js { } package.json node_task > {} config.json > {} database 

 

package.json:

{

  "name": "task",

  "version": "1.0.0",

  "description": "",

  "main": "index.js",

  "scripts": {

  },

  "author": "",

  "license": "ISC",

  "dependencies": {

    "body-parser": "^1.20.0",

    "express": "^4.17.3",

    "mysql2": "^2.3.3",

    "sequelize": "^6.19.0"

  }

}

V KANBAN_BOARD 1 HN m node_task > DB_Sequelize {} config.json JS index.js {} package.json 4 3 3 C 0 @ node_task > {} package.

 

DB_Sequelize:

connection.js:

const config = require('../config.json');

const Sequelize = require('sequelize');

 

    // you can configure your DB credentials in 'config.json'

const host = config.database.host;

const database = config.database.database;

const userName = config.database.user;

const password = config.database.password;

 

// local DB is connecting using 'Sequelize'

const sequelize = new Sequelize(database, userName, password, {

    host: host,

    dialect: 'mysql',

    logging: false,

});

 

sequelize.authenticate().then(() => console.log("Database connected"))

.catch(err => console.log("Error connecting database " + err));

 

module.exports = sequelize;

global.Sequelize = Sequelize;

V KANBAN_BOARD 1 v node_task DB_Sequelize JS connection.js JS Item_model.js {} config.json U node_task > DB_Sequelize > JS co

 

Item_model.js:

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
