package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.dto.CarPhotoDTO;
import lk.easy.car_rental.service.CarService;
import lk.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {

    @Autowired
    CarService carService;

    @PostMapping
    public void saveCar(/*@ModelAttribute CarPhotoDTO carPhotoDTO, @ModelAttribute Price price, @ModelAttribute FreeMileage freeMileage,*/ @ModelAttribute CarDTO carDTO) {
//        carDTO.setPhotos(carPhotoDTO);
//        carDTO.setPrice(price);
//        carDTO.setFreeMileage(freeMileage);

        carService.saveCar(carDTO);

    }

    @GetMapping
    public ResponseUtil getAll() {

        return new ResponseUtil("OK", "Successfully Loaded..!", carService.getAllCars());

    }

    @PostMapping(path = "/image")
    public ResponseUtil saveImages(@ModelAttribute CarPhotoDTO carPhotoDTO){

        carService.saveCarImages(carPhotoDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

}
