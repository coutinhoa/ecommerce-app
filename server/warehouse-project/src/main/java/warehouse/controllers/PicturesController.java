package warehouse.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import warehouse.entities.Picture;
import warehouse.services.PicturesService;

import java.util.List;

@CrossOrigin("*")
@RestController
class PicturesController {

    private final PicturesService service;

    PicturesController(PicturesService service) {
        this.service = service;
    }


    @GetMapping("pictures")
    public ResponseEntity<List<Picture>> all() {
        List<Picture> pictures = service.getAll();
        return new ResponseEntity<>(pictures, HttpStatus.OK);
    }

    @GetMapping("/garments/{garment_id}/pictures")
    List<Picture> getPicture(@PathVariable Integer garment_id) {

        // return  service.getPicturesByGarmentId(garment_id);
        return service.getPictures(garment_id);
    }


}
