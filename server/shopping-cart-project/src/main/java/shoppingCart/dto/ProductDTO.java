package shoppingCart.dto;

import lombok.*;
import shoppingCart.entities.Product;

import java.io.Serializable;

@Data
@Setter
@Getter
@ToString
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class ProductDTO implements Serializable {
    private Long id;
    private int quantity;
    private String name;
    private String type;
    private double price;
    private String colour;
    private boolean premiumDelivery;
    private String identity;
    private String size;

    public Product buildProduct() {
        Product product = new Product();
        product.setId(this.getId());
        product.setQuantity(this.getQuantity());
        product.setName(this.getName());
        product.setType(this.getType());
        product.setPrice(this.getPrice());
        product.setColour(this.getColour());
        product.setPremiumDelivery(true);
        product.setIdentity(this.getIdentity());
        product.setSize(this.getSize());

        return product;
    }
}
