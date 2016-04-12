var bcrypt = require("bcrypt"); // eslint-disable-line

exports.seed = function(knex, Promise) {
    return Promise.join(

        // Inserts entries for the user table
        knex("users").insert({
            username: "tcollin",
            first_name: "Tanner",
            last_name: "Collin",
            date_of_birth: "730869558",
            address: "123 place rd NW",
            email: "test@someemail.com",
            summary: "Hi. I love for you to rent one of my cars!",
            image: "https://cdn4.iconfinder.com/data/icons/SIGMA/project_managment/png/400/tester.png",
            password: bcrypt.hashSync("test", 10)
        }),

        knex("users").insert({
            username: "awaseem",
            first_name: "Ali",
            last_name: "Waseem",
            date_of_birth: "749186517",
            address: "123 newway rd NW",
            email: "hello@someemail.com",
            summary: "Hi. Please rent one of my cars!",
            image: "https://cdn4.iconfinder.com/data/icons/SIGMA/project_managment/png/400/tester.png",
            password: bcrypt.hashSync("test", 10)
        }),

        knex("users").insert({
            username: "jheinrichs",
            first_name: "Jordan",
            last_name: "Heinrichs",
            date_of_birth: "738559317",
            address: "123 cotunk rd NW",
            email: "hi@someemail.com",
            summary: "Hi. check out my cars for rent!",
            image: "https://cdn4.iconfinder.com/data/icons/SIGMA/project_managment/png/400/tester.png",
            password: bcrypt.hashSync("test", 10)
        }),

        // Credit card for Tanner
        knex("credit_card").insert({
            credit_card_number: "371131951383474",
            cvv: 123,
            expiry_date: "0918",
            user_id: 1
        }),

        // Credit card for Ali
        knex("credit_card").insert({
            credit_card_number: "347126747971237",
            cvv: 123,
            expiry_date: "0318",
            user_id: 2
        }),

        // Credit card for Jordan
        knex("credit_card").insert({
            credit_card_number: "372552024488355",
            cvv: 123,
            expiry_date: "0118",
            user_id: 3
        }),

        // Car for Jordan
        knex("cars").insert({
            license_plate: "bmz-123",
            colour: "gray",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/06-07_Honda_Civic_LX_Sedan.jpg",
            make: "honda",
            model: "civic",
            summary: "A clean honda civic up for rent!",
            year: 2009,
            price: 40.00,
            number_of_seats: 4,
            user_id: 2
        }),

        // Car for Jordan
        knex("cars").insert({
            license_plate: "agh-234",
            colour: "red",
            make: "mazda",
            image: "http://www.gunaxin.com/wp-content/uploads/2013/08/2014-Mazda6-01.jpg",
            model: "6",
            summary: "A nice red car",
            year: 2006,
            price: 30.00,
            number_of_seats: 4,
            user_id: 3
        }),

        // Car for Jordan
        knex("cars").insert({
            license_plate: "sdf-2344",
            colour: "gray",
            make: "BMW",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/18/2012_BMW_320d_(F30_MY13)_Luxury_Line_sedan_(2015-07-24)_01.jpg",
            model: "3 series",
            summary: "A nice BMW for rent!",
            year: 2008,
            price: 60.00,
            number_of_seats: 4,
            user_id: 3
        }),

        // Car for Tanner
        knex("cars").insert({
            license_plate: "ign-2344",
            colour: "gray",
            make: "Ford",
            image: "http://www.torquenews.com/sites/default/files/image-106/13f150-lariat_02_hr.jpg",
            model: "F-150",
            summary: "A big truck for rent!",
            year: 2010,
            price: 20.00,
            number_of_seats: 4,
            user_id: 1
        }),

        // Feedback for Tanner created by Ali
        knex("feedback_users").insert({
            comment: "Tanner was keeps his car very clean!",
            rating: 5,
            user_creator: 2,
            user_has: 1
        }),

        // Feedback for Tanner created by Jordan
        knex("feedback_users").insert({
            comment: "Tanner was very rude!",
            rating: 2,
            user_creator: 3,
            user_has: 1
        }),

        // Feedback for Ali created by Tanner
        knex("feedback_users").insert({
            comment: "Ali was very nice!",
            rating: 5,
            user_creator: 1,
            user_has: 2
        }),

        // Feedback for Ali created by Jordan
        knex("feedback_users").insert({
            comment: "Ali was very humble!",
            rating: 3,
            user_creator: 3,
            user_has: 2
        }),

        // Feedback for Jordan created by Tanner
        knex("feedback_users").insert({
            comment: "Jordan was very mean!",
            rating: 1,
            user_creator: 1,
            user_has: 3
        }),

        // Feedback for Jordan created by Ali
        knex("feedback_users").insert({
            comment: "Jordan was very nice with his car!",
            rating: 5,
            user_creator: 2,
            user_has: 3
        }),

        // Feedback for Tanner's ford f150 by Ali
        knex("feedback_cars").insert({
            comment: "This truck was great for driving!",
            rating: 4,
            user_creator: 2,
            car_has: "ign-2344"
        }),

        // Feedback for Ali's honda civic by Tanner
        knex("feedback_cars").insert({
            comment: "This civic was great for driving!",
            rating: 5,
            user_creator: 1,
            car_has: "bmz-123"
        }),

        // Feedback for Jordans's bmw 3 series by Ali
        knex("feedback_cars").insert({
            comment: "This bmw was fun!",
            rating: 5,
            user_creator: 2,
            car_has: "sdf-2344"
        })
  );
};
