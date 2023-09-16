import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Rating.css";
import zalando from "../../images/Zalando.png";
import { getAverageRating } from "./utils/getAverageRating";

export const Rating = ({
  item,
  fetchItem,
  addItemToShoppingCart,
  shoppingCart,
}) => {
  const [reviewDescription, setReviewDescription] = useState(""); //reviewDescription is a read only variable
  const [reviewRating, setReviewRating] = useState(); //it contains the most current value the user selected
  const [changeImage, setChangeImage] = useState("");
  const params = useParams();

  useEffect(() => {
    //called when the component renders the 1st time and whenever item changes
    if (item) {
      setChangeImage(item.pictures[0].url);
    }
  }, [item]);

  if (item === undefined) {
    //or(!item) this one  also verifies for null
    return <div>Loading...</div>;
  }

  function occurencesArray(item) {
    const count = {};
    for (let i = 0; i < item.reviews.length; i++) {
      const element = item.reviews[i].rating;

      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }
    return count;
  }
  //console.log(occurencesArray(item));
  //console.log(item.sizes);

  function value(element) {
    let result = 0;
    for (let i = 0; i < item.reviews.length; i++) {
      result = occurencesArray(item)[element];
      if (!result) {
        result = 0;
      }
    }
    return result;
  }
  //console.log(value(item, 5));

  function ratingWidth(rating) {
    const selectedRatings = item.reviews.filter(
      (review) => review.rating === rating
    );

    return (selectedRatings.length / item.reviews.length) * 100;
  }

  const renderStars = () => {
    //checks if current star should be filled or not
    const average = Math.floor(getAverageRating(item.reviews));

    //this return creates and array with 5 items and it's gonna go to each element and return a new element with a star
    //string templates are used when we need to put conditions on strings
    return (
      <>
        {[1, 2, 3, 4, 5].map((i) => (
          <span className="star-padding" key={i}>
            <i className={`bi bi-star${i <= average ? "-fill" : ""}`}></i>
          </span>
        ))}
      </>
    );
  };

  const onChangeDescription = (event) => {
    const description = event.target.value;
    setReviewDescription(description);
    //this functions saves the value of the new variable
  };

  //button prints the value on the console, but is the input that modifies the variable
  //this fucntion prints the new description
  //when we submit the form we need to call the submitReview function and we are using a form so that we only submit when all the requirements(rating and description) are filled
  /*const submitReview = (event) => {
    event.preventDefault();

    //python: fetch(`http://localhost:8000/api/garments/${params.id}/reviews`
    fetch(`http://localhost:8084/api/v1/garments/${params.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        rating: reviewRating,
        description: reviewDescription,
        date: new Date().toLocaleDateString(),
        garment_id: item.id,
      }),
    }).then(() => {
      //we are setting the rating and review to their initial state so that we
      //can clear the input after submitting a form
      setReviewRating();
      setReviewDescription(""); // this is setting the reviewDescription as an emtpy string,
      // the inout needs the attribute value to be reviewDescription
      //cause without the attribute value(on the input) the input can't clear it
      //now with the value the input is controlled
      fetchItem();
    });
  };*/

  const submitReview = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8084/api/v1/garments/${params.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        rating: reviewRating,
        description: reviewDescription,
        date: new Date().toLocaleDateString(),
        garment_id: item.id,
      }),
    }).then(() => {
      setReviewRating();
      setReviewDescription("");
      fetchItem();
    });
  };

  //used if we click on the stars
  const giveRating = (number) => {
    setReviewRating(number);
  };

  const handleMouseOver = (event) => {
    event.preventDefault();
    const pictureChange = event.currentTarget.src;
    setChangeImage(pictureChange);
  };

  const isItemInTheCart = (item) => {
    return shoppingCart.products.includes(item);
  };

  return (
    <div>
      <div className="item-ratings-body">
        <div className="images-container">
          <div>
            <div>
              <img
                src={item.pictures[0].url}
                className="small-photo"
                alt="first"
                onMouseOver={handleMouseOver}
              />
            </div>
            <div>
              <img
                src={item.pictures[1].url}
                className="small-photo"
                alt="second"
                onMouseOver={handleMouseOver}
              />
            </div>
            <div>
              <img
                src={item.pictures[2].url}
                className="small-photo"
                alt="third"
                onMouseOver={handleMouseOver}
              />
            </div>
          </div>
          <div className="image-container">
            <img src={changeImage} className="item-photo" alt="item" />
          </div>
        </div>
        <div className="body-container">
          <div className="item-infos-container">
            <div className="detailed-infos">
              {item.name} {item.type}
            </div>
            <div className="color">
              Farbe: <span className="color-bold">{item.colour}</span>
            </div>
            <div className="price-container">{item.price.toFixed(2)}$</div>
            <div className="plus">
              {item.premiumDelivery ? (
                <>
                  <span className="plus-logo">PLUS</span>
                  <span>Premium-Lieferung</span>
                </>
              ) : null}
            </div>
            <div className="stars-average">{renderStars()}</div>
            <div className="size-cart-container">
              {/*<div className="border-select-size">
                <select className="select-size-container" defaultValue={""}>
                  <option value="" disabled hidden>
                    Bitte Größe wählen
                  </option>
                  {item.sizes.map((i) => {
                    return <option key={i.id}>{i.size}</option>;
                  })}
                </select>
              </div>*/}
              <div className="add-to-cart-container">
                <div
                  className={`add-to-cart-button ${
                    isItemInTheCart(item) ? "green-background" : ""
                  }`}
                  onClick={() => addItemToShoppingCart(item)}
                >
                  In den Warenkorb
                </div>
                <div className="wishlist-symbol">
                  <i className="bi bi-heart"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="rating-container">
            <div className="rating-resume">
              <span className="heading">
                Kundenbewertungen ({item.reviews.length}){" "}
              </span>
              <div className="rating-and-stars">
                <div className="average-review">
                  {getAverageRating(item.reviews)} out of 5 Stars
                </div>
                <div className="stars-average">{renderStars()}</div>
              </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="rating-distribution">
              <div className="row">
                <div>
                  <div className="stars">
                    <div>5 Stars</div>
                  </div>
                  <div className="bar">
                    <div className="bar-container">
                      <div
                        className="bar-5"
                        style={{
                          width: `${ratingWidth(5)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="reviewers">
                    <div>{value(5)}</div>
                  </div>
                </div>
                <div>
                  <div className="stars">
                    <div>4 Stars</div>
                  </div>
                  <div className="bar">
                    <div className="bar-container">
                      <div
                        className="bar-4"
                        style={{ width: `${ratingWidth(4)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="reviewers">
                    <div>{value(4)}</div>
                  </div>
                </div>
                <div>
                  <div className="stars">
                    <div>3 Stars</div>
                  </div>
                  <div className="bar">
                    <div className="bar-container">
                      <div
                        className="bar-3"
                        style={{ width: `${ratingWidth(3)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="reviewers">
                    <div>{value(3)}</div>
                  </div>
                </div>
                <div>
                  <div className="stars">
                    <div>2 Stars</div>
                  </div>
                  <div className="bar">
                    <div className="bar-container">
                      <div
                        className="bar-2"
                        style={{ width: `${ratingWidth(2)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="reviewers">
                    <div>{value(2)}</div>
                  </div>
                </div>
                <div>
                  <div className="stars">
                    <div>1 Star</div>
                  </div>
                  <div className="bar">
                    <div className="bar-container">
                      <div
                        className="bar-1"
                        style={{ width: `${ratingWidth(1)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="reviewers">
                    <div>{value(1)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="your-rating-container">
              <a href="#opinion-form" className="your-rating">
                Give us your opinion
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="ratings-details-line"></div>
      <div className="ratings-details-line"></div>
      <div className="rating-details-container">
        <div className="infos-title">
          {" "}
          {item.reviews.length} Kundenbewertungen
        </div>
        <div>
          {item.reviews.map((review) => {
            return (
              <div key={review.id} className="review-container">
                <div className="user-date-container" review={review}>
                  <div>
                    <span className="letters-format">User: </span>
                    {review.id}
                  </div>
                  <div>
                    <span className="letters-format">Review Date: </span>
                    {review.date}
                  </div>
                </div>
                <div>
                  <span className="letters-format">Rating: </span>
                  {review.rating} out of 5 stars
                </div>
                <div>
                  <span className="letters-format">Description: </span>
                  {review.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ratings-details-line"></div>
      <div className="ratings-details-line"></div>
      <div className="opinion-container" id="opinion-form">
        <div>
          <div className="infos-title">Give us your opinion</div>
          <div>
            <div className="user-opinion">
              <form onSubmit={submitReview}>
                <div>
                  <span className="letters-format">Rating: </span>
                  <span className="star-fill">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={1}
                        className="radio-input"
                        onChange={(event) =>
                          giveRating(parseInt(event.target.value))
                        }
                        required
                      />
                      <i
                        className={`bi ${
                          reviewRating >= 1 ? "bi-star-fill" : "bi-star"
                        }`}
                      />
                    </label>
                  </span>
                  <span className="star-fill">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={2}
                        className="radio-input"
                        onChange={(event) =>
                          giveRating(parseInt(event.target.value))
                        }
                        required
                      />
                      <i
                        className={`bi ${
                          reviewRating >= 2 ? "bi-star-fill" : "bi-star"
                        }`}
                      />
                    </label>
                  </span>
                  <span className="star-fill">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={3}
                        className="radio-input"
                        onChange={(event) =>
                          giveRating(parseInt(event.target.value))
                        }
                        required
                      />
                      <i
                        className={`bi ${
                          reviewRating >= 3 ? "bi-star-fill" : "bi-star"
                        }`}
                      />
                    </label>
                  </span>
                  <span className="star-fill">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={4}
                        className="radio-input"
                        onChange={(event) =>
                          giveRating(parseInt(event.target.value))
                        }
                        required
                      />
                      <i
                        className={`bi ${
                          reviewRating >= 4 ? "bi-star-fill" : "bi-star"
                        }`}
                      />
                    </label>
                  </span>
                  <span className="star-fill">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={5}
                        className="radio-input"
                        onChange={(event) =>
                          giveRating(parseInt(event.target.value))
                        }
                        required
                      />
                      <i
                        className={`bi ${
                          reviewRating === 5 ? "bi-star-fill" : "bi-star"
                        }`}
                      />
                    </label>
                  </span>
                </div>
                <div className="input-format">
                  <div>
                    Your Opinion:
                    <input
                      className="input-opinion"
                      type="text"
                      maxLength={30}
                      minLength={7}
                      onChange={onChangeDescription}
                      value={reviewDescription}
                      required
                    ></input>
                  </div>
                </div>
                <button className="opinion-button" type="submit">
                  Submit my opinion
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
      <footer>
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

//onClick={giveRating(1)} se for chamado assim corre imediatament qd a page faz load em vez de ser so qd se clica
//required only works with <form>

//used if we click on the stars, but we gonna click on the input that requires an onChange
/*<i
  className={`bi ${
                        reviewRating >= 1 ? "bi-star-fill" : "bi-star"
                      }`}
                      onClick={() => giveRating(1)}
                    />*/

//on input when using the onChange we also gotta pass the value as a prop VIP to make the input controlled

export default Rating;
