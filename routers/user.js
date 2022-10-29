const router = require("express").Router();
const usercontroller = require("../controllers/user");

router.post("/register",usercontroller.register);
router.post("/login",usercontroller.checklogin);

module.exports = router;