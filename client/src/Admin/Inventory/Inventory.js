import "./Inventory.css";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";

//https://blog.logrocket.com/using-react-toastify-style-toast-messages/

function App() {
  const [products, setProducts] = useState([]);
  //const [searchParams, setSearchParams] = useSearchParams();

  //useParams is no bueno cause we use useParams when we want something like this: localhost:3000/1
  //in this example useParams is useful when we want the page of a single user

  const getInventory = () => {
    fetch(`http://localhost:8084/api/v1/warehouse`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setProducts(response));
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div className="App">
      <h2 className="title">Inventory</h2>
      <table className="contacts">
        <thead>
          <tr>
            <th className="columns">Product Id</th>
            <th className="columns">Name</th>
            <th className="columns">Type</th>
            <th className="columns">Price per Unit $</th>
            <th className="columns">Colour</th>
            <th className="columns">Premium Delivery</th>
            <th className="columns">Identity</th>
            <th className="columns">Available Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="columns">{product.id}</td>
              <td className="columns">{product.name}</td>
              <td className="columns">{product.type}</td>
              <td className="columns">{product.price}$</td>
              <td className="columns">{product.colour}</td>
              <td className="columns">{product.premiumDelivery}</td>
              <td className="columns">{product.identity}</td>
              <td className="columns">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-bottom">
        <Link
          className="continue_shopping"
          to={`/admin-view`}
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
        >
          Go to Admin View
        </Link>
      </div>
    </div>
  );
}

export default App;
