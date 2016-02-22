import bookshelf from "../bookshelf";
import checkIt from "checkit";
import Users from "./users";

const rules = {
    credit_card_number: ["required", "numeric", "luhn"],
    cvv: ["required", "numeric"],
    expiry_date: ["required", "numeric", "maxLength:4"]
};

export default bookshelf.Model.extend({
    tableName: "credit_card",

    users: function () {
        return this.belongsTo(Users, "user_id");
    },

    initialize: function () {
        this.on("creating", this.validateCreation, this.hashPassword);
    },

    validateCreation: function () {
        return checkIt(rules).run(this.attributes);
    }
});
