package order.dto;

import lombok.*;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class OrderDTO implements Serializable {

    private Long id;

    private Long userId;

    private double totalPrice;

    private OffsetDateTime createdTimestamp;
    private List<ProductDTO> products;
}
