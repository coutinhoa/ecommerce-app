import React from "react";
import "./HomePage.css";
import { Body } from "../HomePage/Body/Body";
import { Header } from "./Header/Header";
import { Link } from "react-router-dom";
import zalando from "../images/Zalando.png";

const HomePage = ({
  shoppingCart,
  filterByCategory,
  handleSearchSubmit,
  cartQuantity,
  filteredItems,
  items,
}) => {
  return (
    <div className="home-page" id="home">
      <Header
        shoppingCart={shoppingCart}
        filterByCategory={filterByCategory}
        handleSearchSubmit={handleSearchSubmit}
        articlesQuantity={cartQuantity}
      />
      <Body
        filteredItems={filteredItems}
        shoppingCart={shoppingCart}
        filterByCategory={filterByCategory}
        articlesQuantity={cartQuantity}
        items={items}
      />
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

/*const movePreviousPage = () => {
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
  };*/

//clothes.json is running on Resources  http://localhost:3000/reviews and http://localhost:3000/garments
//fetch("http://localhost:3000/garments")
//fastAPI it's running on http://127.0.0.1:8000/api/garments
//alchemy is the orm that maps database stuff
//python: fetch("http://localhost:8000/api/garments")
//"http://localhost:5555/api/garments?page=${pageNumber}&pagesize=${pageSize}"
// pagination .then(setSearchParams({ page: pageNumber, pagesize: pageSize }));

/*<div className="previous-next-page">
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
</div>*/
