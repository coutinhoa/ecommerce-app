package shoppingCart.dto;

import lombok.*;

import java.io.Serializable;
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
}
