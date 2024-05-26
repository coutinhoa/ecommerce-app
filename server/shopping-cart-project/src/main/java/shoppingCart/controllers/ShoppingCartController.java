package shoppingCart.controllers;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
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
@CrossOrigin(origins = "http://localhost:3006", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }


    @GetMapping
    public ResponseEntity<List<ShoppingCart>> getCart() {
        List<ShoppingCart> shoppingCart = shoppingCartService.getAll();
        return ResponseEntity.ok(shoppingCart);
    }

    @PostMapping("/add-items/{userId}")
    public ShoppingCartDTO addItemsToShoppingCart(@PathVariable Long userId, @RequestBody ShoppingCartDTO shoppingCart) {
        return shoppingCartService.addItemsToShoppingCart(userId, shoppingCart);
    }

    @PostMapping("/create/{userId}")
    public ShoppingCartDTO createShoppingCart(@PathVariable Long userId, @RequestBody ShoppingCartDTO shoppingCart) {
        return shoppingCartService.createShoppingCart(userId, shoppingCart);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ShoppingCart> getCartByUser(@PathVariable Long userId) {
        ShoppingCart shoppingCart = shoppingCartService.getShoppingByUserId(userId);
        return ResponseEntity.ok(shoppingCart);
    }

    @PostMapping("/purchase/{userId}")
    public ResponseEntity<ShoppingCart> makePurchase(@PathVariable Long userId) {
        ShoppingCart createdCart = shoppingCartService.purchaseOrder(userId);
        return ResponseEntity.ok(createdCart);
    }

}
