import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import "./App.css";
import {Login} from "./Login/Login";
import ItemPage from "../src/ItemPage/ItemPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./Admin/Users/Users";
import Orders from "./Orders/Orders";
import Inventory from "./Admin/Inventory/Inventory";
import SuccessMessage from "./ShoppingCart/SuccessMessage";
import {Registration} from "./Registration/Registration";
import { UserProvider } from './UserContext';
import {Profile} from './Profile/Profile';

export const App = () => {
  const [items, setItems] = useState([]); //this is the original collection
  const [shoppingCart, setShoppingCart] = useState([]);
  const [size, setSize] = useState("");

  const cartQuantity = shoppingCart?.products?.length;

  const filterByCategory = (category) => {
    fetch(`http://localhost:8084/api/v1/warehouse/${category}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setItems(response);
      });
  };

  useEffect(() => {
    filterByCategory();
  }, []);

  const fetchClothes = () => {
    fetch(`http://localhost:8084/api/v1/warehouse`)
      .then((response) => response.json())
      .then((response) => {
        setItems(response);
      });
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  const getShoppingCart = () => {
    const userId = 5;
    fetch(`http://localhost:8081/api/v1/shopping-cart/${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => { console.log(response);
          setShoppingCart(response)})
  };

  useEffect(() => {
    getShoppingCart();
  }, []);

  const removeItem = async (id) => {
    await fetch(`http://localhost:8081/api/v1/products/${id}`, {
      method: "DELETE",
    });
    getShoppingCart();
  };

  const handleSearchSubmit = (specification) => {
    if (specification === "") {
      console.log("i am empty");
      setItems(items);
    } else {
      const searchedItems = items.filter(
        (element) =>
          element.colour.toLowerCase() === specification ||
          element.name.toLowerCase() === specification ||
          element.type.toLowerCase() === specification
      );
      setItems(searchedItems);
    }
  };

  const addItemToShoppingCart = (item) => {
    const userId = 5;
    fetch(`http://localhost:8081/api/v1/shopping-cart/${userId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        products: [
          {
            id: item.id,
            quantity: 1,
            name: item.name,
            type: item.type,
            price: item.price,
            colour: item.colour,
            premiumDelivery: item.premiumDelivery,
            category: item.category,
            size: size,
          },
        ],
      }),
    }).then(() => {
      toast.success("Item added to Cart", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShoppingCart();
    });
  };

  const updateItemQuantity = (id, newQuantity) => {
    console.log(shoppingCart);
    fetch(`http://localhost:8081/api/v1/products/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: newQuantity,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedProducts = shoppingCart.products.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );

        setShoppingCart((prevCart) => ({
          ...prevCart,
          products: updatedProducts,
        }));
      });
  };

/* <UserProvider> Wraps the entire application (or at least the parts that need access to the user state). */

  return (
    <UserProvider>
      <>
        <header className="header-one">
          <p>Hilfe und Kontakt</p> <p>KOSTENLOSER VERSAND UND RÜCKVERSAND</p>
          <p>100 TAGE RÜCKGABERECHT</p>
        </header>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  shoppingCart={shoppingCart}
                  filterByCategory={filterByCategory}
                  handleSearchSubmit={handleSearchSubmit}
                  items={items}
                  cartQuantity={cartQuantity}
                  fetchClothes={fetchClothes}
                />
              }
            />
            <Route
              path="/shopping-cart"
              element={
                <ShoppingCart
                  shoppingCart={shoppingCart}
                  updateItemQuantity={updateItemQuantity}
                  removeItemFromList={removeItem}
                  cartQuantity={cartQuantity}
                  getShoppingCart={getShoppingCart}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path={"item-details/:id"}
              element={
                <ItemPage
                  shoppingCart={shoppingCart}
                  filterByCategory={filterByCategory}
                  handleSearchSubmit={handleSearchSubmit}
                  cartQuantity={cartQuantity}
                  items={items}
                  size={size}
                  setSize={setSize}
                  addItemToShoppingCart={addItemToShoppingCart}
                />
              }
            />
            <Route path="/admin-view" element={<Users />} />
            <Route path="/my-orders" element={<Orders />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/success-message" element={<SuccessMessage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </>
    </UserProvider>
  );
};
export default App;
