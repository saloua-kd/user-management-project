const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user = require("./models/user");


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Templating engine
app.set("view engine", "ejs");

// Load environment variables from .env
dotenv.config();

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URL);
};
connectDB()
  .then(() => console.log("connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  const newUser = new user({
    userName: "admdddn",
    email: "admin@ddddomain.com",
    password: "hashedPassword",
    salary: 25850
  });
  newUser.save()
     .then(()=>{
    res.json('user saved')
  }) .catch (()=>{
    res.json('user not saved')
  })
});

app.get('/users',async(req,res)=>{
  const users = await user.find()
  res.json(users)
})

app.get("/register", (req, res) => {
  res.render("register");
});


app.post("/register", async (req, res) => {
  // Extract user data from the form
  const { userName, email, password, salary } = req.body;

  try {
      // Create a new user document in the MongoDB using the Mongoose model
      const newUser = new user({
          userName,
          email,
          password, // You should hash the password securely before saving it.
          salary
      });

      // Save the user to the database
      await newUser.save();

      // Redirect to a success page or another route
      res.redirect("/registration-success");
  } catch (error) {
      // Handle errors, e.g., duplicate email or validation errors
      res.render("register", { error: "Registration failed. Please try again." });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
