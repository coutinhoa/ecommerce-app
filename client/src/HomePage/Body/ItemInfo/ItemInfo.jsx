import React from "react";
import "./ItemInfo.css";
import { Link } from "react-router-dom";

export const ItemInfo = ({ element }) => {
  return (
    <div className="item-info" item={element}>
      <Link className="item-image" to={`/item-details/${element.id}`}>
        <img src={element.pictures[0].url} className="item-image" alt="item" />
      </Link>
      <div className="infos-container">
        <div>
          <div className="infos">
            <Link
              className="infos-link"
              to={`/item-details/${element.id}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              {element.name} {element.type} - {element.colour}
            </Link>
          </div>
          <div className="infos-price">{element.price.toFixed(2)}$</div>
          <div>
            {element.premiumDelivery ? (
              <>
                <span className="plus-logo">PLUS</span>
                <span>Premium-Lieferung</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
