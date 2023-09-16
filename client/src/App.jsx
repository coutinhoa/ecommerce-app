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
  const [filteredItems, setFilteredItems] = useState([]); //the filteredItems is the collection the undelying componenst are gonna see
  //const [item, setItem] = useState();
  /**
   * Adds an item to the shopping cart.
   * If the item already exists, increments the quantity of the item by 1.
   * else adds to shopping cart.
   * @param item
   */
  /*const addItemToShoppingCart = (item) => {
    const cartItem = shoppingCart.find((i) => i.id === item.id);

    if (cartItem) {
      cartItem.quantity = cartItem.quantity + 1;
      const updatedCart = shoppingCart.map((i) =>
        i.id === cartItem.id ? cartItem : i
      );
      setShoppingCart(updatedCart);
    } else {
      const newShoppingCartItem = { ...item, quantity: 1 };
      setShoppingCart([...shoppingCart, newShoppingCartItem]);
    }
  };*/

  const addItemToShoppingCart = () => {};

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

  console.log(shoppingCart);

  const cartQuantity = shoppingCart?.products?.length;

  /*const updateItemQuantity = (item, event) => {
    //select a quantity and save it in the shopping cart

    item.quantity = parseInt(item.quantity + event.target.value);
    console.log(item);
    //setShoppingCart(cart);
  };*/
  const updateItemQuantity = () => {};

  const filterByIdentity = (identity) => {
    const newItems = items.filter((element) => element.identity === identity);
    setFilteredItems(newItems);
  };

  const handleSearchSubmit = (specification) => {
    if (specification === "") {
      console.log("i am empty");
      setFilteredItems(items);
    } else {
      const searchedItems = items.filter(
        (element) =>
          element.color.toLowerCase() === specification ||
          element.name.toLowerCase() === specification ||
          element.type.toLowerCase() === specification
      );

      setFilteredItems(searchedItems);
    }
  };

  //console.log(filteredItems);

  // set up cart so it has all the elements zou want, set Shopping Cart as the fullz readz cart, setState only updates when the next render is executed
  // if itemAdded starts at false, whats the value of added, setItemAdded(true); const added = itemAdded; //its false until the next render, so onlz after we leave the current function does the value get updated

  /*const removeItem = (item) => {
    const deleteItem = shoppingCart.filter((i) => i !== item);
    setShoppingCart(deleteItem);
  };*/

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
                filteredItems={filteredItems}
                cartQuantity={cartQuantity}
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
                addItemToShoppingCart={addItemToShoppingCart}
                cartQuantity={cartQuantity}
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
