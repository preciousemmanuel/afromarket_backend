'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "trackingId" to table "Orders"
 *
 **/

var info = {
    "revision": 11,
    "name": "noname",
    "created": "2022-09-22T09:23:00.970Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Orders",
        "trackingId",
        {
            "type": Sequelize.STRING,
            "field": "trackingId"
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
