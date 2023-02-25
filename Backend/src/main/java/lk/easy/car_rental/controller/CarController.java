package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.dto.CarPhotoDTO;
import lk.easy.car_rental.embed.FreeMileage;
import lk.easy.car_rental.embed.Price;
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
    public ResponseUtil saveCar(@ModelAttribute CarPhotoDTO carPhotoDTO, @ModelAttribute Price price, @ModelAttribute FreeMileage freeMileage, @ModelAttribute CarDTO carDTO) {
        carDTO.setPhotos(carPhotoDTO);
        carDTO.setPrice(price);
        carDTO.setFreeMileage(freeMileage);

        carService.saveCar(carDTO);

        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @GetMapping
    public ResponseUtil getAll() {

        return new ResponseUtil("OK", "Successfully Loaded..!", carService.getAllCars());

    }

    @PostMapping(path = "/image")
    public ResponseUtil saveImages(@ModelAttribute CarPhotoDTO carPhotoDTO) {

        carService.saveCarImages(carPhotoDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @PutMapping(params = {"regNum"})
    public ResponseUtil addToMaintains(@RequestParam String regNum) {

        carService.addToMaintains(regNum);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @GetMapping(params = {"regNum"})
    public ResponseUtil getCar(@RequestParam String regNum) {

        return new ResponseUtil("OK", "Successfully Loaded..!", carService.getCar(regNum));

    }

    @GetMapping(path = "/count")
    public ResponseUtil countAvailableCars() {

        return new ResponseUtil("OK", "Successfully Loaded..!", carService.countAvailableCars());

    }

    @GetMapping(path = "/count/reserved")
    public ResponseUtil countReservedCars() {

        return new ResponseUtil("OK", "Successfully Loaded..!", carService.countReservedCars());

    }

    @PostMapping(path = "/update")
    public ResponseUtil updateCar(@ModelAttribute CarPhotoDTO carPhotoDTO, @ModelAttribute Price price, @ModelAttribute FreeMileage freeMileage, @ModelAttribute CarDTO carDTO) {

        carDTO.setPhotos(carPhotoDTO);
        carDTO.setPrice(price);
        carDTO.setFreeMileage(freeMileage);

        carService.updateCar(carDTO);

        return new ResponseUtil("OK", "Successfully Loaded..!", "");

    }

    @DeleteMapping
    public ResponseUtil deleteCar(@RequestParam String regNum) {

        carService.deleteCar(regNum);
        return new ResponseUtil("OK", "Successfully Deleted..!", "");

    }

    @GetMapping(path = "/filterByRegNum")
    public ResponseUtil filterByRegNum(@RequestParam String text){



    }

}
