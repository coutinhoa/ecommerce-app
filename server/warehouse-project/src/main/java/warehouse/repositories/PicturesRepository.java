package warehouse.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import warehouse.entities.Picture;

import java.util.List;

public interface PicturesRepository extends JpaRepository<Picture, Long> {
    List<Picture> findByGarmentId(Integer garment_id);

}
