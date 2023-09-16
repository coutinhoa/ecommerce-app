package user.services;

import org.springframework.stereotype.Service;
import user.dto.UserDTO;
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

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public UserDTO login(UserDTO credentials) {
        /*try {
            User existingUser = repository.findByNameAndPassword(credentials.getName(), credentials.getPassword());
            return new ResponseStatus(HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }*/
        return credentials;
    }
}
