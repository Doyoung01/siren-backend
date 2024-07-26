// controllers/users.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const userController = {
  // register
  register: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });

    // validation
    if (!email || !password) {
      throw new Error("Please all fields are required");
    }

    // check if users exists
    const userExists = await User.findOne({ email });
    console.log("User is Exists", userExists);

    if (userExists) {
      throw new Error("User are already exists");
    }

    // hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // ! create user
    const userCreated = await User.create({
      password: hashPassword,
      email,
    });

    // ! send the res
    console.log("user created ", userCreated);
    res.json({
        email: userCreated.email,
        id: userCreated.id
    });
  }),


  // login 
  login: asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    // check user is already exists
    const user = await User.findOne({email})
    console.log("user is already is in backend", user);
    if (!user) {
      throw new Error("Invalid credentials")
    }

    // check if user passwor is ok or valid
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error("Invalid creadentials")
    }

    // generate the token
    const token = jwt.sign({id: user._id}, "anyKey", {expiresIn: "30d"})

    // send the response

    res.json({
      message: "Login success",
      token,
      id: user._id,
      email: user.email
    })

  })

};


module.exports = userController