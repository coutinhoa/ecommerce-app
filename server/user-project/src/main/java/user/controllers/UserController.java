package user.controllers;

import org.springframework.kafka.core.KafkaTemplate;
import user.entities.User;
import user.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
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

}
