package order.repositories;

import order.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    /*@Query("SELECT o FROM Order o ORDER BY o.createdTimestamp DESC")*/
    /*List<Order> findAllOrderByCreatedTimestampDesc();*/

    void deleteOrderByUserId(Long userId);
}
