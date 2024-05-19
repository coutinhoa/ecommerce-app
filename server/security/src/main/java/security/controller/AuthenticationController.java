package security.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import security.model.AuthenticationResponse;
import security.model.User;
import security.service.AuthenticationService;
import security.service.UserService;


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

    //ResponseEntity<AuthenticationResponse>
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User request, HttpServletResponse response) {
        var authenticationResult = authService.authenticate(request);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findUserByUsername(username);
        //return ResponseEntity.ok(authenticationResult);
        return ResponseEntity.ok(user);
    }
}
