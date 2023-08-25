import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//USER AUTHENTICATION
export const register = (req, res) => {
  //checking if user to be registered already exists or not
  const selectQuery = "SELECT * FROM user WHERE email = ?";
  db.query(selectQuery, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");
  });

  //creating a user
  //hashing the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const insertQuery =
    "INSERT INTO user (`full_name`, `email`, `phone_number`, `password`) VALUES (?, ?, ?, ?)";
  db.query(
    insertQuery,
    [req.body.full_name, req.body.email, req.body.phone_number, hashedPassword],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created successfully");
    }
  );
};

export const login = (req, res) => {
  const selectQuery = "SELECT * FROM user WHERE email = ?"
  db.query(
    selectQuery,
    [req.body.email],
    (err, data) => {
      if (err)
        return res.status(500).json(err);

      if (data.length === 0)
        return res.status(404).json("User not found");

      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password)

      if (!checkPassword)
        return res.status(400).json("The email or password is wrong!!");

      const token = jwt.sign({ id: data[0].id }, "secretkey");

      const { password, ...others } = data[0];

      res.cookie("accessToken", token, {
        httpOnly: true,
      }).status(200).json(others);
    }
  );
}

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out")
}


//RESTAURANT AUTHENTICATION
export const resregister = (req, res) => {
  //checking if restaurant to be registered already exists or not
  const selectQuery = "SELECT * FROM restaurant WHERE email = ?";
  db.query(selectQuery, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    
    if (data.length) return res.status(409).json("Restaurant already exists");
  });

  //adding a restaurant
  //hashing the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const insertQuery =
    "INSERT INTO restaurant (`restaurant_name`, `email`, `phone_number`, `password`, `description`) VALUES (?, ?, ?, ?, ?)";
  db.query(
    insertQuery,
    [req.body.restaurant_name, req.body.email, req.body.phone_number, hashedPassword, req.body.description],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Restaurant added successfully");
    }
  );
};



export const reslogin = (req, res) => {
  const selectQuery = "SELECT * FROM restaurant WHERE email = ?"
  db.query(
    selectQuery,
    [req.body.email],
    (err, data) => {
      if (err)
        return res.status(500).json(err);

      if (data.length === 0)
        return res.status(404).json("Restaurant not found");

      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password)

      if (!checkPassword)
        return res.status(400).json("The username or password is wrong!!");

      const token = jwt.sign({ id: data[0].id }, "secretkey");

      const { password, ...others } = data[0];

      res.cookie("accessToken", token, {
        httpOnly: true,
      }).status(200).json(others);
    }
  );
}

export const reslogout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out")
}



