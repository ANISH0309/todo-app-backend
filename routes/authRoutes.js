const { register, login, metamask } = require("../controllers/authControllers");
const { checkUser, checkMask } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
// router.post("/mask", metamask);

module.exports = router;
