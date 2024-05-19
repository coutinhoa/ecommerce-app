import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import zalandoLogo from "../../images/Zalando_logo.svg";

export const Header = ({
  filterByCategory,
  handleSearchSubmit,
  articlesQuantity,
}) => {
  //const articlesQuantity = amountArticles(shoppingCart);

  //curly brackets need return if we want the function to return smth

  const [searchTerm, setSearchTerm] = useState("");

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit(searchTerm);
    }
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    console.log(text);
    setSearchTerm(text);

    //here we want to clear when it's empty
    if (text === "") {
      handleSearchSubmit(text);
    }
  };

  return (
    <div>
      <div className="header-two">
        <div>
          <button
            className="category-buttons"
            onClick={() => filterByCategory("Woman")}
          >
            DAMEN
          </button>
          <button
            className="category-buttons"
            onClick={() => filterByCategory("Man")}
          >
            HERREN
          </button>
          <button
            className="category-buttons"
            onClick={() => filterByCategory("Kid")}
          >
            KINDER
          </button>
        </div>
        <Link
          className="back-home"
          to={`/`}
          style={{
            textDecoration: "none",
            color: "black",
            cursor: "pointer",
          }}
        >
          <img src={zalandoLogo} className="logo" alt="logo" />
        </Link>
        <div className="icons-container">
          <Link
            className="icons"
            style={{
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
            }}
            to={`/my-orders`}
          >
            <span>
              My Orders <i className="bi bi-list-stars"></i>
            </span>
          </Link>
          <Link
            className="icons"
            style={{
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
            }}
            to={`/login`}
          >
            <i className="bi bi-person"></i>
          </Link>
          <Link
            to={`/login`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className="icons">
              <i className="bi bi-heart"></i>
            </span>
          </Link>
          <Link
            className="cart-link"
            style={{ textDecoration: "none", color: "black" }}
            to={`/shopping-cart`}
          >
            <div className="al">
              <i className="bi bi-bag"></i>
              <span className="your-warenkorb">
                Warenkorb ({articlesQuantity})
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="search-container">
        <input
          className="input"
          id="keyEnter"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleInputChange}
          onKeyDown={pressEnter}
          maxLength="10"
        />
        <button
          className="search-icon"
          onClick={() => handleSearchSubmit(searchTerm)}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

/* we can only write it like this onClick = { handleSearchSubmit } if the function has no arguments, like this one:
const prints = () => {
  setSearchTerm("a");
}; or if the anonymous funtion argument is the same as the function being called like here: onKeyDown={(e) => pressEnter(e)}
These are the only two options to call a function:onClick= { handleSearchSubmit } or onClick={() => handleSearchSubmit(searchTerm)}*/
