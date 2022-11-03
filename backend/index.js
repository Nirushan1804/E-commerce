const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(morgan("tiny"));

require("dotenv/config");

// const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
// const usersRoutes = require("./routes/users");
// const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

// app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
// app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "e-app",
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3001, () => {
  console.log("App is running on port 3001");
});