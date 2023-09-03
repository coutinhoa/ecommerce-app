package user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import user.entities.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAll();
}
