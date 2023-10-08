import express from "express";
import { StartUpModel } from "../models/startUps.js";
import { UserModel } from "../models/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add Startup Pitches
router.post("/pitchIdeas", auth, async (req, res) => {
  const startUp = new StartUpModel({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await startUp.save();
    res.status(201).json(startUp);
  } catch (e) {
    res.status(404).json(e);
  }
});

// Show all the Pitches
router.get("/pitchesAll", async (req, res) => {
  try {
    const startUps = await StartUpModel.find({});
    res.status(200).json(startUps);
  } catch (e) {
    res.status(500).json(e);
  }
});

//Show pitches posted by only the user
router.get("/pitchesSpecific", auth, async (req, res) => {
  try {
    await req.user.populate("startUps");
    res.status(200).json(req.user.startUps);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Show pitches to job seekers when they click on posts
router.get("/pitchesDesc/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const pitch = await StartUpModel.findById(_id)
    res.status(200).json(pitch)
    if (!pitch) {
      return res.status(404).json();
    }
  } catch (e) {
    res.status(500).json()
  }
})

// Show pitches acc. to their ids to owners
router.get("/pitchesOwner/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const pitch = await StartUpModel.findOne({ _id, owner: req.user._id });
    console.log(pitch);
    if (!pitch) {
      return res.status(404).json();
    }

    res.status(200).json(pitch);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Lets Owner edit the pitches
router.patch("/pitches/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "company",
    "website",
    "founders",
    "logo",
    "email",
    "salary",
    "equity",
    "jobLocation",
    "yearStarted",
    "amountRaised",
    "ideas",
  ];
  console.log(allowedUpdates);
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  console.log(isValidOperation);
  if (!isValidOperation) {
    return res.status(404).json({ error: "Invalid update" });
  }
  try {
    const pitch = await StartUpModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    console.log(pitch);
    if (!pitch) {
      return res.status(404).json();
    }

    updates.forEach((update) => {
      pitch[update] = req.body[update];
    });

    await pitch.save();
    res.json(pitch);
  } catch (e) {
    res.status(400).json();
  }
});

// Delete Pitches
router.delete("/pitchesOwner/:id", auth, async (req, res) => {
    try {
        const pitch = await StartUpModel.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!pitch) {
            return res.status(404).json()
        }

        res.json(pitch)
    } catch (e) {
        res.status(500).json()
    }
});

export { router as startUpRouter };
