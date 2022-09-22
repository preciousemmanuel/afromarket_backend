'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "status" to table "Orders"
 *
 **/

var info = {
    "revision": 10,
    "name": "orderEdit3",
    "created": "2022-09-21T12:39:07.372Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Orders",
        "status",
        {
            "type": Sequelize.ENUM('canceled', 'active'),
            "field": "status",
            "defaultValue": "active"
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
