package shoppingCart.services;

import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import shoppingCart.entities.Product;
import shoppingCart.repositories.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public void deleteItemFromCart(Long id) {
        productRepository.deleteById(id);
    }

    public ResponseEntity<Product> updateQuantityItemFromCart(@RequestBody Product newProduct, @PathVariable Long id) {
        Product updateProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id: " + id + " does not exist."));

        updateProduct.setQuantity(newProduct.getQuantity());

        productRepository.save(updateProduct);
        return ResponseEntity.ok(updateProduct);
    }
}
