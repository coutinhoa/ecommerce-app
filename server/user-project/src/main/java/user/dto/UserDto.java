package user.dto;

import lombok.EqualsAndHashCode;
import lombok.ToString;


@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class UserDto extends UserCreateDto{

    private Long id;

}
