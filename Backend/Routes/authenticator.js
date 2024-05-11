const router = require("express").Router();
const { User } = require("../Models/User.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    // El usuario decodificado del token está disponible en req.user
    const decode = jwt.decode(token, process.env.JWTPRIVATEKEY);
    // Devolver el usuario
    res.status(200).send(decode);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    role: Joi.string().required().label("Role"),
  });
  return schema.validate(data);
};

module.exports = router;
