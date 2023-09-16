package user.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NonNull
    private String name;

    @Column(name = "password", nullable = false)
    @NonNull
    private String password;

    @Column(name = "phone", nullable = false)
    @NonNull
    private String phone;

    @Column(name = "email", nullable = false)
    @NonNull
    private String email;


}