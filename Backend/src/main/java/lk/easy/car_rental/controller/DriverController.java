package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.DriverDTO;
import lk.easy.car_rental.repo.DriverRepo;
import lk.easy.car_rental.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/driver")
@CrossOrigin
public class DriverController {

    @Autowired
    DriverService driverService;

    @PostMapping
    public void saveDriver(@ModelAttribute DriverDTO driverDTO) {

        driverService.saveDriver(driverDTO);

    }

}
