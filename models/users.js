import bookshelf from "../bookshelf";
import checkIt from "checkit";
import bcrypt from "bcrypt";

const creationRules = {
    username: "required",
    password: "required",
    first_name: "required",
    last_name: "required",
    address: "required",
    date_of_birth: ["required"],
    email: ["required", "email"]
};

export default bookshelf.Model.extend({
    tableName: "users",

    idAttribute: "uid",

    initialize: function () {
        this.on("creating", this.validateCreation, this.hashPassword);
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
