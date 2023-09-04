package warehouse.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import warehouse.dto.ReviewDTO;
import warehouse.entities.Review;
import warehouse.entities.WarehouseProduct;
import warehouse.repositories.ProductRepository;
import warehouse.repositories.ReviewsRepository;

import java.util.List;

@Service
public class ReviewsService {
    private final ReviewsRepository repository;
    private final ProductRepository productRepository;

    ReviewsService(ReviewsRepository repository, ProductRepository productRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
    }

    public List<Review> getAllReviews() {
        return repository.findAll();
    }

    public List<Review> getReviews(Integer garment_id) {
        return repository.findByGarmentId(garment_id);
    }

    @Transactional
    public void createReview(ReviewDTO newReview, Long productId) {
        WarehouseProduct warehouseProduct = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        System.out.println(newReview.getRating());
        System.out.println(newReview.getDescription());
        Review review = new Review();
        review.setDescription(newReview.getDescription());
        review.setRating(newReview.getRating());
        review.setDate(newReview.getDate());
        review.setGarment(warehouseProduct);
        repository.save(review);
    }
}
