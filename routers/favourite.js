const router = require("express").Router();
const favorutie = require("../controllers/favourite");

router.post("/insert",favorutie.add_favoruties);

module.exports = router;