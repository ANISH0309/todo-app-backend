const User = require("../model/authModel");
// const Mask = require("../model/maskModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "supersecrettkjsdhsakjd", {
		expiresIn: maxAge,
	});
};
// const createTokenMask = (id) => {
// 	return mask.sign({ id }, "supersecrettkjsdhsakjd", {
// 		expiresIn: maxAge,
// 	});
// };

const handleErrors = (err) => {
	let errors = { email: "", password: "" };

	console.log(err);
	if (err.message === "incorrect email") {
		errors.email = "That email is not registered";
	}

	if (err.message === "incorrect password") {
		errors.password = "That password is incorrect";
	}

	if (err.code === 11000) {
		errors.email = "Email is already registered";
		return errors;
	}

	if (err.message.includes("Users validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

// const handleErrorsJWT = (err) => {
// 	let errors = { maskAcc: "" };

// 	if (err.code === 11000) {
// 		errors.maskAcc = "Mask is already registered";
// 		return errors;
// 	}

// 	console.log(err);

// 	return errors;
// };

module.exports.register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.create({ email, password });
		const token = createToken(user._id);

		res.cookie("jwt", token, {
			withCredentials: true,
			httpOnly: false,
			maxAge: maxAge * 1000,
		});

		res.status(201).json({ user: user._id, created: true });
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		res.json({ errors, created: false });
	}
};

// module.exports.metamask = async (req, res, next) => {
// 	try {
// 		const mask = req.body;
// 		console.log(mask.header);
// 		console.log("from line 80");

// 		const found = await Mask.findOne({ mask });
// 		console.log(found);
// 		if (!found) {
// 			const maskAcc = await Mask.create(mask);
// 			const tokenMask = createTokenMask(maskAcc._id);

// 			res.cookie("mask", tokenMask, {
// 				withCredentials: true,
// 				httpOnly: false,
// 				maxAge: maxAge * 1000,
// 			});
// 		}

// 		// res.status(201).json({ mask: maskAcc._id, created: true });
// 	} catch (err) {
// 		console.log(err);
// 		const errors = handleErrorsJWT(err);
// 		res.json({ errors, created: false });
// 	}
// };

module.exports.login = async (req, res) => {
	const { email, password, mask } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id, status: true });
	} catch (err) {
		const errors = handleErrors(err);
		res.json({ errors, status: false });
	}
};
