import "./ShoppingCart.css";
import React from "react";
import { Cart } from "../Cart/Cart";
import { PriceInfo } from "../PriceInfo/PriceInfo";
import zalandoLogo from "../images/Zalando_logo.svg";

function ShoppingCart({
  shoppingCart,
  updateItemQuantity,
  removeItemFromList,
  cartQuantity,
  getShoppingCart,
}) {
  return (
    <div className="ShoppingCart">
      <div className="logo-container">
        <img src={zalandoLogo} className="ShoppingCart-logo" alt="logo" />
        <img src={zalandoLogo} className="ShoppingCart-logo" alt="logo" />
        <img src={zalandoLogo} className="ShoppingCart-logo" alt="logo" />
      </div>
      <div className="separate-page">
        <Cart
          items={shoppingCart}
          articlesQuantity={cartQuantity}
          updateItemQuantity={updateItemQuantity}
          removeItemFromList={removeItemFromList}
        />
        <PriceInfo items={shoppingCart} getShoppingCart={getShoppingCart} />
      </div>
    </div>
  );
}

export default ShoppingCart;
