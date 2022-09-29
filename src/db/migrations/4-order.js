'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Orders", deps: [Users]
 *
 **/

var info = {
    "revision": 4,
    "name": "order",
    "created": "2022-09-26T10:05:44.393Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Orders",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "defaultValue": Sequelize.UUIDV4,
                "unique": true,
                "primaryKey": true
            },
            "items": {
                "type": Sequelize.STRING,
                "field": "items"
            },
            "isPaid": {
                "type": Sequelize.BOOLEAN,
                "field": "isPaid",
                "defaultValue": false
            },
            "payment_type": {
                "type": Sequelize.ENUM('pay-now', 'on-delivery'),
                "field": "payment_type",
                "defaultValue": "on-delivery"
            },
            "order_cost": {
                "type": Sequelize.INTEGER,
                "field": "order_cost",
                "defaultValue": 0
            },
            "delivery_type": {
                "type": Sequelize.ENUM('door_delivery', 'pickup_station'),
                "field": "delivery_type",
                "defaultValue": "door_delivery"
            },
            "delivery_address": {
                "type": Sequelize.STRING,
                "field": "delivery_address",
                "allowNull": false
            },
            "delivery_date": {
                "type": Sequelize.DATE,
                "field": "delivery_date"
            },
            "customer_contact": {
                "type": Sequelize.STRING,
                "field": "customer_contact"
            },
            "status": {
                "type": Sequelize.ENUM('canceled', 'active', 'delivered', 'disputed'),
                "field": "status",
                "defaultValue": "active"
            },
            "trackingId": {
                "type": Sequelize.STRING,
                "field": "trackingId"
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
            "UserId": {
                "type": Sequelize.UUID,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
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
