import request from "supertest";
import app from "../app.js";

const HELLO_ROUTE = "/api/hello";

describe("Test Hello Api", () => {

    it("should get a hello message when the hello api endpoint is hit with a GET request", (done) => {
        request(app)
        .get(HELLO_ROUTE)
        .expect({ message: "hello world" })
        .end(done);
    });

});
