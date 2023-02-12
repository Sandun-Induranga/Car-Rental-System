package lk.easy.car_rental.controller;

import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @PostMapping
    public void getAll(){
        System.out.println("Invoked");
    }

}
