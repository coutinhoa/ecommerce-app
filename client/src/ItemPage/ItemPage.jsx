import { Header } from "../HomePage/Header/Header";
import { Rating } from "../ItemPage/Rating/Rating";

export const ItemPage = ({
  shoppingCart,
  filterByIdentity,
  handleSearchSubmit,
  cartQuantity,
  size,
  setSize,
  addItemToShoppingCart,
}) => {
  return (
    <>
      <Header
        shoppingCart={shoppingCart}
        filterByIdentity={filterByIdentity}
        handleSearchSubmit={handleSearchSubmit}
        articlesQuantity={cartQuantity}
      />
      <Rating
        shoppingCart={shoppingCart}
        size={size}
        setSize={setSize}
        addItemToShoppingCart={addItemToShoppingCart}
      />
    </>
  );
};

export default ItemPage;
