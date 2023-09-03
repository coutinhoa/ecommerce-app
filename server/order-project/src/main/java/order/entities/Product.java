package order.entities;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "name", nullable = false)
    @NonNull
    private String name;

    @Column(name = "type", nullable = false)
    @NonNull
    private String type;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "colour", nullable = false)
    @NonNull
    private String colour;

    @Column(name = "premium_delivery", nullable = false)
    private boolean premiumDelivery;

    @Column(name = "identity", nullable = false)
    @NonNull
    private String identity;

    @Column(name = "size", nullable = false)
    @NonNull
    private String size;

    @Column(name = "product_id", nullable = false)
    private Long productId;
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}