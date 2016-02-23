import bookshelf from "../bookshelf";
import checkIt from "checkit";
import Users from "./users";

const creationRules = {
    comment: "required",
    rating: ["required", "greaterThan:0", "lessThanEqualTo:5"],
    user_has: ["required", "numeric"]
};

const deletionRules = {
    fid: "required"
};

export default bookshelf.Model.extend({
    tableName: "feedback_users",

    idAttribute: "fid",

    users: function () {
        return this.belongsTo(Users, "user_has");
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
