package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.service.RentService;
import lk.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/rent")
@CrossOrigin
public class RentController {

    @Autowired
    RentService rentService;

    @PostMapping
    public ResponseUtil rentRequest(@RequestBody RentDTO rentDTO) {

        rentService.requestRent(rentDTO);
        return new ResponseUtil("OK", "Successfully Requested..!", "");

    }

    @GetMapping
    public ResponseUtil generateNewRentId() {

        return new ResponseUtil("OK", "Successfully Requested..!", rentService.generateNewRentId());

    }

    @GetMapping(params = "username")
    public ResponseUtil getCustomer(@RequestParam String username) {

        return new ResponseUtil("OK", "Successfully Loaded..!", rentService.getCustomerByUsername(username));

    }

    @GetMapping(path = "/all")
    public ResponseUtil getAllRent() {

        return new ResponseUtil("OK", "Successfully Loaded..!", rentService.getAllRents());

    }

    @GetMapping(params = "rentId")
    public ResponseUtil getRentByRentId(@RequestParam String rentId) {

        return new ResponseUtil("OK", "Successfully Loaded..!", rentService.getRentByRentId(rentId));

    }

    @PutMapping(params = "rentId")
    public ResponseUtil acceptAndRejectRentRequest(@RequestParam String rentId, @RequestParam String option) {

        rentService.acceptRentRequest(rentId, option);
        return new ResponseUtil("OK", "Successfully Loaded..!", "");

    }

    @GetMapping(params = {"nic"})
    public ResponseUtil getRentByNic(@RequestParam String nic){

        return new ResponseUtil("OK", "Successfully Loaded..!", rentService.getRentByNic(nic));

    }

    @GetMapping(path = "/count")
    public ResponseUtil countRents() {

        return new ResponseUtil("OK", "Successfully Loaded..!", rentService.countRents());

    }

}
