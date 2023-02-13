package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.embed.CarPhoto;
import lk.easy.car_rental.embed.FreeMileage;
import lk.easy.car_rental.embed.Price;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {

    @PostMapping
    public void saveCar(@RequestParam MultipartFile front, @RequestParam MultipartFile back, @RequestParam MultipartFile side, @RequestParam MultipartFile interior,
                        @RequestParam BigDecimal dailyRate, @RequestParam BigDecimal monthlyRate, @RequestParam BigDecimal dailyPriceRate, @RequestParam BigDecimal monthlyPriceRate, @ModelAttribute CarDTO carDTO) {
        carDTO.setPhotos(new CarPhoto(front, back, side, interior));
        carDTO.setPrice(new Price(dailyPriceRate, monthlyPriceRate));
        carDTO.setFreeMileage(new FreeMileage(dailyRate, monthlyRate));
        System.out.println(carDTO);
    }

}
