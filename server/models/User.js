const db = require("../db");

async function getUserIdByHash(hashValue) {
	const queryString = "SELECT user_id FROM users WHERE user_hash = $1";
	const result = await db.query(queryString, [hashValue]);
	if (result.rows.length === 0) {
		return null;
	}
	return result.rows[0].user_id;
}

module.exports = {
	getUserIdByHash,
};
