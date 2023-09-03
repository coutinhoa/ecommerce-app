import React from "react";
import "./Body.css";
import clothes from "../../images/Clothes.jpg";
import zalandoLogo from "../../images/Zalando_logo.svg";
import { ItemInfo } from "./ItemInfo/ItemInfo";
import { amountArticles } from "../../utils/amountArticles";

export const Body = ({ shoppingCart, filteredItems }) => {
  const articlesQuantity = amountArticles(shoppingCart);

  return (
    <div className="body">
      <div className="items-container">
        <div className="infos-container">
          <div className="text-container">
            <div>
              <h1>Sommer-Sale</h1>
              <p className="sales-text">Bis zu 70% auf aktuelle Styles</p>
            </div>
            <div className="items-list">
              <a href="#clothingList" className="scroll-down">
                Available items
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div>
            <img src={clothes} className="clothes" alt="clothes" />
          </div>
        </div>
      </div>
      <div id="clothingList" className="clothing-list">
        <div className="clothing">
          <img src={zalandoLogo} className="z-logo" alt="logo" />
          <img src={zalandoLogo} className="z-logo" alt="logo" />
          <h1>Clothing</h1>
          <img src={zalandoLogo} className="z-logo" alt="logo" />
          <img src={zalandoLogo} className="z-logo" alt="logo" />
        </div>

        <div className="each-item">
          {filteredItems.length === 0 && <span>Item not found</span>}
          {filteredItems.map(
            (element) => {
              return (
                <ItemInfo
                  key={element.id}
                  element={element}
                  shoppingCart={shoppingCart}
                  articlesQuantity={articlesQuantity}
                />
              );
            }
            //(element, index) we use index when we don't have an id and then key={index}
          )}
        </div>
      </div>
    </div>
  );
};
