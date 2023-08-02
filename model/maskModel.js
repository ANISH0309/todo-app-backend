const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const maskSchema = new mongoose.Schema({
	maskAcc: {
		type: String,
		// required: [true, "mask is Required"],
		unique: true,
	},
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "User",
	// },
});

// maskSchema.pre("save", async function (next) {
// 	const salt = await bcrypt.genSalt();
// 	this.maskAcc = await bcrypt.hash(this.maskAcc, salt);
// 	next();
// });

maskSchema.statics.metamask = async function (maskAcc) {
	const mask = await this.findOne({ maskAcc });
	if (mask) {
		// const auth = await bcrypt.compare(maskAcc, mask.maskAcc);
		// if (auth) {
		console.log("Mask already present");

		return mask;
		// }
		// throw Error("incorrect maksk");
	}
	throw Error("incorrect mask");
};

module.exports = mongoose.model("Masks", maskSchema);
