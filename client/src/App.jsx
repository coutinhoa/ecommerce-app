import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import "./App.css";
import Login from "./Login/Login";
import ItemPage from "../src/ItemPage/ItemPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./Admin/Users/Users";
import Orders from "./Orders/Orders";
import Inventory from "./Admin/Inventory/Inventory";

export const App = () => {
  const [items, setItems] = useState([]); //this is the original collection
  const [shoppingCart, setShoppingCart] = useState([]);
  const [size, setSize] = useState("");

  const getShoppingCart = () => {
    const userId = 5;
    fetch(`http://localhost:8081/api/v1/shopping-cart/${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setShoppingCart(response));
  };

  useEffect(() => {
    getShoppingCart();
  }, []);

  const cartQuantity = shoppingCart?.products?.length;

  const filterByIdentity = (identity) => {
    fetch(`http://localhost:8084/api/v1/warehouse/${identity}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setItems(response);
      });
  };

  useEffect(() => {
    filterByIdentity();
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

  const removeItem = (item) => {
    const userId = 5;
    fetch(`http://localhost:8081/api/v1/products/${item}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:8081/api/v1/shopping-cart/${userId}`, {
          method: "GET",
        });
        toast.warning("You deleted an item", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  useEffect(() => {
    removeItem();
  }, []);

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
            price: item.price * item.quantity,
            colour: item.colour,
            premiumDelivery: item.premiumDelivery,
            identity: item.identity,
            size: size,
          },
        ],
      }),
    }).then(() => {
      toast.success("Item added to Cart", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("after toast");
      setShoppingCart();
    });
  };

  const updateItemQuantity = (id, newQuantity) => {
    fetch(`http://localhost:8081/api/v1/products/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: newQuantity,
      }),
    }).then(() => {
      setShoppingCart();
    });
  };

  return (
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
                filterByIdentity={filterByIdentity}
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
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path={"item-details/:id"}
            element={
              <ItemPage
                shoppingCart={shoppingCart}
                filterByIdentity={filterByIdentity}
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
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
