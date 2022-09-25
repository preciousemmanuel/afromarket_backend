'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "picture" to table "Merchants"
 * addColumn "picture_3" to table "Products"
 * addColumn "picture_2" to table "Products"
 * addColumn "picture" to table "Products"
 *
 **/

var info = {
    "revision": 13,
    "name": "productPic",
    "created": "2022-09-25T13:09:24.295Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Merchants",
            "picture",
            {
                "type": Sequelize.STRING,
                "field": "picture",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Products",
            "picture_3",
            {
                "type": Sequelize.STRING,
                "field": "picture_3",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Products",
            "picture_2",
            {
                "type": Sequelize.STRING,
                "field": "picture_2",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Products",
            "picture",
            {
                "type": Sequelize.STRING,
                "field": "picture",
                "allowNull": false
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
