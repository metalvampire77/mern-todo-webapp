const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");
const TodoModel = require("./models/TodoModel");
const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;
const secret = process.env.secret || "ravindra";

mongoose
  .connect(
    "mongodb+srv://metalvampire77:SVC2rYnPkv5CQSRa@cluster0.qhrablv.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`connected to database`);
  })

  .catch((err) => console.log(err));

const db = mongoose.connection;

// db.once('open', () => {
//     const databaseName = db.client.db.databaseName;
//     console.log('Database name:', databaseName);
// });

app.listen(PORT, () => {
  console.log(`server is running on port 5000`);
});

app.post("/", (req, res) => {
  res.json(`home page`);
});

const options = { expiresIn: "1hr" };

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          secret,
          options
        );
        // Include the user ID in the response
        res.json({ message: "success", user_id: user._id, token });
      } else res.json(`wrong password`);
    } else res.json(`user not found`);
  });
});

app.post("/todos", (req, res) => {
  const { todo, user_id } = req.body;
  TodoModel.create({ todo, user_id }).then(() => res.json(req.body));
});

app.get("/get", (req, res) => {
  const user_id = req.query.user_id;
  TodoModel.find({ user_id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.post("/register", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) res.json(`user already present`);
      else {
        UserModel.create(req.body).then((user) => res.json(user));
      }
    })
    .catch((err) => res.json(err));
});

app.post("/contactus", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) res.json(`user already present`);
      else {
        UserModel.create(req.body).then((user) => res.json(user));
      }
    })
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: !done }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.use("/email", emailRoutes);

// Serve the React application
app.use(express.static(path.join(__dirname, "../client/dist")));

// For any other route, serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
