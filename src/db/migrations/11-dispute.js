'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Disputes", deps: [Users, Orders]
 *
 **/

var info = {
    "revision": 11,
    "name": "dispute",
    "created": "2022-09-26T20:08:47.663Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Disputes",
        {
            "id": {
                "type": Sequelize.UUID,
                "field": "id",
                "defaultValue": Sequelize.UUIDV4,
                "unique": true,
                "primaryKey": true
            },
            "product_image": {
                "type": Sequelize.STRING,
                "field": "product_image"
            },
            "reason": {
                "type": Sequelize.ENUM('Wrong Orer', 'Lost Order', 'Damaged Product', 'Fake Product'),
                "field": "reason"
            },
            "status": {
                "type": Sequelize.ENUM('Won', 'On_Going', 'Lost'),
                "field": "status",
                "defaultValue": "On_Going"
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
