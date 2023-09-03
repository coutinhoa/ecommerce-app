package warehouse.controllers;

import org.springframework.web.bind.annotation.*;
import warehouse.entities.Review;
import warehouse.services.ReviewsService;

import java.util.List;


@CrossOrigin("*")
@RestController
class ReviewsController {
    private final ReviewsService service;

    ReviewsController(ReviewsService service) {
        this.service = service;
    }

    @GetMapping("/garments/{garment_id}/reviews")
    List<Review> getReview(@PathVariable Integer garment_id) {

        return service.getReviews(garment_id);
    }


    @PostMapping("/garments/{garment_id}/reviews")
    Review createReview(@RequestBody Review newReview, @PathVariable Integer garment_id) {
        System.out.print("post");
        return service.createReview(newReview, garment_id);
    }
}