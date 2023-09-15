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
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }


    @GetMapping //postman working
    public ResponseEntity<List<ShoppingCart>> getCart() {
        List<ShoppingCart> shoppingCart = shoppingCartService.getAll();
        return ResponseEntity.ok(shoppingCart);
    }

    @PostMapping("/{userId}") //postman working
    public ShoppingCartDTO createShoppingCart(@PathVariable Long userId, @RequestBody ShoppingCartDTO shoppingCart) {
        return shoppingCartService.createShoppingCart(userId, shoppingCart);
    }

    @DeleteMapping("/{id}")
        //postman working
    void deleteById(@PathVariable Long id) {
        shoppingCartService.deleteItem(id);
    }

    @GetMapping("/{userId}") //postman working
    public ResponseEntity<ShoppingCart> getCartByUser(@PathVariable Long userId) {
        ShoppingCart shoppingCart = shoppingCartService.getShoppingByUserId(userId);
        return ResponseEntity.ok(shoppingCart);
    }

   /* @GetMapping("/purchase")
    public ResponseEntity<List<ShoppingCart>> makePurchase() {
        List<ShoppingCart> createdCart = shoppingCartService.purchaseOrder();
        return ResponseEntity.ok(createdCart);
    }*/

}
