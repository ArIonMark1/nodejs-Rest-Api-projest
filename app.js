const express = require("express");
const logger = require("morgan"); // morgan - проміжний компонент для протоколювання запитів із можливістю налаштування формату виводу(логування дій на сервері, запитів)
const cors = require("cors"); // CROSS-ORIGIN RESOURCE SHARING(перехрений обмін ресурсами) - механізм, за допомогою HTTP-заголовків дає браузеру дозвіл
// завантажувати ресурси з певного джерела на запит web-додатка, отриманого з відмінного джерела
const userRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express(); // повертає вебсервер
const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // логує інформацію у консоль

app.use(logger(formatsLogger));
app.use(cors()); // підключення кросплатформених запитів
app.use(express.json()); // підключення конвертування даних у json-формат
app.use("/api/users", userRouter); // підключення користувацьких роутерів до проекту
app.use("/api/contacts", contactsRouter); // підключення роутерів до проекту
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
