import express from "express";
import { UserModel } from "../models/users.js";
import auth from "../middleware/auth.js";
const router = express.Router();

//SIGNUP
router.post("/auth/register", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (e) {
    res.status(404).json(e);
  }
});

//LOGIN
router.post("/auth/login", async (req, res) => {
  try {
    const user = await UserModel.findByCredentials(
      req.body.username,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.json({ token, userID: user._id });
  } catch (e) {
    res.status(400).send(e);
  }
});

//FETCH USER BY LOGIN TOKEN
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//EDIT
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Updates" });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

export { router as userRouter };
