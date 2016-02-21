import knex from "knex";
import knexConfig from "./knexfile.js";
import bookshelf from "bookshelf";

let bookshelfObj;

if (process.env.NODE_ENV === "production") {
    bookshelfObj = bookshelf(knex(knexConfig.production));
}
else {
    bookshelfObj =  bookshelf(knex(knexConfig.development));
}

export default bookshelfObj;
