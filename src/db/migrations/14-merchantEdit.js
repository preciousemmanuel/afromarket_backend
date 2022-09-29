'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "picture" from table "Merchants"
 * changeColumn "cac_document" on table "Merchants"
 * changeColumn "bank_verification_number" on table "Merchants"
 * changeColumn "business_description" on table "Merchants"
 *
 **/

var info = {
    "revision": 14,
    "name": "merchantEdit",
    "created": "2022-09-25T13:27:08.120Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Merchants", "picture"]
    },
    {
        fn: "changeColumn",
        params: [
            "Merchants",
            "cac_document",
            {
                "type": Sequelize.STRING,
                "field": "cac_document"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Merchants",
            "bank_verification_number",
            {
                "type": Sequelize.INTEGER,
                "field": "bank_verification_number"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Merchants",
            "business_description",
            {
                "type": Sequelize.STRING,
                "field": "business_description"
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
