package warehouse.dto;

import lombok.*;

import java.io.Serializable;


@Data
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class SizeDTO implements Serializable {

    private Long id;
    private String sizes;
    //TODO: change to name;
}


