import React from "react";
import "./Cart.css";
import { amountArticles } from "../utils/amountArticles";
import { CartItem } from "./CartItem/CartItem";
import mastercardLogo from "./../images/Mastercard_logo.svg";
import visaLogo from "./../images/Visa_logo.svg";
import { Link } from "react-router-dom";

export const Cart = ({
  items,
  articlesQuantity,
  updateItemQuantity,
  removeItemFromList,
}) => {
  //const articlesQuantity = amountArticles(items);

  const getDeliveryTime = () => {
    var initDate = new Date();
    initDate.setDate(initDate.getDate() + 5);

    var finDate = new Date();
    finDate.setDate(finDate.getDate() + 7);

    return initDate.toDateString() + " - " + finDate.toDateString();
  };

  return (
    <div className="cart">
      <div className="articles">
        <h2>Warenkorb ({articlesQuantity} Artikel)</h2>
        <h5>Versandt durch ZALANDO</h5>
        <ul>
          {items.products.map((item) => {
            return (
              <CartItem
                key={item.name}
                item={item}
                updateItemQuantity={updateItemQuantity}
                removeItemFromList={removeItemFromList}
              />
            );
          })}
          <Link
            className="continue_shopping"
            to={`/`}
            style={{
              textDecoration: "none",
              color: "black",
              backgroundColor: "orangered",
              fontWeight: "bold",
              justifyContent: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingRight: "10px",
              paddingLeft: "10px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </Link>
        </ul>

        <p className="article-infos">
          Artikel im Warenkorb werden nicht reserviert.
        </p>
      </div>
      <div className="border-three">
        <h2>Voraussichtliche Lieferung</h2>
        {getDeliveryTime()}
      </div>
      <div className="border-three">
        <h2>Wir akzeptieren</h2>
        <img src={mastercardLogo} className="payment-logo" alt="logo" />
        <img src={visaLogo} className="payment-logo" alt="logo" />
      </div>
    </div>
  );
};
