package warehouse.controllers;

import org.springframework.web.bind.annotation.*;
import warehouse.dto.ReviewDTO;
import warehouse.entities.Review;
import warehouse.services.ReviewsService;

import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
class ReviewsController {
    private final ReviewsService service;

    ReviewsController(ReviewsService service) {
        this.service = service;
    }


    @GetMapping("/reviews")
        //postman working
    List<Review> getAllReviews() {
        return service.getAllReviews();
    }

    @GetMapping("/garments/{garment_id}/reviews")
        //postman working
    List<Review> getReview(@PathVariable Integer garment_id) {
        return service.getReviews(garment_id);
    }


    @PostMapping("/garments/{garment_id}/reviews")
    public void createReview(@RequestBody ReviewDTO newReview, @PathVariable Long garment_id) {
        service.createReview(newReview, garment_id);
    }
}