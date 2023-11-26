const User = require('../models/User')
const router = require("express").Router();

//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });