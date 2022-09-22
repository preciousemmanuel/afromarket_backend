'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "payment_type" on table "Orders"
 *
 **/

var info = {
    "revision": 2,
    "name": "editOrder",
    "created": "2022-09-20T22:21:40.527Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "Orders",
        "payment_type",
        {
            "type": Sequelize.ENUM('pay-now', 'on-delivery'),
            "field": "payment_type",
            "defaultValue": "on-delivery"
        }
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
