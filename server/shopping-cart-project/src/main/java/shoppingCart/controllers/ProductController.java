package shoppingCart.controllers;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shoppingCart.entities.Product;
import shoppingCart.services.ProductService;

import java.util.List;

@Slf4j
@Transactional
@RestController
@CrossOrigin(origins = "http://localhost:3006", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping //postman working
    public ResponseEntity<List<Product>> getCart() {
        List<Product> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/{id}")
    void deleteById(@PathVariable Long id) {
        productService.deleteItemFromCart(id);
    }


    @PutMapping("/product/{id}")
    public ResponseEntity<Product> replaceProduct(@RequestBody Product newProduct, @PathVariable Long id) {
        Product product = productService.updateQuantityItemFromCart(newProduct, id).getBody();
        return ResponseEntity.ok(product);
    }
}
