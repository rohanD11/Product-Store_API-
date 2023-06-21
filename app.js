require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>store API </h1><a href="/api/v1/products">Products Route</a>');
});

app.use("/api/v1/products", productRouter);

//products route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
