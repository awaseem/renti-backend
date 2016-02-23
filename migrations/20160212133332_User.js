
exports.up = function(knex, Promise) {

    return Promise.all([

        knex.schema.createTable("users", function (table) {
            table.increments("uid").primary();
            table.string("image");
            table.string("username");
            table.string("password");
            table.string("first_name");
            table.string("last_name");
            table.string("address");
            table.string("summary");
            table.date("date_of_birth");
            table.string("email");
        }),

        knex.schema.createTable("cars", function (table) {
            table.string("license_plate").primary();
            table.string("colour");
            table.string("image");
            table.string("make");
            table.string("model");
            table.string("summary");
            table.integer("year");
            table.integer("number_of_seats");
            table.integer("user_id")
                .references("uid")
                .inTable("users")
                .onDelete("CASCADE");
        }),

        knex.schema.createTable("credit_card", function (table) {
            table.bigInteger("credit_card_number").primary();
            table.integer("cvv");
            table.date("expiry_date");
            table.integer("user_id")
                .references("uid")
                .inTable("users")
                .onDelete("CASCADE")
                .unique()
                .notNullable();
        }),

        knex.schema.createTable("transactions", function(table) {
            table.increments("tid").primary();
            table.date("date_in");
            table.date("date_out");
            table.decimal("price");
            table.binary("pending");
            table.integer("user_renter")
                .references("uid")
                .inTable("users")
                .onDelete("CASCADE")
                .notNullable();
            table.string("car_id")
                .references("license_plate")
                .inTable("cars")
                .onDelete("CASCADE")
                .notNullable();
        }),

        knex.schema.createTable("feedback_users", function (table) {
            table.increments("fid").primary();
            table.text("comment");
            table.integer("rating");
            table.integer("user_creator")
                .references("uid")
                .inTable("users")
                .onDelete("CASCADE")
                .notNullable();
            table.integer("user_has")
                .references("uid")
                .inTable("users")
                .onDelete("CASCADE")
                .notNullable();
        }),

        knex.schema.createTable("feedback_cars", function (table) {
            table.increments("fid").primary();
            table.text("comment");
            table.integer("rating");
            table.integer("user_creator")
                .references("uid")
                .inTable("users")
                .onDelete("CASCADE")
                .notNullable();
            table.integer("car_has")
                .references("uid")
                .inTable("users")
                .onDelete("CASCADE")
                .notNullable();
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
