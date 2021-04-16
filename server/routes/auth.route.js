const { Router } = require("express");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/login", (req, res) => {
  const { email, password: passCandidate } = req.body;
  try {
    const Users = req.app.locals.db.collection("users");

    Users.findOne({ email }, (err, user) => {
      if (!user)
        return res
          .status(400)
          .json({ message: "Такого пользователя не существует" });

      const { email, name, _id, password } = user;
      const isMatch = bcrypt.compareSync(passCandidate, password);

      if (!isMatch)
        return res.status(400).json({ message: "Неверный логин или пароль" });

      res.status(200).json({ email, name, _id });
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  try {
    const Users = req.app.locals.db.collection("users");

    Users.findOne({ email }, (err, result) => {
      if (result) {
        return res.status(400).json({ message: "Такой email уже существует" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      Users.insertOne({ ...req.body, password: hashedPassword }, () => {
        res.status(200).json({
          message:
            "Вы успешно зарегистрировались. Теперь можете авторизироваться",
        });
      });
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/orders/:userId", (req, res) => {
  try {
    const Orders = req.app.locals.db.collection("orders");

    Orders.find({ userId: req.params.userId }).toArray((err, result) => {
      const orders = (result || []).map(
        ({ places, movieId, timeId, _id: id }) => ({
          places,
          movieId,
          timeId,
          id,
        })
      );
      res.status(200).json(orders);
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
