import bookshelf from "../bookshelf";
import checkIt from "checkit";
import bcrypt from "bcrypt";

const rules = {
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

    initialize: function () {
        this.on("creating", this.hashPassword);
        this.on("saving", this.validateSave);
    },

    validateSave: function () {
        return checkIt(rules).run(this.attributes);
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
