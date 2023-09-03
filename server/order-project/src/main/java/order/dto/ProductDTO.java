package order.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Setter
@Getter
@ToString
@AllArgsConstructor
@EqualsAndHashCode
public class ProductDTO implements Serializable {
    private Long id;
    private int quantity;
    private String name;
    private String type;
    private String colour;
    private boolean premiumDelivery;
    private String identity;
    private String size;
    private Long productId;
    private Long orderId;

}
