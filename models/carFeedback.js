import bookshelf from "../bookshelf";
import checkIt from "checkit";
import Cars from "./cars";
import Users from "./users";

const creationRules = {
    comment: "required",
    rating: ["required", "greaterThan:0", "lessThanEqualTo:5", "numeric"],
    car_has: "required"
};

const deletionRules = {
    fid: "required"
};

export default bookshelf.Model.extend({
    tableName: "feedback_cars",

    idAttribute: "fid",

    userCreator: function () {
        return this.belongsTo(Users, "user_creator");
    },

    cars: function () {
        return this.belongsTo(Cars, "car_has");
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
