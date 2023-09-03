package warehouse.dto;

import lombok.*;

import java.io.Serializable;


@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class WarehouseProductDTO implements Serializable {

    private Long id;
    private String name;
    private String type;

    private double price;
    private String colour;

    private boolean premiumDelivery;
    private String identity;

    private int availableQuantity;

}