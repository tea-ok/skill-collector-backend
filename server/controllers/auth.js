const User = require("../models/User");

const login = async (req, res) => {
	try {
		const { hashValue } = req.body;
		const userId = await User.getUserIdByHash(hashValue);

		if (!userId) {
			return res.status(401).send("Invalid credentials");
		}

		req.session.userId = userId;
		req.session.hashValue = hashValue;
		res.status(200).send({ success: true, userId });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		} else {
			res.clearCookie("session");
			res.status(200).send({ success: true });
		}
	});
};

module.exports = {
	login,
	logout,
};
