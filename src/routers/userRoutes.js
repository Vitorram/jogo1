const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/userController");

router.get("/", usuarioController.getAll);
router.get("/:id", usuarioController.getOne);
router.post("/", usuarioController.create);
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.delete);

module.exports = router;
