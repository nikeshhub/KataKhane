import React, { useState } from "react";
import { Table, Button, Input, Select, Modal, Form } from "antd";
import './menu.scss';

const { Option } = Select;

function RestaurantMenu() {
    const [menu, setMenu] = useState([
        {
            name: "Pizza",
            category: "Main Course",
            cuisine: "Italian",
            price: 10,
        },
        {
            name: "Burger",
            category: "Main Course",
            cuisine: "American",
            price: 8,
        },
        {
            name: "Salad",
            category: "Appetizer",
            cuisine: "Mediterranean",
            price: 6,
        },
    ]);
    const [newMenuItem, setNewMenuItem] = useState({
        name: "",
        category: "",
        cuisine: "",
        price: "",
    });
    const [filters, setFilters] = useState({
        category: "",
        cuisine: "",
        price: "",
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
    const [isAddCuisineModalVisible, setIsAddCuisineModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [newCuisine, setNewCuisine] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const handleInputChange = (event) => {
        setNewMenuItem({
            ...newMenuItem,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddMenu = () => {
        setMenu([...menu, newMenuItem]);
        setNewMenuItem({ name: "", category: "", cuisine: "", price: "" });
    };

    const handleUpdateMenu = (index, updatedMenuItem) => {
        const updatedMenu = [...menu];
        updatedMenu[index] = updatedMenuItem;
        setMenu(updatedMenu);
    };

    const handleDeleteMenu = (index) => {
        const updatedMenu = [...menu];
        updatedMenu.splice(index, 1);
        setMenu(updatedMenu);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters({ ...filters, [filterName]: value });
    };

    const handleCategoryChange = (value) => {
        setFilters({ ...filters, category: value });
    };

    const handleCuisineChange = (value) => {
        setFilters({ ...filters, cuisine: value });
    };

    const handlePriceChange = (value) => {
        setFilters({ ...filters, price: value });
    };

    const handleNewCategory = () => {
        setIsModalVisible(true);
    };

    const handleNewCategoryOk = () => {
        setFilters({ ...filters, category: newCategory });
        setIsModalVisible(false);
        setNewCategory("");
    };

    const handleNewCategoryCancel = () => {
        setIsModalVisible(false);
        setNewCategory("");
    };

    const handleNewCuisine = () => {
        setNewMenuItem({ ...newMenuItem, cuisine: newCuisine });
        setNewCuisine("");
    };

    const handleNewPrice = () => {
        setNewMenuItem({ ...newMenuItem, price: newPrice });
        setNewPrice("");
    };

    const filteredMenu = menu.filter((menuItem) => {
        return (
            menuItem.category.includes(filters.category) &&
            menuItem.cuisine.includes(filters.cuisine) &&
            menuItem.price.toString().includes(filters.price)
        );
    });

    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            filters: [
                { text: "Main Course", value: "Main Course" },
                { text: "Appetizer", value: "Appetizer" },
                { text: "Dessert", value: "Dessert" },
            ],
            onFilter: (value, record) => record.category.indexOf(value) === 0,
        },
        {
            title: "Cuisine",
            dataIndex: "cuisine",
            key: "cuisine",
            filters: [
                { text: "Italian", value: "Italian" },
                { text: "American", value: "American" },
                { text: "Mediterranean", value: "Mediterranean" },
            ],
            onFilter: (value, record) => record.cuisine.indexOf(value) === 0,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Action",
            key: "action",
            render: (text, record, index) => (
                <div>
                    <Button
                        type="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                            const updatedMenuItem = {
                                name: newMenuItem.name || record.name,
                                category: newMenuItem.category || record.category,
                                cuisine: newMenuItem.cuisine || record.cuisine,
                                price: newMenuItem.price || record.price,
                            };
                            handleUpdateMenu(index, updatedMenuItem);
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => {
                            handleDeleteMenu(index);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{  marginLeft: "250px" }}>
            <h1>Menu</h1>
            <Button
                type="primary"
                onClick={() => {
                    setIsModalVisible(true);
                }}
            >
                Add Menu
            </Button>
            <br />
            <br />
            <Select
                placeholder="Filter by category"
                style={{ width: 200, marginRight: "10px" }}
                onChange={handleCategoryChange}
                value={filters.category}
            >
                <Option value="">All</Option>
                <Option value="Main Course">Main Course</Option>
                <Option value="Appetizer">Appetizer</Option>
                <Option value="Dessert">Dessert</Option>
            </Select>
            <Select
                placeholder="Filter by cuisine"
                style={{ width: 200, marginRight: "10px" }}
                onChange={handleCuisineChange}
                value={filters.cuisine}
            >
                <Option value="">All</Option>
                <Option value="Italian">Italian</Option>
                <Option value="American">American</Option>
                <Option value="Mediterranean">Mediterranean</Option>
            </Select>
            <Input
                placeholder="Filter by price"
                style={{ width: 200, marginRight: "10px" }}
                onChange={(event) => {
                    handlePriceChange(event.target.value);
                }}
                value={filters.price}
            />
            <Table dataSource={filteredMenu} columns={columns} />

            <Modal
                title="Add Menu"
                visible={isModalVisible}
                onOk={handleAddMenu}
                onCancel={() => {
                    setIsModalVisible(false);
                }}
            >
                <Form {...layout} name="basic" initialValues={{ remember: true }}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input menu name!" }]}
                    >
                        <Input
                            onChange={(event) => {
                                setNewMenuItem({
                                    ...newMenuItem,
                                    name: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: "Please select category!" }]}
                    >
                        <Select
                            onChange={(value) => {
                                setNewMenuItem({
                                    ...newMenuItem,
                                    category: value,
                                });
                            }}
                        >
                            <Option value="Main Course">Main Course</Option>
                            <Option value="Appetizer">Appetizer</Option>
                            <Option value="Dessert">Dessert</Option>
                            <Option
                                value="Add New Category"
                                onClick={() => {
                                    setIsAddCategoryModalVisible(true);
                                }}
                            >
                                Add New Category
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Cuisine"
                        name="cuisine"
                        rules={[{ required: true, message: "Please select cuisine!" }]}
                    >
                        <Select
                            onChange={(value) => {
                                setNewMenuItem({
                                    ...newMenuItem,
                                    cuisine: value,
                                });
                            }}
                        >
                            <Option value="Italian">Italian</Option>
                            <Option value="American">American</Option>
                            <Option value="Mediterranean">Mediterranean</Option>
                            <Option
                                value="Add New Cuisine"
                                onClick={() => {
                                    setIsAddCuisineModalVisible(true);
                                }}
                            >
                                Add New Cuisine
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input price!" }]}
                    >
                        <Input
                            type="number"
                            onChange={(event) => {
                                setNewMenuItem({
                                    ...newMenuItem,
                                    price: parseFloat(event.target.value),
                                });
                            }}
                        />
                    </Form.Item>
                </Form>

                <Modal
                    title="Add New Category"
                    visible={isAddCategoryModalVisible}
                    onOk={() => {
                        setIsAddCategoryModalVisible(false);
                    }}
                    onCancel={() => {
                        setIsAddCategoryModalVisible(false);
                    }}
                >
                    <Input
                        onChange={(event) => {
                            setNewCategory(event.target.value);
                        }}
                    />
                </Modal>

                <Modal
                    title="Add New Cuisine"
                    visible={isAddCuisineModalVisible}
                    onOk={() => {
                        setIsAddCuisineModalVisible(false);
                    }}
                    onCancel={() => {
                        setIsAddCuisineModalVisible(false);
                    }}
                >
                    <Input
                        onChange={(event) => {
                            setNewCuisine(event.target.value);
                        }}
                    />
                </Modal>
            </Modal>
        </div>
    );
}

export default RestaurantMenu;
