import bookshelf from "../bookshelf";
import checkIt from "checkit";
import bcrypt from "bcrypt";
import CreditCard from "./creditCard";

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

    creditCard: function () {
        return this.hasOne(CreditCard);
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
