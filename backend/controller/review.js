import { db } from "../connect.js";

export const writereview = (req, res) => {
 

  const insertQuery =
    "INSERT INTO review (`user_id`, review_restaurant_id, `rating`, `review_text`, `image`, `posted_at`) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    insertQuery,
    [req.body.user_id, req.body.review_restaurant_id, req.body.rating, req.body.review_text, req.body.image, req.body.posted_at ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Review created successfully");
    }
  );
};


export const getReviewListByRestaurantID = (req, res) => {
  const restaurantId = req.query.review_restaurant_id;
  const query = `
  SELECT 
  user.full_name, 
  user.profile_picture, 
  user.email, 
  review.rating,
  review.posted_at,
  review.review_text 
FROM 
  review 
  JOIN user ON review.user_id = user.user_id 
WHERE 
  review.review_restaurant_id = ${restaurantId};

  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('An error occurred while retrieving reviews.');
    }

    res.json(results);
  });
}

export const getReviewfeed = (req, res) => {

  const query = `
  SELECT 
  user.full_name, 
  user.profile_picture, 
  user.email, 
  review.review_id,
  review.rating,
  review.posted_at,
  review.review_text,
  review.image,
  restaurant.restaurant_name
FROM 
  review 
  JOIN user ON review.user_id = user.user_id 
  JOIN restaurant ON review.review_restaurant_id = restaurant.restaurant_id
ORDER BY 
  review.posted_at DESC;


  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('An error occurred while retrieving reviews.');
    }

    res.json(results);
  });
}

