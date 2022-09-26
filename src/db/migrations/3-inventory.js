'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Inventories", deps: [Merchants]
 *
 **/

var info = {
    "revision": 3,
    "name": "inventory",
    "created": "2022-09-26T10:03:41.024Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Inventories",
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
                "field": "picture",
                "allowNull": false
            },
            "picture_2": {
                "type": Sequelize.STRING,
                "field": "picture_2",
                "allowNull": false
            },
            "picture_3": {
                "type": Sequelize.STRING,
                "field": "picture_3",
                "allowNull": false
            },
            "description": {
                "type": Sequelize.STRING,
                "field": "description",
                "allowNull": false
            },
            "category": {
                "type": Sequelize.STRING,
                "field": "category",
                "allowNull": false
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
            "invertory_owner": {
                "type": Sequelize.STRING,
                "field": "invertory_owner"
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
