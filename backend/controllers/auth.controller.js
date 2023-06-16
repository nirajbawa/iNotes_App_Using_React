const UserModel = require("../models/Users.model");
let { validationResult } = require("express-validator");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class auth {
  signUp = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({ error: "sorry user with this email is already exists" });
        } else {
        let result = await this.createUser(req.body);
        res.status(200).json(result);
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "internal server error" });
    }
  };

  createUser = async (data) => {
    let Modelobj = new UserModel({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    let result = await Modelobj.save();

    const JWTdata = {
      id: result.id,
    };

    let authToken = jwt.sign(JWTdata, process.env.JWT_SECRET);
    return { authToken };
  };

  signIn = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
          return res
            .status(400)
            .json({ error: "please try to sign in with correct credentials" });
        }

        const comprarePassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!comprarePassword) {
          return res
            .status(400)
            .json({ error: "please try to sign in with correct credentials" });
        }

        const JWTdata = {
          id: user.id,
        };

        let authToken = jwt.sign(JWTdata, process.env.JWT_SECRET);

        res.status(200).json({ authToken });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "internal server error" });
    }
  };

  getuse = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId).select("-password");
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json({ error: "internal server error" });
    }
  };
}

module.exports = new auth();
