/*Before the new API version 

App.js_fetching data- replaced by GET
useEffect(() => {
    //executed when the component is rendered!we are fetching the data as if it was in a server and storing the 
    //resulting data in our shoppingCart variable the shoppingCart will be [] on the first render and only on the 
    //next render will it update to the result when we call setState functions they only apply on the next render
    fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => setShoppingCart(data));
  }, []);

// in a real app this function would make a request to an API- replaced by PATCH
const setItemQuantity = (item, quantity) => {
  const updatedItem = {
    ...item, // all the properties of item
    quantity: quantity, // plus replaces quantity
  };

  const updatedList = shoppingCart.map((elementInPreviouslist) => {
    // map will return a new array
    // if element is the one to update
    if (elementInPreviouslist === item) {
      return updatedItem; // replace it in the list with updated
    }

    return elementInPreviouslist; // keep element the same way
  });

  setShoppingCart(updatedList); //we set the shopping cart to be this new list
};
JSX would be updateItemQuantity={setItemQuantity}


//removing items -replaced by DELETE
  const removeItem = (item) => {
    const listWithoutItem = shoppingCart.filter((i) => i !== item);
    setShoppingCart(listWithoutItem); //we need to set the new shoppingCart
  };


  WHEN FE WAS GETTING ITEMS, FILTERING, DELETING...

/**
 * Adds an item to the shopping cart.
 * If the item already exists, increments the quantity of the item by 1.
 * else adds to shopping cart.
 * @param item
 */
/*const addItemToShoppingCart = (item) => {
    const cartItem = shoppingCart.find((i) => i.id === item.id);

    if (cartItem) {
      cartItem.quantity = cartItem.quantity + 1;
      const updatedCart = shoppingCart.map((i) =>
        i.id === cartItem.id ? cartItem : i
      );
      setShoppingCart(updatedCart);
    } else {
      const newShoppingCartItem = { ...item, quantity: 1 };
      setShoppingCart([...shoppingCart, newShoppingCartItem]);
    }
  };*/

/*const updateItemQuantity = (item, event) => {
    //select a quantity and save it in the shopping cart

    item.quantity = parseInt(item.quantity + event.target.value);
    console.log(item);
    //setShoppingCart(cart);
  };*/

/*  const filterByIdentity = (identity) => {
    const newItems = items.filter((element) => element.identity === identity);
    setitems(newItems);
  };*/
// set up cart so it has all the elements zou want, set Shopping Cart as the fullz readz cart, setState only updates when the next render is executed
// if itemAdded starts at false, whats the value of added, setItemAdded(true); const added = itemAdded; //its false until the next render, so onlz after we leave the current function does the value get updated

/*const removeItem = (item) => {
    const deleteItem = shoppingCart.filter((i) => i !== item);
    setShoppingCart(deleteItem);
  };*/

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
