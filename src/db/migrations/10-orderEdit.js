'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "TrackerId" to table "Orders"
 *
 **/

var info = {
    "revision": 10,
    "name": "orderEdit",
    "created": "2022-09-26T13:09:07.084Z",
    "comment": ""
};

var migrationCommands = [{
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
