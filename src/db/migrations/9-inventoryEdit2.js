'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "product_id" to table "Inventories"
 *
 **/

var info = {
    "revision": 9,
    "name": "inventoryEdit2",
    "created": "2022-09-26T11:43:50.345Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Inventories",
        "product_id",
        {
            "type": Sequelize.INTEGER,
            "field": "product_id"
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
