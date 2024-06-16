const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
app.use(morgan("tiny"));

const userRouter = require("./routes/user.route");
const productRequestRouter = require("./routes/productRequest.route");
const categoryRouter = require("./routes/category.route");
const superUserRouter = require("./routes/superUser.route");
const productRouter = require("./routes/product.route");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product-request", productRequestRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/super-user", superUserRouter);
app.use("/api/v1/product", productRouter);

// Health check route
app.get("/api/v1/health", async (req, res) => {
  return res.send("Running...");
});

module.exports = app;
