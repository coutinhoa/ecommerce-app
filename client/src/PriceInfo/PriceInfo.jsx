import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PriceInfo.css";
import { priceArticles } from "./utils/priceArticles";

export const PriceInfo = ({ items }) => {
  //const price = priceArticles(items);
  const price = priceArticles(items);

  const delivery = items.products.length === 0 ? 0 : 3;

  const total = delivery + price;

  const makePurchase = () => {
    const userId = 5;
    fetch(`http://localhost:8081/api/v1/shopping-cart/purchase/${userId}`, {
      method: "POST",
    }).then(() => {
      toast.success("Order purchased", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
    console.log("posted");
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
          <button className="button" onClick={makePurchase}>
            Purchase
          </button>
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
