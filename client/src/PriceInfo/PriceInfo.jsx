import "./PriceInfo.css";
import { priceArticles } from "./utils/priceArticles";
import { Link } from "react-router-dom";

export const PriceInfo = ({ items, getShoppingCart, setSuccessModal }) => {
  //const price = priceArticles(items);
  const price = priceArticles(items);

  const delivery = items.products.length === 0 ? 0 : 3;

  const total = delivery + price;

  const makePurchase = async () => {
    const userId = 5;
    await fetch(
      `http://localhost:8081/api/v1/shopping-cart/purchase/${userId}`,
      {
        method: "POST",
      }
    ).then(() => {
      getShoppingCart();
      setSuccessModal(true);
    });
  };

  return (
    <div className="price-infos">
      <div className="border_one">
        <div>
          <h3 className="bold">Gesamtsumme</h3>
          <div className="total-container">
            <span>Zwischensumme</span>
            <span>{price}$</span>
          </div>
          <div className="total-container">
            <span>Lieferung</span>
            <span>{delivery}$</span>
          </div>
        </div>
        <div className="line">
          <div className="total-container">
            <span className="bold">Gesamtsumme (inkl. MwSt.)</span>
            <span>{total}$</span>
          </div>
          <button className="purchase-button" onClick={makePurchase}>
            Purchase
          </button>
          <Link
            className="continue_shopping"
            to={`/success-message`}
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
              marginLeft: "42%",
            }}
          ></Link>
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
