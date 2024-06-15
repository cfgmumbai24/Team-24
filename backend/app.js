const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(morgan("tiny"));

const userRouter = require("./routes/user.route");
const productRequestRouter = require("./routes/productRequest.route");
const categoryRouter = require("./routes/category.route");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product-request", productRequestRouter);
app.use("/api/v1/category", categoryRouter);

// Health check route
app.get("/api/v1/health", async (req, res) => {
  return res.send("Running...");
});

module.exports = app;
