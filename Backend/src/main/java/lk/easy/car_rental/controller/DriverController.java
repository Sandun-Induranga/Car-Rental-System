package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.DriverDTO;
import lk.easy.car_rental.dto.UserDTO;
import lk.easy.car_rental.service.DriverService;
import lk.easy.car_rental.service.RentService;
import lk.easy.car_rental.util.ResponseUtil;
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

    @Autowired
    RentService rentService;

    @PostMapping
    public ResponseUtil saveDriver(@RequestParam String username, @RequestParam String password, @ModelAttribute DriverDTO driverDTO) {

        driverDTO.setUser(new UserDTO(username, password, "Driver"));
        driverService.saveDriver(driverDTO);
        return new ResponseUtil("OK", "Successfully Loaded..!", "");

    }

    @GetMapping
    public ResponseUtil getCurrentDriver() {

        return new ResponseUtil("OK", "Successfully Loaded..!", driverService.getDriver());

    }

    @GetMapping(params = {"nic"})
    public ResponseUtil getDriverSchedule(String nic) {

        return new ResponseUtil("OK", "Successfully Loaded..!", rentService.getDriverSchedule(nic));

    }

    @GetMapping(path = "/all")
    public ResponseUtil getAll() {

        return new ResponseUtil("OK", "Successfully Loaded..!", driverService.getAllDrivers());

    }

}
