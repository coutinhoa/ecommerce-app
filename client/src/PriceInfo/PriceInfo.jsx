import React from "react";
import "./PriceInfo.css";
import { priceArticles } from "./utils/priceArticles";

export const PriceInfo = ({ items }) => {
  //const price = priceArticles(items);
  const price = priceArticles(items);

  const delivery = items.length === 0 ? 0 : 3;

  const total = delivery + price;

  return (
    <div className="price-infos">
      <div className="border_one">
        <div>
          <h3 className="bold">Gesamtsumme</h3>
          <div className="total-container">
            <span>Zwischensumme</span>
            <span>{price.toFixed(2)}$</span>
          </div>
          <div className="total-container">
            <span>Lieferung</span>
            <span>{delivery.toFixed(2)}$</span>
          </div>
        </div>
        <div className="line">
          <div className="total-container">
            <span className="bold">Gesamtsumme (inkl. MwSt.)</span>
            <span>{total.toFixed(2)}$</span>
          </div>
          <button className="button">Zur Kasse</button>
        </div>
      </div>
      <div className="border_two">
        <select className="coupon_container">
          <option value="Gutschein hinzufügen (optional)">
            Gutschein hinzufügen (optional)
          </option>
        </select>
      </div>
    </div>
  );
};
