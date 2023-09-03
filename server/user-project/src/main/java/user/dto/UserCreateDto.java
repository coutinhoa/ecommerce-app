package user.dto;

import lombok.*;

import java.io.Serializable;

@Data
@EqualsAndHashCode
@Setter
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
public class UserCreateDto implements Serializable {

    @NonNull
    private String name;

}
