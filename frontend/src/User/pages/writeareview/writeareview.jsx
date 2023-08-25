import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Rate, Button, Select, List, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./writeareview.scss";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";

const { Option } = Select;

const WriteReview = () => {
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [image, setImage] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    // Make an API call to fetch all restaurants
    fetch("http://localhost:8800/api/restaurant/getallrestaurants")
      .then((response) => response.json())
      .then((data) => setAllRestaurants(data));
  }, []);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formImage = new FormData();
    formImage.append("file", file);
    formImage.append("upload_preset", "Images");
    formImage.append("cloud_name", "duaz5kg1m");

    axios
      .post("https://api.cloudinary.com/v1_1/duaz5kg1m/image/upload", formImage)
      .then((response) => {
        setImage(response.data.secure_url);
      })
      .catch((error) => {
        console.error(error);
        console.log("check");
        // Do something with error (e.g. show error message)
      });
  };

  const handleSearch = (value) => {
    // Filter the list of restaurants based on the user input
    const filteredRestaurants = allRestaurants.filter((restaurant) =>
      restaurant.restaurant_name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredRestaurants);
  };

  const handleRestaurantSelect = (restaurant) => {
    // Set the name of the selected restaurant
    setName(restaurant.restaurant_name);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    
   
      // Append the restaurant ID to the form data
      formData.append("user_id", currentUser.user_id);
       // Make a GET request to retrieve the restaurant ID
    fetch(`http://localhost:8800/api/restaurant/getrestaurantnamebyid?restaurant_name=${name}`, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      // Get the restaurant ID from the response data
      const restaurantId = data.restaurant_id;
  
      formData.append("review_restaurant_id", restaurantId);  
    })   .catch((error) => {
      console.error("Error retrieving restaurant ID:", error);
    } );
      formData.append("rating", rating);
      formData.append("review_text", reviewText);
      formData.append("image", image);
      formData.append("posted_at", new Date().toLocaleString("en-US", {timeZone: "UTC"}).replace(",", ""));

  
      // Make a POST request to submit the review
      axios.post("http://localhost:8800/api/review/createreview", formData, )
      .then((response) => response.json())
      .then((data) => {
        console.log("Review submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
   

  };
  

  return (
    <div className="write-review-page">
      <h1>Write a review</h1>
      <div className="search-container">
        <Input.Search
          placeholder="Search for a restaurant"
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
        />

        <List
          bordered
          dataSource={searchResults}
          renderItem={(restaurant) => (
            <List.Item
              onClick={() => handleRestaurantSelect(restaurant)}
              style={{ cursor: "pointer" }}
            >
              <Card
                title={restaurant.restaurant_name}
                style={{ width: "100%" }}
              >
              </Card>
            </List.Item>
          )}
        />
      </div>
      <div className="write-review-form-container">
        <div className="review-input-container">
          <label htmlFor="name-input">Restaurant's Name</label>
          <Input id="name-input" value={name} onChange={handleNameChange} />
        </div>
        <div className="review-input-container">
          <label htmlFor="rating-input">Rating</label>
          <Rate value={rating} onChange={handleRatingChange} />
        </div>
        <div className="review-input-container">
          <label htmlFor="review-text-input">Your Review</label>
          <Input.TextArea
            id="review-text-input"
            value={reviewText}
            onChange={handleReviewTextChange}
            autoSize={{ minRows: 4 }}
          />
        </div>
        <div className="review-input-container">
          <label>Upload Images</label>
          <Input
            type="file"
            name="images"
            id="images"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <Button
        type="primary"
        danger
        className="submit-button"
        onClick={handleSubmit}
      >
        Submit Review
      </Button>
    </div>
  );
};

export default WriteReview;
