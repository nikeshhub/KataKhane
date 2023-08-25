import { db } from "../connect.js";

export const createevent = (req, res) => {
  const insertQuery =
    "INSERT INTO event (`event_name`, `date`, `time`, `location`, `imageUrl`, `description`, `restaurant_id` ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    insertQuery,
    [
      req.body.event_name,
      req.body.date,
      req.body.time,
      req.body.location,
      req.body.imageUrl,
      req.body.description,
      req.body.restaurant_id,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Event created successfully");
    }
  );
};

export const getEvents = (req, res) => {
  const restaurantId = req.query.restaurant_id;
  const selectQuery = `SELECT * FROM event WHERE restaurant_id = ${restaurantId} `;
  db.query(selectQuery, restaurantId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getEventList = (req, res) => {
  const query = `
    SELECT r.restaurant_name, r.logo, e.event_name, e.date, e.time, e.location, e.imageUrl, e.description
    FROM event e
    INNER JOIN restaurant r ON e.restaurant_id = r.restaurant_id
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('An error occurred while retrieving events.');
    }

    res.json(results);
  });
}