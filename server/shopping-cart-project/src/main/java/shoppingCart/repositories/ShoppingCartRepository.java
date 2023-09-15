package shoppingCart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import shoppingCart.entities.ShoppingCart;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    ShoppingCart findByUserId(Long userId);
}
