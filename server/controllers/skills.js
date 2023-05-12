const db = require("../db");
const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
	try {
		if (!req.session.userId) {
			return res.status(401).send("Unauthorized");
		}
		const skills = await Skill.getAllSkills();

		const transformedSkills = skills.map((skill) => ({
			...skill,
			Skill: skill.skill_name,
			Description: skill.skill_description,
			skill_name: undefined,
			skill_description: undefined,
		}));

		res.json(transformedSkills);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

module.exports = {
	getSkills,
};
