package user.services;

import org.springframework.stereotype.Service;
import user.entities.User;
import user.repositories.UserRepository;

import java.util.List;


@Service
public class UserService {
    private final UserRepository repository;
    UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAll(String user_name) {
        return repository.findAll();
    }

    public void deleteUser(Long id){
        repository.deleteById(id);
    }
}
