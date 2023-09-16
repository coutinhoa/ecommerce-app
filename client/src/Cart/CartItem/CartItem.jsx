import React from "react";
import "./CartItem.css";
import binLogo from "../../images/Bin_logo.png";
import { Link } from "react-router-dom";

export const CartItem = ({ item, updateItemQuantity, removeItemFromList }) => {
  const availableOptions = [1, 2, 3, 4, 5];

  const handleChangeQuantity = (e) => {
    console.log(e.target.value);
    updateItemQuantity(item, e.target.value);
  };

  const handleRemoveItem = () => {
    removeItemFromList(item);
  };

  return (
    <li>
      <div className="info-container">
        {/* <div className="lines">
          <Link to={`/item-details/${item.id}`}>
            <img src={item.pictures[0].url} alt="item" className="image" />
          </Link>
        </div>*/}
        <div className="item-details">
          <div>Name: {item.name}</div>
          <div className="item-infos-in-cart">Type: {item.type}</div>
          <div className="item-infos-in-cart">Color: {item.color}</div>
          <div className="item-infos-in-cart">
            {item.premiumDelivery ? (
              <>
                <span className="plus-logo">PLUS</span>
                <span>Premium-Lieferung</span>
              </>
            ) : null}
            {/*or {item.premiumDelivery && <div>Premium-Lieferung</div>} */}
          </div>
          {/* <div className="cart-size-container">
            <div>Size:</div>
            <select className="cart-size-select" value={item.size}>
              {item.sizes.map((i) => {
                return <option key={i.id}>{i.size}</option>;
              })}
            </select>
          </div> */}
        </div>
        <div className="item-quantity">
          <span className="quantity-label">Quantity:</span>
          <select
            value={item.quantity}
            onChange={handleChangeQuantity}
            className="dropdown"
          >
            {availableOptions.map((n) => (
              <option key={n}>{n}</option>
            ))}
            {/*we want the map to return the jsx with options*/}
          </select>
          <div className="price">Price: {item.price * item.quantity}$</div>
          <button className="bin-button" onClick={handleRemoveItem}>
            <img src={binLogo} alt="remove item" className="bin-logo" />{" "}
            <span>Entfernen</span>
          </button>
        </div>
      </div>
    </li>
  );
};
