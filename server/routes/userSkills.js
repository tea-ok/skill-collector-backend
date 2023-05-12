const express = require("express");
const router = express.Router({ mergeParams: true });
const userSkillsController = require("../controllers/userSkills");

// GET user's skills
router.get("/", userSkillsController.getUserSkills);

// POST a new user skill
router.post("/add", userSkillsController.addUserSkill);

// DELETE a user skill
router.delete("/delete", userSkillsController.deleteUserSkill);

// Update user skills
router.put("/update", userSkillsController.updateUserSkills);

module.exports = router;
