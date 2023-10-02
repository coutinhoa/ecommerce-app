package shoppingCart.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@ToString
@Entity
@Getter
@Setter
@Table(name = "products")
@NoArgsConstructor
public class Product implements Serializable {

    @Id
    private Long id;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "colour", nullable = false)
    private String colour;

    @Column(name = "premium_delivery", nullable = false)
    private boolean premiumDelivery;

    @Column(name = "category", nullable = false)
    @NonNull
    private String category;

    @Column(name = "size", nullable = false)
    @NonNull
    private String size;

    @ManyToOne
    @JoinColumn(name = "shopping_cart_id", nullable = false, referencedColumnName = "id")
    @JsonBackReference
    private ShoppingCart shopping_cart;
}