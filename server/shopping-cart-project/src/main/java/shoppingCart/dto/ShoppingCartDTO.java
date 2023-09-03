package shoppingCart.dto;
import jakarta.persistence.Column;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class ShoppingCartDTO implements Serializable {

    private Long id;

    private Long userId;

    private double totalPrice;

    private LocalDateTime createdTimestamp;
    private List<ProductDTO> products;
}
