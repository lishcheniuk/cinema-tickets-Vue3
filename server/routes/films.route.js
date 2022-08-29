const { Router } = require("express");
const { ObjectId } = require("mongodb");

const router = Router();

router.get("/", (req, res) => {
  const Movies = req.app.locals.db.collection("movies");

  Movies.aggregate([
    {
      $lookup: {
        from: "schedule",
        localField: "_id",
        foreignField: "movie_id",
        as: "schedule",
      },
    },
  ]).toArray(function (err, movies) {
    if (err) return console.log(err);
    res.status(200).json(movies);
  });
});

router.post("/time-table", (req, res) => {
  const Schedule = req.app.locals.db.collection("schedule");
  const Orders = req.app.locals.db.collection("orders");

  try {
    req.body.places.forEach((item) => {
      Schedule.findOneAndUpdate(
        { _id: ObjectId(req.body.timeId) },
        { $set: { [`places.${item.row}.${item.place}`]: "busy" } },
        {
          returnOriginal: false,
        }
      );
    });

    Orders.insertOne(req.body, (err, result) => {
      res.status(200).json(result.ops[0]);
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
