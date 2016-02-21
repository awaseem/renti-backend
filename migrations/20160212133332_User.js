
exports.up = function(knex, Promise) {

    return Promise.all([

        knex.schema.createTable("users", function (table) {
            table.increments("uid").primary();
            table.string("username");
            table.string("password");
            table.string("first_name");
            table.string("last_name");
            table.string("address");
            table.date("date_of_birth");
            table.string("email");
        }),

        knex.schema.createTable("cars", function (table) {
            table.increments("cid").primary();
            table.string("make");
            table.string("model");
            table.integer("year");
            table.integer("number_of_seats");
            table.integer("user_id")
                .references("uid")
                .inTable("users");
        }),

        knex.schema.createTable("credit_card", function (table) {
            table.bigInteger("credit_card_number").primary();
            table.integer("cvv");
            table.date("expiry_date");
            table.integer("user_id")
                .references("uid")
                .inTable("users")
                .unique();
        }),

        knex.schema.createTable("transactions", function(table) {
            table.increments("tid").primary();
            table.date("date_in");
            table.date("date_out");
            table.decimal("price");
            table.binary("pending");
            table.integer("user_renter")
                .references("uuid")
                .inTable("users");
            table.integer("car_id")
                .references("cid")
                .inTable("cars");
        }),

        knex.schema.createTable("feedback_users", function (table) {
            table.increments("fid").primary();
            table.text("comment");
            table.integer("rating");
            table.integer("user_creator")
                .references("uuid")
                .inTable("users");
            table.integer("user_has")
                .references("uuid")
                .inTable("users");
        }),

        knex.schema.createTable("feedback_cars", function (table) {
            table.increments("fid").primary();
            table.text("comment");
            table.integer("rating");
            table.integer("user_creator")
                .references("uuid")
                .inTable("users");
            table.integer("car_has")
                .references("uuid")
                .inTable("users");
        })
    ]);

};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("users"),
        knex.schema.dropTable("cars"),
        knex.schema.dropTable("credit_card"),
        knex.schema.dropTable("transactions"),
        knex.schema.dropTable("feedback_users"),
        knex.schema.dropTable("feedback_cars")
    ]);
};
