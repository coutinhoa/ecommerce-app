package user.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Setter
@Getter
@RequiredArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class UserDTO implements Serializable {

    private Long id;

    @NonNull
    private String name;

    @NonNull
    private String password;

    @NonNull
    private String phone;

    @NonNull
    private String email;

}
