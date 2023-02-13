package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.DriverDTO;
import lk.easy.car_rental.entity.Driver;
import org.modelmapper.ModelMapper;
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
    ModelMapper mapper;

    @PostMapping
    public void saveDriver(@ModelAttribute DriverDTO driverDTO) {

        Driver driver = mapper.map(driverDTO, Driver.class);
        System.out.println(driver);
    }

}
