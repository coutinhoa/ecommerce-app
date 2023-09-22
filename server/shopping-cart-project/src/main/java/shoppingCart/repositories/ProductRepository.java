package shoppingCart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import shoppingCart.entities.Product;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByName(String name);

    //void deleteByShoppingCartId(Long cartId);
}
