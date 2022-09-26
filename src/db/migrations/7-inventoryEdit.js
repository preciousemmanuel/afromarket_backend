'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "category" from table "Inventories"
 * changeColumn "picture" on table "Inventories"
 * changeColumn "picture_2" on table "Inventories"
 * changeColumn "picture_3" on table "Inventories"
 * changeColumn "description" on table "Inventories"
 *
 **/

var info = {
    "revision": 7,
    "name": "inventoryEdit",
    "created": "2022-09-26T11:05:53.772Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Inventories", "category"]
    },
    {
        fn: "changeColumn",
        params: [
            "Inventories",
            "picture",
            {
                "type": Sequelize.STRING,
                "field": "picture"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Inventories",
            "picture_2",
            {
                "type": Sequelize.STRING,
                "field": "picture_2"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Inventories",
            "picture_3",
            {
                "type": Sequelize.STRING,
                "field": "picture_3"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Inventories",
            "description",
            {
                "type": Sequelize.STRING,
                "field": "description"
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
