package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.util.ResponseUtil;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/rent")
@CrossOrigin
public class RentController {

    @PostMapping
    public ResponseUtil rentRequest(@RequestBody RentDTO rentDTO) {
        System.out.println(rentDTO);
        return new ResponseUtil("OK", "Successfully Requested..!", "");
    }

}
