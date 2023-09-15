import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Body } from "../HomePage/Body/Body";
import { Header } from "./Header/Header";
import { Link } from "react-router-dom";
import zalando from "../images/Zalando.png";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 9; //constants can be outside the component

const HomePage = ({
  shoppingCart,
  filterByIdentity,
  handleSearchSubmit,
  cartQuantity,
}) => {
  const [items, setItems] = useState([]); //this is the original collection
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState([]); //the filteredItems is the collection the undelying componenst are gonna see

  //Insomnia example: http://127.0.0.1:8000/api/garments/1/reviews

  //clothes.json is running on Resources  http://localhost:3000/reviews and http://localhost:3000/garments
  //fetch("http://localhost:3000/garments")
  //fastAPI it's running on http://127.0.0.1:8000/api/garments
  //alchemy is the orm that maps database stuff
  const fetchClothes = (pageNumber = 0, pageSize = PAGE_SIZE) => {
    //python: fetch("http://localhost:8000/api/garments")
    fetch(
      `http://localhost:8084/api/v1/warehouse?page=${pageNumber}&pagesize=${pageSize}`
      //"http://localhost:5555/api/garments?page=${pageNumber}&pagesize=${pageSize}"
    )
      .then((response) => response.json())
      .then((response) => {
        setItems(response);
        setFilteredItems(response); //the filtered items are also the initial items
      })
      .then(setSearchParams({ page: pageNumber, pagesize: pageSize }));
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  const movePreviousPage = () => {
    console.log("you clicked previous");
    const previousPage = currentPage - 1;
    fetchClothes(previousPage);
    setCurrentPage(previousPage);
  };

  const moveNextPage = () => {
    console.log("you clicked next");
    const nextPage = currentPage + 1;
    fetchClothes(nextPage);
    setCurrentPage(nextPage);
  };

  return (
    <div className="home-page" id="home">
      <Header
        shoppingCart={shoppingCart}
        filterByIdentity={filterByIdentity}
        handleSearchSubmit={handleSearchSubmit}
        articlesQuantity={cartQuantity}
      />
      <Body
        filteredItems={filteredItems}
        shoppingCart={shoppingCart}
        filterByIdentity={filterByIdentity}
        articlesQuantity={cartQuantity}
      />
      <div className="previous-next-page">
        <div className="move-previous-page">
          {currentPage > 0 && (
            <button className="moving-previous-page" onClick={movePreviousPage}>
              <i className="bi bi-chevron-double-left">Previous Page</i>
            </button>
          )}
        </div>
        <div className="move-next-page">
          {filteredItems.length === PAGE_SIZE && (
            <button className="moving-next-page" onClick={moveNextPage}>
              Next Page<i className="bi bi-chevron-double-right"></i>
            </button>
          )}
        </div>
      </div>
      <footer className="footer-container">
        <ul className="footer">
          <li>Datenschutz</li>
          <li>Nutzungsbedingungen</li>
          <li>Impressum</li>
        </ul>
        <div className="logo-container">
          <Link to={`/`}>
            <img src={zalando} className="logo-triangle" alt="zal-logo" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
