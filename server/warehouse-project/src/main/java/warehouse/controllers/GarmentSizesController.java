package warehouse.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import warehouse.entities.GarmentSize;
import warehouse.repositories.GarmentSizesRepository;

import java.util.List;

@CrossOrigin("*")
@RestController
class GarmentSizesController {
    private final GarmentSizesRepository repository;

    GarmentSizesController(GarmentSizesRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/garments/{garment_id}/garmentsizes")
    List<GarmentSize> all() {
        return repository.findAll();
    }
}
