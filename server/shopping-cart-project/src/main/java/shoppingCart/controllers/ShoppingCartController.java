package shoppingCart.controllers;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shoppingCart.dto.ShoppingCartDTO;
import shoppingCart.entities.ShoppingCart;
import shoppingCart.services.ShoppingCartService;

import java.util.List;

@Slf4j
@Transactional
@RestController
@RequestMapping("/shopping-cart")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }


    @GetMapping
    public ResponseEntity<List<ShoppingCart>> getCart(@RequestParam(name = "name", required = false, defaultValue = "") String name) {
        List<ShoppingCart> shoppingCart = shoppingCartService.getAll(name);
        return ResponseEntity.ok(shoppingCart);
    }

    @PostMapping("/purchase")
    public ResponseEntity<ShoppingCart> makePurchase(@RequestBody ShoppingCartDTO shoppingCart) {
        ShoppingCart createdCart = shoppingCartService.createCartWithProducts(shoppingCart);
        return new ResponseEntity<>(createdCart, HttpStatus.CREATED);
    }

}
