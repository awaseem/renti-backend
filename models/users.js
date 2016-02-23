import bookshelf from "../bookshelf";
import checkIt from "checkit";
import bcrypt from "bcrypt";
import CreditCard from "./creditCard";
import UserFeedback from "./userFeedback";
import Cars from "./cars";

const creationRules = {
    username: "required",
    password: "required",
    image: "required",
    first_name: "required",
    last_name: "required",
    address: "required",
    date_of_birth: ["required"],
    email: ["required", "email"]
};

export default bookshelf.Model.extend({
    tableName: "users",

    idAttribute: "uid",

    cars: function () {
        return this.hasMany(Cars, "user_id");
    },

    userFeedback: function () {
        return this.hasMany(UserFeedback, "user_has");
    },

    creditCard: function () {
        return this.hasOne(CreditCard, "user_id");
    },

    initialize: function () {
        this.on("creating", this.validateCreation);
        this.on("creating", this.hashPassword);
    },

    validateCreation: function () {
        return checkIt(creationRules).run(this.attributes);
    },

    hashPassword: function(model) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(model.attributes.password, 10, function(err, hash) {
                if (err) reject(err);
                resolve(model.set("password", hash));
            });
        });
    }

});
