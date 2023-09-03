package warehouse.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import warehouse.entities.WarehouseProduct;

import java.util.List;


public interface ProductRepository extends JpaRepository<WarehouseProduct, Long> {

    List<WarehouseProduct> findByName(String name);
    //makes a list with the contacts that have this name

    Page<WarehouseProduct> findAll(Pageable pageable);

    @Query("SELECT p FROM WarehouseProduct p WHERE p.availableQuantity>0 ORDER BY p.availableQuantity ASC")
    List<WarehouseProduct> findAvailableProducts();

    int findQuantityById(int productId);

    /*@Query(
            """
                    SELECT p FROM WarehouseProduct p ORDER BY (
                    case when p.name= 'Apple' THEN 1
                    when p.name= 'Orange' THEN 2
                    when p.name= 'Chocolate' THEN 3
                    when p.name= 'White Chocolate' THEN 4
                    when p.name= 'Juice' THEN 5
                    when p.name= 'Milk' THEN 6
                    when p.name= 'Meat' THEN 7
                    when p.name= 'Fish' THEN 8
                    when p.name= 'Cheese' THEN 9
                    when p.name= 'Bread' THEN 10
                    when p.name= 'Greek Yoghurt' THEN 11
                    when p.name= 'Yoghurt' THEN 12
                    when p.name= 'Shower Gel' THEN 13
                    when p.name= 'Shampoo' THEN 14
                    else 15 end)
                    """
    )
    Page<WarehouseProduct> findProducts(Pageable pageable);*/
}
