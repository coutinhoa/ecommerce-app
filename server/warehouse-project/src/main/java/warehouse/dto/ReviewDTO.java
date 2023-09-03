package warehouse.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class ReviewDTO implements Serializable {

    private Long id;

    private int rating;
    private String description;
    private String date;
    private Long garment_id;
}