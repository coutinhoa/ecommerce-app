export const createCart = async (userId, items) => {
      const response = await fetch(`http://localhost:8081/api/v1/shopping-cart/create/${userId}`, {
       method: "POST",
       headers: {
          "Content-type": "application/json",
                  },
       body: JSON.stringify({
          userId: userId,
          products: [],
          }),
       });

       return await response.json();
}