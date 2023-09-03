package warehouse.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class GarmentSizeDTO implements Serializable {


    private Long id;
    private int quantity;
    private Long garment_id;
    private Long size_id;//TODO:change for size name
}