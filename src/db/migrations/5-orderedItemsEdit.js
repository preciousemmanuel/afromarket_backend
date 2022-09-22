'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "productName" from table "OrderedItems"
 * addColumn "product_name" to table "OrderedItems"
 * addColumn "quantity_ordered" to table "OrderedItems"
 *
 **/

var info = {
    "revision": 5,
    "name": "orderedItemsEdit",
    "created": "2022-09-21T08:51:18.170Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["OrderedItems", "productName"]
    },
    {
        fn: "addColumn",
        params: [
            "OrderedItems",
            "product_name",
            {
                "type": Sequelize.STRING,
                "field": "product_name",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "OrderedItems",
            "quantity_ordered",
            {
                "type": Sequelize.INTEGER,
                "field": "quantity_ordered",
                "defaultValue": 1
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
