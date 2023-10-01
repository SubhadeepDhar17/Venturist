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

// router.post('/auth/logout', auth, async (req, res) => {
//   try {
//       req.user.tokens = req.user.tokens.filter((token) => {
//           return token.token !== req.token
//       })
//       await req.user.save()
//       console.log(req.user.token)
//       res.send()
//   } catch (e) {
//       res.status(500).send(e)
//   }
// })

// router.post('/auth/register', async (req, res) => {
//     const {username, password} = req.body

//     try {
//         const user = await UserModel.findOne({ username })

//         if (user) {
//             return res.status(401).json({message: 'Username already exists'})
//         }

//         const hashedPassword = await bcrypt.hash(password, 8)

//         const newUser = new UserModel({username, password: hashedPassword})
//         await newUser.save()

//         res.json({message: 'User registration successful'})
//     } catch (e) {
//         res.status(500).json({message: "Err! We are having bit of a problem"})
//     }
// })

// router.post('/auth/login', async (req, res) => {
//     const {username, password} = req.body
//     const user = await UserModel.findOne({ username })

//     if (!user) {
//         return res.json({message: 'User does not exist'})
//     }
//     console.log(password)
//     const isPasswordValid = await bcrypt.compare(password, user.password)

//     if (!isPasswordValid) {
//         return res.json({message: "Password is incorrect"})
//     }

//     const token = jwt.sign({id: user._id}, "secret")
//     res.json({token, userID: user._id})
// })

//TRIAL

export { router as userRouter };
