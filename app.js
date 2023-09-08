const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// process.env.NODE_ENV;
// process.env.SECRET_KEY;
// morgan - проміжний компонент для протоколювання запитів із можливістю налаштування формату виводу(логування дій на сервері, запитів)
const contactsRouter = require("./routes/api/contacts");

const app = express(); // повертає вебсервер

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // логує інформацію у консоль

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// ----------------------------------------
app.use("/api/contacts", contactsRouter); // підключення роутера до проекту
// ----------------------------------------

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
// ================= обробник помилок =================
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ status, message });
});

module.exports = app;
