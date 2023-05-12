const db = require("../db");

async function getUserSkills(userId) {
	const queryString = `
    SELECT s.*, us.importance_level
    FROM user_skills us
    JOIN skills s ON us.skill_id = s.skill_id
    WHERE us.user_id = $1
  `;
	const result = await db.query(queryString, [userId]);
	return result.rows;
}

async function addUserSkill(userId, skillId, importanceLevel) {
	const queryString = `
	  INSERT INTO user_skills (user_id, skill_id, importance_level)
	  VALUES ($1, $2, $3)
	`;
	await db.query(queryString, [userId, skillId, importanceLevel]);
}

async function deleteUserSkill(userId, skillId) {
	const queryString = `
    DELETE FROM user_skills
    WHERE user_id = $1 AND skill_id = $2
  `;
	await db.query(queryString, [userId, skillId]);
}

module.exports = {
	getUserSkills,
	addUserSkill,
	deleteUserSkill,
};
