'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "items" on table "Orders"
 *
 **/

var info = {
    "revision": 9,
    "name": "orderEdit2",
    "created": "2022-09-21T09:23:56.281Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "Orders",
        "items",
        {
            "type": Sequelize.STRING,
            "field": "items"
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