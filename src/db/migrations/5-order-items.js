'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "OrderedItems", deps: [Orders]
 *
 **/

var info = {
    "revision": 5,
    "name": "order-items",
    "created": "2022-09-26T10:06:13.201Z",
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
            "product_id": {
                "type": Sequelize.INTEGER,
                "field": "product_id"
            },
            "product_name": {
                "type": Sequelize.STRING,
                "field": "product_name",
                "allowNull": false
            },
            "quantity_ordered": {
                "type": Sequelize.INTEGER,
                "field": "quantity_ordered",
                "defaultValue": 1
            },
            "price": {
                "type": Sequelize.INTEGER,
                "field": "price",
                "defaultValue": false
            },
            "total": {
                "type": Sequelize.INTEGER,
                "field": "total",
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
