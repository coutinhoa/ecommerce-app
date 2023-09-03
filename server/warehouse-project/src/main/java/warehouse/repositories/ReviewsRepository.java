package warehouse.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.entities.Review;

import java.util.List;

public interface ReviewsRepository extends JpaRepository<Review, Long> {
    List<Review> findByGarmentId(Integer garment_id);
}
