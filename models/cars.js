import bookshelf from "../bookshelf";
import checkIt from "checkit";
import Users from "./users";
import CarFeedback from "./carFeedback";
import transactions from "./transactions";

const creationRules = {
    license_plate: "required",
    model: "required",
    make: "required",
    summary: "required",
    price: ["required", "numeric"],
    year: ["required", "numeric", "maxLength:4"],
    number_of_seats: ["required", "numeric"],
    colour: "required",
    image: "required"
};

const deletionRules = {
    license_plate: "required"
};

const updatingRules = {
    license_plate: "required"
};

export default bookshelf.Model.extend({
    tableName: "cars",

    idAttribute: "license_plate",

    users: function () {
        return this.belongsTo(Users, "user_id");
    },

    carFeedback: function () {
        return this.hasMany(CarFeedback, "car_has");
    },

    transactions: function () {
        return this.hasMany(transactions, "car_id");
    },

    initialize: function () {
        this.on("creating", this.validateCreation);
        this.on("destroying", this.validateDeletion);
        this.on("updating", this.validateUpdate);
    },

    validateCreation: function () {
        return checkIt(creationRules).run(this.attributes);
    },

    validateDeletion: function () {
        return checkIt(deletionRules).run(this.attributes);
    },

    validateUpdate: function () {
        return checkIt(updatingRules).run(this.attributes);
    }
});
