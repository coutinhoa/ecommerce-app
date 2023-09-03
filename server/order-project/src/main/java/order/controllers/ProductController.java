package order.controllers;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import order.dto.ProductDTO;
import order.entities.Product;
import order.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Transactional
@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class ProductController {
    private final ProductService productService;

    @Autowired
    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Product>> getOrderDetailsById(@PathVariable Long id) {
        List<Product> orderDetail = productService.getDetails(id);
        return ResponseEntity.ok(orderDetail);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<ProductDTO>> getProductsByOrderId(@PathVariable Long orderId) {
        List<ProductDTO> products = productService.getProductsByOrderId(orderId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    /*@DeleteMapping("/{id}")
    void deleteProduct(@PathVariable Long id) {
        try{
            productService.deleteProductById(id);
        }
        catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }*/
}
