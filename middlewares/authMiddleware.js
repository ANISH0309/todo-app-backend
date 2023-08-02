const User = require("../model/authModel");
const Mask = require("../model/maskModel");
const jwt = require("jsonwebtoken");

module.exports = {
	checkUser: (req, res, next) => {
		const token = req.cookies.jwt;
		if (token) {
			jwt.verify(token, "supersecrettkjsdhsakjd", async (err, decodedToken) => {
				if (err) {
					res.json({ status: false });
					next();
				} else {
					const user = await User.findById(decodedToken.id);
					if (user) res.json({ status: true, user: user.email });
					else res.json({ status: false });
					next();
				}
			});
		} else {
			res.json({ status: false });
			next();
		}
	},
	checkMask: (req, res, next) => {
		const token = req.cookies.mask;
		if (token) {
			jwt.verify(token, "supersecrettkjsdhsakjd", async (err, decodedToken) => {
				if (err) {
					res.json({ status: false });
					next();
				} else {
					const mask = await Mask.findById(decodedToken.id);
					if (mask) res.json({ status: true, mask: mask.maskAcc });
					else res.json({ status: false });
					next();
				}
			});
		} else {
			res.json({ status: false });
			next();
		}
	},
};
