package user.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import user.dto.UserDTO;
import user.entities.User;
import user.services.UserService;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final KafkaTemplate<String, Long> kafkaTemplate;

    UserController(KafkaTemplate<String, Long> kafkaTemplate, UserService userService) {
        this.kafkaTemplate = kafkaTemplate;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers(@RequestParam(name = "name", required = false, defaultValue = "") String user_name) {
        List<User> Users = userService.getAll(user_name);
        return ResponseEntity.ok(Users);
    }

    @DeleteMapping("/{id}")
    void deleteUserById(@PathVariable Long id) {
        kafkaTemplate.send("user-deleted", id);
        log.info("Message sent");
        userService.deleteUser(id);
    }

    @PostMapping
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserDTO userCredentials) {
        UserDTO userlogin = userService.login(userCredentials);
        return new ResponseEntity<>(userlogin, HttpStatus.OK);
    }

}
