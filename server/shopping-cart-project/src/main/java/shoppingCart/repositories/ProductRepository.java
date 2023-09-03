package shoppingCart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import shoppingCart.entities.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
