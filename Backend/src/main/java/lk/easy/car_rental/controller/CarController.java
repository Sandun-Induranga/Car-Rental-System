package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.dto.CarPhotoDTO;
import lk.easy.car_rental.embed.FreeMileage;
import lk.easy.car_rental.embed.Price;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {

    @PostMapping
    public void saveCar(@ModelAttribute CarPhotoDTO carPhotoDTO, @ModelAttribute Price price, @ModelAttribute FreeMileage freeMileage, @ModelAttribute CarDTO carDTO) {
        carDTO.setPhotos(carPhotoDTO);
        carDTO.setPrice(price);
        carDTO.setFreeMileage(freeMileage);
        System.out.println(carDTO);
    }

}
