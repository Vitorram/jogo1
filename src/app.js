const express = require("express");
const app = express();
const usuarioRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(express.static("public"));

app.use("/usuarios", usuarioRoutes);
app.use("/auth", authRoutes);

module.exports = app;
