package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.DriverDTO;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/driver")
@CrossOrigin
public class DriverController {

    @PostMapping
    public void saveDriver(@ModelAttribute DriverDTO driverDTO) {
        System.out.println(driverDTO);
    }

}
