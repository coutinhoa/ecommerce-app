package warehouse.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.entities.Size;

public interface SizesRepository extends JpaRepository<Size, Long> {
}
