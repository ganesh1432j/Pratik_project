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