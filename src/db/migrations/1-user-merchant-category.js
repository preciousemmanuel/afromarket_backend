'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Merchants", deps: []
 * createTable "Categories", deps: []
 * createTable "Users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "user-merchant-category",
    "created": "2022-09-26T10:02:22.527Z",
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
                "business_name": {
                    "type": Sequelize.STRING,
                    "field": "business_name"
                },
                "business_type": {
                    "type": Sequelize.ENUM('public limited company', 'private limited company'),
                    "field": "business_type",
                    "defaultValue": "public limited company"
                },
                "business_description": {
                    "type": Sequelize.STRING,
                    "field": "business_description"
                },
                "bank_verification_number": {
                    "type": Sequelize.INTEGER,
                    "field": "bank_verification_number"
                },
                "cac_document": {
                    "type": Sequelize.STRING,
                    "field": "cac_document"
                },
                "tax_id_number": {
                    "type": Sequelize.INTEGER,
                    "field": "tax_id_number"
                },
                "brand_image": {
                    "type": Sequelize.STRING,
                    "field": "brand_image"
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
            "Categories",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
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
                "delivery_address": {
                    "type": Sequelize.STRING,
                    "field": "delivery_address"
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
