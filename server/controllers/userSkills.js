const UserSkill = require("../models/UserSkill");
const Skill = require("../models/Skill");

const getUserSkills = async (req, res) => {
	try {
		if (!req.session.userId) {
			return res.status(401).send("Unauthorized");
		}

		const userId = req.session.userId;
		const userSkills = await UserSkill.getUserSkills(userId);
		res.json(userSkills);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const addUserSkill = async (req, res) => {
	try {
		if (!req.session.userId) {
			return res.status(401).send("Unauthorized");
		}

		const userId = req.session.userId;
		const { skillId, importanceLevel } = req.body;
		await UserSkill.addUserSkill(userId, skillId, importanceLevel);
		res.sendStatus(200);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const deleteUserSkill = async (req, res) => {
	try {
		if (!req.session.userId) {
			return res.status(401).send("Unauthorized");
		}

		const userId = req.session.userId;
		const { skillId } = req.body;
		await UserSkill.deleteUserSkill(userId, skillId);
		res.sendStatus(200);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const updateUserSkills = async (req, res) => {
	try {
		if (!req.session.userId) {
			return res.status(401).send("Unauthorized");
		}

		const userId = req.session.userId;
		const updatedSkills = req.body;

		const userSkills = await UserSkill.getUserSkills(userId);

		const skillsToAdd = [];
		const skillsToDelete = [];

		for (let i = 0; i < updatedSkills.length; i++) {
			const updatedSkill = updatedSkills[i];
			const updatedSkillId = await Skill.getSkillByCode(
				updatedSkill.skill_code
			);

			// Check if the skill exists
			if (!updatedSkillId) {
				return res
					.status(400)
					.send(
						`Skill with code ${updatedSkill.skillCode} not found`
					);
			}

			const userSkill = userSkills.find(
				(userSkill) =>
					userSkill.skill_id === updatedSkillId &&
					userSkill.importance_level === updatedSkill.location
			);

			if (userSkill) {
				continue;
			}

			skillsToAdd.push({
				skillId: updatedSkillId,
				importanceLevel: updatedSkill.location, // location refers to importance level
			});
		}

		for (let i = 0; i < userSkills.length; i++) {
			const userSkill = userSkills[i];
			const updatedSkill = updatedSkills.find(
				(updatedSkill) =>
					userSkill.skill_id === updatedSkill.skill_id &&
					userSkill.importance_level === updatedSkill.location
			);

			if (updatedSkill) {
				continue;
			}

			skillsToDelete.push(userSkill.skill_id);
		}

		// Delete skills which need to be deleted
		for (let i = 0; i < skillsToDelete.length; i++) {
			const skillId = skillsToDelete[i];
			await UserSkill.deleteUserSkill(userId, skillId);
		}

		// Add skills which need to be added
		for (let i = 0; i < skillsToAdd.length; i++) {
			const { skillId, importanceLevel } = skillsToAdd[i];
			await UserSkill.addUserSkill(userId, skillId, importanceLevel);
		}

		res.sendStatus(200);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

module.exports = {
	getUserSkills,
	addUserSkill,
	deleteUserSkill,
	updateUserSkills,
};
