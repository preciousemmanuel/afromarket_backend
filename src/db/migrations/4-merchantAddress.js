'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "address" to table "Merchants"
 *
 **/

var info = {
    "revision": 4,
    "name": "merchantAddress",
    "created": "2022-11-06T10:29:36.478Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Merchants",
        "address",
        {
            "type": Sequelize.STRING,
            "field": "address"
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
