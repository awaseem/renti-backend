/**
 * Created by awaseem on 15-08-20.
 */

import express from "express";
import bodyparser from "body-parser";
import config from "nconf";
import expressConfig from "./config/express";
import { router as helloApi } from "./api/hello";
import { router as userApi } from "./api/users";
import { router as creditCardApi } from "./api/creditCard";
import { router as userFeedbackApi } from "./api/userFeedback";
import { router as carsApi } from "./api/cars";
import { allowCrossDomain } from "./middlewares/crossDomain";

const app = express();

// Setup our config staging, check environment variables first then
// look for a file
config.env().file({ file: "./config/config.json" });

app.use(allowCrossDomain);
app.use(express.static(`${__dirname}/public`));

// Setup up body parser to allow request params in req.body
app.use(bodyparser.urlencoded({
    limit: expressConfig.bodyparserSizeLimit,
    extended: expressConfig.extended
}));
app.use(bodyparser.json({
    limit: expressConfig.bodyparserSizeLimit
}));

// Setup production stuff here if you'd like otherwise do dev stuff here
if (config.get("environment") === "prod") {
    // Do production stuff here
}
else {
    // Do dev stuff here
}

// Setup all of our API routes
app.use("/api/hello", helloApi);
app.use("/api/user", userApi);
app.use("/api/creditcard", creditCardApi);
app.use("/api/userFeedback", userFeedbackApi);
app.use("/api/car", carsApi);

// Catch any other routes and send a 404
app.all("*", (req, res) => {
    res.status(404).json( { message: "Error: Route does not exist!"} );
});

app.listen(expressConfig.port, function () {
    console.log(`App Running on http://localhost:${expressConfig.port}`);
});

export default app;
