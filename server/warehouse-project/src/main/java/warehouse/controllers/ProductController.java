package warehouse.controllers;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.entities.WarehouseProduct;
import warehouse.services.ProductService;

import java.util.List;

@Transactional
@RestController
@RequestMapping("/warehouse")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ProductController {

    private final ProductService service;

    @Autowired
    ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<WarehouseProduct>> getOrders() {
        List<WarehouseProduct> orders = service.getAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/product/{id}")
    WarehouseProduct getProduct(@PathVariable Long id) {
        return service.getProduct(id);
    }

    @GetMapping("/{identity}")
    List<WarehouseProduct> getProductsByCategory(@PathVariable String identity) {
        return service.getProducts(identity);
    }


}
