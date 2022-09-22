'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "total" to table "OrderedItems"
 * addColumn "product_id" to table "OrderedItems"
 *
 **/

var info = {
    "revision": 6,
    "name": "orderedItemsEdit1",
    "created": "2022-09-21T09:05:38.397Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "OrderedItems",
            "total",
            {
                "type": Sequelize.INTEGER,
                "field": "total",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "OrderedItems",
            "product_id",
            {
                "type": Sequelize.INTEGER,
                "field": "product_id"
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
