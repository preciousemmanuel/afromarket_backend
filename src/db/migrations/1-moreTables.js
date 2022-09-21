'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Merchants", deps: []
 * createTable "Users", deps: []
 * createTable "Orders", deps: [Users]
 * createTable "Products", deps: [Merchants]
 *
 **/

var info = {
    "revision": 1,
    "name": "moreTables",
    "created": "2022-09-20T21:05:24.402Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Merchants",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "isVerified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isVerified",
                    "defaultValue": false
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "fullName": {
                    "type": Sequelize.STRING,
                    "field": "fullName"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "phone_number": {
                    "type": Sequelize.STRING,
                    "field": "phone_number",
                    "allowNull": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "isVerified": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isVerified",
                    "defaultValue": false
                },
                "isBlocked": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isBlocked",
                    "defaultValue": false
                },
                "refreshTokens": {
                    "type": Sequelize.STRING,
                    "field": "refreshTokens"
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
                }
            },
            {}
        ]
    },
    {
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
                    "field": "items",
                    "allowNull": false
                },
                "isPaid": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isPaid",
                    "defaultValue": false
                },
                "payment_type": {
                    "type": Sequelize.ENUM('pay-now', 'on-delivery'),
                    "field": "payment_type"
                },
                "order_cost": {
                    "type": Sequelize.INTEGER,
                    "field": "order_cost",
                    "defaultValue": 0
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
    },
    {
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
