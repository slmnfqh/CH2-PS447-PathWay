/** @format */

const prisma = require("../config/db_conect");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;
  // const errors = {};

  // if (!validator.isAlpha(name)) {
  //   errors.name = "name hanya boleh mengandung alphabet !";
  // }

  // if (!validator.isAlpha(name)) {
  //   errors.name = "name hanya boleh mengandung alphabet !";
  // }

  // if (!validator.isEmail(email)) {
  //   errors.email = "Email harus berformat email !";
  // }

  // if (password.length < 8) {
  //   errors.password = "Password minimal 8 karakter !";
  // }

  // const checkEmail = await prisma.users.findFirst({
  //   where: {
  //     email: email,
  //   },
  // });

  // if (checkEmail) {
  //   errors.email = "Email sudah terdaftar !";
  // }

  // if (Object.keys(errors).length > 0) {
  //   return res.status(400).json({
  //     message: "Register failed !",
  //     errors,
  //   });
  // }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const newData = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });
    res.status(200).json({ message: "Register sucessfull !", data: newData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Register failed, Terjadi kesalahan pada server!",
      error: error.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  let errors = {};

  if (!validator.isEmail(email)) {
    errors.email = "Email harus berformat email !";
  }

  if (password.length < 8) {
    errors.password = "Password minimal 8 karakter !";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Login failed !",
      errors,
    });
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(400).json({
        message: "Login failed !",
        errors: {
          password: "Password salah !",
        },
      });

    const userId = user.id;
    const name = user.name;
    const email = user.email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: { refresh_token: refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });

    res.json({
      message: "Login successfull !",
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: "Login failed !",
      errors: {
        message: error.message,
      },
    });
    console.log(error);
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const data = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json({
      success: "true",
      data: data,
    });
  } catch (error) {
    res.json({
      success: "false",
      message: error.message,
    });
  }
};

// GET REFRESH TOKEN
const getRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) return res.sendStatus(401);
    const user = await prisma.users.findFirst({
      where: {
        refresh_token: req.body.refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user.id;
        const name = user.name;
        const email = user.email;

        const accessToken = jwt.sign(
          { userId, name, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// LOGOUT
const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);
  const user = await prisma.users.findFirst({
    where: {
      refresh_token: req.body.refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);
  const userId = user.id;
  await prisma.users.update({
    data: {
      refresh_token: null,
    },
    where: {
      id: userId,
    },
  });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

module.exports = { getAllUsers, register, login, getRefreshToken, logout };
