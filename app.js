const express = require("express");
const app = express();
const mongoose = require("mongoose");
var mongoClient = require("mongodb").MongoClient;
require("dotenv/config");
const customerRouter = require("./routers/customer");
const productRouter = require("./routers/product");
const orderRouter = require("./routers/order");
const userRouter = require("./routers/user");
const orderDetailRouter = require("./routers/orderdetail");
const completeOrderRouter = require("./routers/completeorder");
const cartRouter = require("./routers/cart");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db = mongoose.connection;
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/orderdetail", orderDetailRouter);
app.use("/completeorder", completeOrderRouter);
app.use("/cart", cartRouter);
app.use("/upload", express.static("upload"));
app.get("/", function (req, res) {
  res.send("Hello");
});
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//connect to db
mongoose.connect(
  "mongodb+srv://tranhung:Leavemealone123a@cluster0-n2xn7.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log("connected to DB")
);
app.listen(3000, () => console.log("Sever is running at port 3000"));
