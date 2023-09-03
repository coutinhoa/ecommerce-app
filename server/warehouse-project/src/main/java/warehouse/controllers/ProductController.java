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

    @GetMapping("/{id}")
    WarehouseProduct getProduct(@PathVariable Long id) {
        System.out.println("get id");

        return service.getOrder(id);
    }

    /*@GetMapping
    public ResponseEntity<Page<WarehouseProduct>> getProducts(
            @RequestParam(name = "name", required = false, defaultValue = "") String name,
            @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        Page<WarehouseProduct> products = productService.getAll(name, page, pageSize);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/availability")
    public ResponseEntity<List<WarehouseProduct>> getAvailableProductsInWarehouse() {
        List<WarehouseProduct> products = productService.getAvailableProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/page")
    List<WarehouseProduct> allPage(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {

        Page<WarehouseProduct> garments = productService.getAllProductsPage(page, pageSize);
        return garments.getContent();
    }


    @PostMapping("/garments")
    WarehouseProduct newGarment(@RequestBody WarehouseProduct newGarment) {
        try {
            return productService.createProduct(newGarment);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PutMapping("/garments/{id}")
    WarehouseProduct replaceGarment(@RequestBody WarehouseProductDTO newGarment, @PathVariable Long id) {
        return productService.updateProduct(id, newGarment);
    }

    @DeleteMapping("/garments/{id}")
    void deleteGarment(@PathVariable Long id) {
        productService.deleteProduct(id);
    }*/


}
