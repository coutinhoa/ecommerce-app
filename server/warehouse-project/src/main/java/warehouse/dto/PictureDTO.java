package warehouse.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class PictureDTO implements Serializable {

    private Long id;
    private String url;
    private Long garment_id;
}
