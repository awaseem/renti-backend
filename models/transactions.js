import bookshelf from "../bookshelf";
import checkIt from "checkit";
import Users from "./users";
import Cars from "./cars";

const creationRules = {
    "date_in": ["required", "numeric"],
    "date_out": ["required", "numeric"],
    "pending": ["required", "numeric", "lessThanEqualTo:1", "greaterThanEqualTo:0"],
    "price": ["required", "numeric"],
    "car_id": "required"
};

const deletionRules = {
    "tid": ["required", "numeric"]
};

export default bookshelf.Model.extend({
    tableName: "transactions",

    idAttribute: "tid",

    user_renter: function () {
        return this.belongsTo(Users, "user_renter");
    },

    car: function () {
        return this.belongsTo(Cars, "car_id");
    },

    initialize: function () {
        this.on("creating", this.validateCreation);
        this.on("destroying", this.validateDeletion);
    },

    validateCreation: function () {
        return checkIt(creationRules).run(this.attributes);
    },

    validateDeletion: function () {
        return checkIt(deletionRules).run(this.attributes);
    }
});
