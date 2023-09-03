package order.repositories;

import order.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();

    /*@Query("SELECT od FROM Product od WHERE od.order= :orderId")
    List<Product> findOrder(Long orderId);*/
    List<Product> findByOrderId(Long orderId);

    Product findQuantityByOrderId(Long productId);
}
