const db = require("../db");

async function getAllSkills() {
	const queryString = `
    SELECT *
    FROM skills
  `;
	const result = await db.query(queryString);
	return result.rows;
}

const getSkillByCode = async (skillCode) => {
	const query = "SELECT skill_id FROM skills WHERE skill_code = $1";
	const values = [skillCode];

	const result = await db.query(query, values);

	if (result.rows.length === 0) {
		return null;
	}

	return result.rows[0].skill_id;
};

module.exports = {
	getAllSkills,
	getSkillByCode,
};
