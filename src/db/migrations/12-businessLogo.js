'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "fullName" from table "Merchants"
 * createTable "Trackers", deps: [Orders]
 * addColumn "brand_image" to table "Merchants"
 * addColumn "tax_id_number" to table "Merchants"
 * addColumn "cac_document" to table "Merchants"
 * addColumn "bank_verification_number" to table "Merchants"
 * addColumn "business_description" to table "Merchants"
 * addColumn "business_type" to table "Merchants"
 * addColumn "business_name" to table "Merchants"
 * addColumn "TrackerId" to table "Orders"
 * addColumn "customer_contact" to table "Orders"
 * addColumn "delivery_date" to table "Orders"
 * addColumn "delivery_address" to table "Orders"
 * addColumn "delivery_type" to table "Orders"
 * addColumn "delivery_address" to table "Users"
 * changeColumn "status" on table "Orders"
 *
 **/

var info = {
    "revision": 12,
    "name": "businessLogo",
    "created": "2022-09-24T19:18:58.271Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Merchants", "fullName"]
    },
    {
        fn: "createTable",
        params: [
            "Trackers",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "defaultValue": Sequelize.UUIDV4,
                    "unique": true,
                    "primaryKey": true
                },
                "status": {
                    "type": Sequelize.ENUM('order_placed', 'order_in_progress', 'order_shipped', 'order_out_for_delivery', 'order_id_delivered'),
                    "field": "status",
                    "defaultValue": "order_placed"
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
        fn: "addColumn",
        params: [
            "Merchants",
            "brand_image",
            {
                "type": Sequelize.STRING,
                "field": "brand_image"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Merchants",
            "tax_id_number",
            {
                "type": Sequelize.INTEGER,
                "field": "tax_id_number"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Merchants",
            "cac_document",
            {
                "type": Sequelize.STRING,
                "field": "cac_document",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Merchants",
            "bank_verification_number",
            {
                "type": Sequelize.INTEGER,
                "field": "bank_verification_number",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Merchants",
            "business_description",
            {
                "type": Sequelize.STRING,
                "field": "business_description",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Merchants",
            "business_type",
            {
                "type": Sequelize.ENUM('public limited company', 'private limited company'),
                "field": "business_type",
                "defaultValue": "public limited company"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Merchants",
            "business_name",
            {
                "type": Sequelize.STRING,
                "field": "business_name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Orders",
            "TrackerId",
            {
                "type": Sequelize.UUID,
                "field": "TrackerId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Trackers",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Orders",
            "customer_contact",
            {
                "type": Sequelize.STRING,
                "field": "customer_contact"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Orders",
            "delivery_date",
            {
                "type": Sequelize.DATE,
                "field": "delivery_date"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Orders",
            "delivery_address",
            {
                "type": Sequelize.STRING,
                "field": "delivery_address",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Orders",
            "delivery_type",
            {
                "type": Sequelize.ENUM('door_delivery', 'pickup_station'),
                "field": "delivery_type",
                "defaultValue": "door_delivery"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "delivery_address",
            {
                "type": Sequelize.STRING,
                "field": "delivery_address"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Orders",
            "status",
            {
                "type": Sequelize.ENUM('canceled', 'active', 'delivered', 'disputed'),
                "field": "status",
                "defaultValue": "active"
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
