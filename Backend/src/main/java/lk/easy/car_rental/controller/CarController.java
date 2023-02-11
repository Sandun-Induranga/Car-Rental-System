package lk.easy.car_rental.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {

    @GetMapping
    public void getAll(){
        System.out.println("Invoked");
    }

}
