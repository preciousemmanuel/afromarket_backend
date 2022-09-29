'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Products", deps: [Merchants, Categories]
 *
 **/

var info = {
    "revision": 2,
    "name": "product",
    "created": "2022-09-26T10:03:10.664Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Products",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "unique": true,
                "primaryKey": true
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name"
            },
            "picture": {
                "type": Sequelize.STRING,
                "field": "picture"
            },
            "picture_2": {
                "type": Sequelize.STRING,
                "field": "picture_2"
            },
            "picture_3": {
                "type": Sequelize.STRING,
                "field": "picture_3"
            },
            "description": {
                "type": Sequelize.STRING,
                "field": "description"
            },
            "quantity_available": {
                "type": Sequelize.INTEGER,
                "field": "quantity_available",
                "defaultValue": 1
            },
            "price": {
                "type": Sequelize.INTEGER,
                "field": "price"
            },
            "isapproved": {
                "type": Sequelize.BOOLEAN,
                "field": "isapproved",
                "defaultValue": false
            },
            "ratings": {
                "type": Sequelize.INTEGER,
                "field": "ratings"
            },
            "created_at": {
                "type": Sequelize.DATE,
                "field": "created_at",
                "allowNull": false
            },
            "updated_at": {
                "type": Sequelize.DATE,
                "field": "updated_at",
                "allowNull": false
            },
            "MerchantId": {
                "type": Sequelize.UUID,
                "field": "MerchantId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Merchants",
                    "key": "id"
                },
                "allowNull": true
            },
            "CategoryId": {
                "type": Sequelize.UUID,
                "field": "CategoryId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Categories",
                    "key": "id"
                },
                "allowNull": true
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
