package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.DriverDTO;
import lk.easy.car_rental.entity.Driver;

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



    }

}
