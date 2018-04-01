const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
import { addUser } from "./middleware";

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect("mongodb://localhost/kienyeji-graphql");
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

//attach user from headers
app.use(addUser);

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
      user: req.user
    }
  }))
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
