import "./Orders.css";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";

//https://blog.logrocket.com/using-react-toastify-style-toast-messages/

function App() {
  const [orders, setOrders] = useState([]);
  //const [searchParams, setSearchParams] = useSearchParams();

  //useParams is no bueno cause we use useParams when we want something like this: localhost:3000/1
  //in this example useParams is useful when we want the page of a single user

  const fetchOrders = () => {
    const userId = 5;
    fetch(`http://localhost:8083/api/v1/orders/${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setOrders(response));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="App">
      <h2 className="title">My Orders</h2>
      <table className="contacts">
        <thead>
          <tr>
            <th className="columns">User Id</th>
            <th className="columns">Order Id</th>
            <th className="columns">Date</th>
            <th className="columns">Total Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="columns">{order.userId}</td>
              <td className="columns">{order.id}</td>
              <td className="columns">{order.createdTimestamp}</td>
              <td className="columns">{order.totalPrice}$</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-bottom">
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
            marginLeft: "42%",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default App;
