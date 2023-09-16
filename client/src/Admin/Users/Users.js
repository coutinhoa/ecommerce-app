import "./Users.css";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import HomePage from "./../../HomePage/HomePage";

//https://blog.logrocket.com/using-react-toastify-style-toast-messages/

function App() {
  const [contacts, setContacts] = useState([]);
  //const [searchParams, setSearchParams] = useSearchParams();

  //useParams is no bueno cause we use useParams when we want something like this: localhost:3000/1
  //in this example useParams is useful when we want the page of a single user

  const fetchContacts = () => {
    fetch(`http://localhost:8082/api/v1/users`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setContacts(response));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /*const fetchContacts = useCallback((pageNumber = 0, pageSize = 10) => {
    //page=${pageNumber}&pagesize the backend receives the page and pagesize
    fetch(
      `http://localhost:8082/api/v1/users?page=${pageNumber}&pagesize=${pageSize}`
    )
      .then((response) => response.json())
      .then((response) => {
        setContacts(response);
      })
      .then(setSearchParams({ page: pageNumber, pagesize: pageSize }));
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);*/

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/api/v1/users/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        toast.warning("You deleted a contact!", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
      fetchContacts();
    } catch (error) {
      toast.error("Server disconnected");
    }
  };

  //when we use a form we should use an event
  //if we don't use a form it is a value

  return (
    <div className="App">
      <h2 className="title">Admin View</h2>
      <h3 className="title">Current Users</h3>
      <table className="contacts">
        <thead>
          <tr>
            <th className="columns">Id</th>
            <th className="columns">Name</th>
            <th className="columns">Password</th>
            <th className="columns">Phone Number</th>
            <th className="columns">Email</th>
            <th className="columns">Delete Contact</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((person) => (
            <tr key={person.id}>
              <td className="columns">{person.id}</td>
              <td className="columns">{person.name}</td>
              <td className="columns">{person.password}</td>
              <td className="columns">{person.phone}</td>
              <td className="columns">{person.email}</td>
              <td>
                <span
                  className="remove-cursor"
                  onClick={() => deleteContact(person.id)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-bottom">
        <Link
          className="continue_shopping"
          to={`/inventory`}
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
            marginLeft: "30%",
            marginRight: "10%",
          }}
        >
          Inventory
        </Link>
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
            marginLeft: "10%",
            marginRight: "25%",
          }}
        >
          Go to HomePage
        </Link>
      </div>
    </div>
  );
}

export default App;
