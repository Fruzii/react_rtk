const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

/**
 *
 * @route POST /api/users/login
 * @description login
 * @access Public
 */
const login = async (req, res, next) => {
  try {
    // res.send("respond with a login");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please, fill required field!" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPwdCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPwdCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

/**
 *
 * @route POST /api/users/register
 * @description Login
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    // res.send("respond with a register");
    // console.log(res)
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please, fill required field!" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    // console.log(!!registeredUser)
    if (registeredUser) {
      return res
        .status(400)
        .json({ message: "User with that email already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPwd,
      },
    });

    const secret = process.env.JWT_SECRET;

    console.log(user);
    console.log(secret);

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Failed to create new user!" });
    }
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

/**
 *
 * @route GET /api/users/current
 * @description current user
 * @access Private
 */
const current = async (req, res, next) => {
  try {
    // res.send("respond with a current");
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

module.exports = {
  login,
  register,
  current,
};
