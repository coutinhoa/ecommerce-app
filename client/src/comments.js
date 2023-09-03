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




*/
