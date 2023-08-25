import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import "./event.scss";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

const { RangePicker } = DatePicker;

const EventsPage = () => {
  const { currentRestaurant } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    event_name: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
    description: "",
  });
  const [image, setImage] = useState();
  const [events, setEvents] = useState([
    
  ]);
  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/event/getevent?restaurant_id=${currentRestaurant.restaurant_id}`
        );
        setEvents(response.data);
      } catch (error) {
        console.log(error);
        setErr("Failed to fetch events.");
      }
    };

    fetchEvents();
  }, [currentRestaurant.restaurant_id]);

  const [err, setErr] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formImage = new FormData();
    formImage.append("file", file);
    formImage.append("upload_preset", "Images");
    formImage.append("cloud_name", "duaz5kg1m");

    axios
      .post("https://api.cloudinary.com/v1_1/duaz5kg1m/image/upload", formImage)
      .then((response) => {
        setImage(response.data.public_id);
        setFormData({ ...formData, imageUrl: response.data.secure_url });
      })
      .catch((error) => {
        console.error(error);
        console.log("check");
        // Do something with error (e.g. show error message)
      });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk =  () => {
    form
      .validateFields()
      .then((values) => {
        const formattedDate = values.date
          ? values.date.format("YYYY-MM-DD")
          : "";
        const formattedStartTime = values.time
          ? values.time[0].format("HH:mm")
          : "";
        const formattedEndTime = values.time
          ? values.time[1].format("HH:mm")
          : "";

        const newEvent = {
          event_name: values.event_name,
          date: formattedDate,
          time: `${formattedStartTime} - ${formattedEndTime}`,
          location: values.location,
          imageUrl: formData.imageUrl,
          description: values.description,
          restaurant_id: currentRestaurant.restaurant_id,
        };

        // Make the POST request
        axios
          .post("http://localhost:8800/api/event/createevent", newEvent)
          .then((response) => {
            console.log(response.data);
            setEvents([...events, newEvent]);
            form.resetFields();
            setModalVisible(false);
            message.success("Event created successfully!");
          })
          .catch((error) => {
            console.log(error);
            message.error("Failed to create event!");
          });
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Events</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Create Event
        </Button>
      </div>
      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h2>{event.name}</h2>
            <div className="event-card-details">
              <div className="event-card-date">
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="event-card-time">
              {event.time.split(" - ")[0]} - {event.time.split(" - ")[1]}
              </div>
              <div className="event-card-location">{event.location}</div>
            </div>
            <div className="event-card-description">{event.description}</div>
          </div>
        ))}
      </div>
      <Modal
        title="Create Event"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="event_name"
            label="Event Name"
            rules={[{ required: true, message: "Please enter event name" }]}
          >
            <Input placeholder="Enter event name" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker placeholder="Select date" />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <RangePicker showTime format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter event location" }]}
          >
            <Input placeholder="Enter event location" />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Image"
            rules={[{ required: true, message: "Please enter event location" }]}
          >
            <Input
              type="file"
              name="imageUrl"
              id="imageUrl"
              onChange={handleImageUpload}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter event description" },
            ]}
          >
            <Input.TextArea placeholder="Enter event description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventsPage;
