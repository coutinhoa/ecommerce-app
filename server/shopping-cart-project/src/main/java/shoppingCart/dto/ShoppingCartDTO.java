package shoppingCart.dto;

import lombok.*;
import shoppingCart.entities.Product;
import shoppingCart.entities.ShoppingCart;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class ShoppingCartDTO implements Serializable {

    private Long id;

    private Long userId;

    //    private double totalPrice;
    private List<ProductDTO> products;

    public ShoppingCart buildShoppingCart() {
        //ModelMapper modelMapper = new ModelMapper();
        //modelMapper.map(this, ShoppingCart.class);

        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setId(this.getId());
        shoppingCart.setUserId(this.getUserId());

        List<Product> products = new ArrayList();

        for (ProductDTO product : this.getProducts()) {
            Product newProduct = product.buildProduct();
            newProduct.setShopping_cart(shoppingCart);
            products.add(newProduct);
        }

        return shoppingCart;
    }
}
