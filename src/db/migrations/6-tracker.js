'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Trackers", deps: [Orders]
 *
 **/

var info = {
    "revision": 6,
    "name": "tracker",
    "created": "2022-09-26T10:06:50.051Z",
    "comment": ""
};

var migrationCommands = [{
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
