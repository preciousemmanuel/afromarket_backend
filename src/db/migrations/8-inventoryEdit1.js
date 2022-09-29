'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "invertory_owner" from table "Inventories"
 * addColumn "inventory_owner" to table "Inventories"
 *
 **/

var info = {
    "revision": 8,
    "name": "inventoryEdit1",
    "created": "2022-09-26T11:35:53.688Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Inventories", "invertory_owner"]
    },
    {
        fn: "addColumn",
        params: [
            "Inventories",
            "inventory_owner",
            {
                "type": Sequelize.STRING,
                "field": "inventory_owner"
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
