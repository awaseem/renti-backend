// Update with your config settings.

module.exports = {

    development: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3"
        },
        pool: {
            afterCreate: function (conn, cb) {
                conn.run("PRAGMA foreign_keys = ON", cb);
            }
        }
    },

    staging: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3"
        },
        pool: {
            afterCreate: function (conn, cb) {
                conn.run("PRAGMA foreign_keys = ON", cb);
            }
        }
    },

    production: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3"
        },
        pool: {
            afterCreate: function (conn, cb) {
                conn.run("PRAGMA foreign_keys = ON", cb);
            }
        }
    }

};
