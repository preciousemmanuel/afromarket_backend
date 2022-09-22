'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "OrderedItems", deps: [Orders]
 * changeColumn "items" on table "Orders"
 *
 **/

var info = {
    "revision": 4,
    "name": "orderedItems",
    "created": "2022-09-21T08:48:54.700Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "OrderedItems",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "productName": {
                    "type": Sequelize.STRING,
                    "field": "productName",
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price",
                    "defaultValue": false
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
                "OrderId": {
                    "type": Sequelize.UUID,
                    "field": "OrderId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Orders",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Orders",
            "items",
            {
                "type": Sequelize.STRING,
                "field": "items",
                "allowNull": false
            }
        ]
    }
];

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
