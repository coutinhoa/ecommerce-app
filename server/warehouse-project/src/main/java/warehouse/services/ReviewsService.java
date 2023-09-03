package warehouse.services;

import org.springframework.stereotype.Service;
import warehouse.entities.Review;
import warehouse.entities.WarehouseProduct;
import warehouse.repositories.ProductRepository;
import warehouse.repositories.ReviewsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewsService {
    private final ReviewsRepository repository;
    private final ProductRepository productRepository;

    ReviewsService(ReviewsRepository repository, ProductRepository productRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
    }

    public List<Review> getReviews(Integer garment_id) {
        return repository.findByGarmentId(garment_id);
    }

    public Review createReview(Review newReview, Integer garment_id) {
        Optional<WarehouseProduct> g = productRepository.findById(Long.valueOf(garment_id));
        newReview.setGarment(g.get());
        repository.save(newReview);
        return newReview;
    }
}
