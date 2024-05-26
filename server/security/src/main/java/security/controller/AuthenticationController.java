package security.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import security.model.AuthenticationResponse;
import security.model.User;
import security.service.AuthenticationService;
import security.service.UserService;

import java.util.Arrays;


@RestController
@CrossOrigin(origins = "http://localhost:3006", methods = {RequestMethod.GET, RequestMethod.POST})

public class AuthenticationController {

    private final AuthenticationService authService;

    private final UserService userService;

    public AuthenticationController(AuthenticationService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User request) {

        AuthenticationResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User request, HttpServletResponse response) {
        try {
            authService.authenticate(request);
            User user = userService.findUserByUsername(request.getUsername());
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
