package order.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
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

    private LocalDateTime createdTimestamp;
    private List<ProductDTO> products;
}
