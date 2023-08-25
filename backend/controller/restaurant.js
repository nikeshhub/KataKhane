import { db } from "../connect.js";

export const getallrestaurants = (req, res) => {
    db.query('SELECT * FROM restaurant', (error, results, fields) => {
        if (error) {
          console.error('Error querying restaurants table: ', error);
          res.sendStatus(500);
        } else {
          res.send(results);
        }
    })
}


export const getrestaurantnamebyid = (req, res) => {
    const name = req.query.restaurant_name;

    // Query the database to get the restaurant ID
    db.query(
      "SELECT restaurant_id FROM restaurant WHERE restaurant_name = ?",
      [name],
      (error, results, fields) => {
        if (error) {
          console.error("Error querying database:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
  
        // Check if a matching restaurant was found
        if (results.length === 0) {
          res.status(404).json({ error: "Restaurant not found" });
          return;
        }
  
        // Return the restaurant ID
        const restaurantId = results[0].restaurant_id;
        res.json({ restaurant_id: restaurantId });
      }
    );
}
