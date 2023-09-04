package shoppingCart.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@Entity
@Table(name = "shopping_cart")
@NoArgsConstructor
public class ShoppingCart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "user_id", nullable = false)
    private Long userId;

//    @Column(name = "total_price")
//    private double totalPrice;

    @OneToMany(mappedBy = "shopping_cart")
    private List<Product> products = new ArrayList<>();
}
