package warehouse.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.entities.GarmentSize;

public interface GarmentSizesRepository extends JpaRepository<GarmentSize, Long> {
}
