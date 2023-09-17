import { Header } from "../HomePage/Header/Header";
import { Rating } from "../ItemPage/Rating/Rating";

export const ItemPage = ({
  shoppingCart,
  filterByIdentity,
  handleSearchSubmit,
  articlesQuantity,
  addItemToShoppingCart,
}) => {
  return (
    <>
      <Header
        shoppingCart={shoppingCart}
        filterByIdentity={filterByIdentity}
        handleSearchSubmit={handleSearchSubmit}
        articlesQuantity={articlesQuantity}
      />
      <Rating
        addItemToShoppingCart={addItemToShoppingCart}
        shoppingCart={shoppingCart}
      />
    </>
  );
};

export default ItemPage;
